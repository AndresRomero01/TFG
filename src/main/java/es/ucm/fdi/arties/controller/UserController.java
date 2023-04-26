package es.ucm.fdi.arties.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.ucm.fdi.arties.LocalData;
import es.ucm.fdi.arties.model.Course;
import es.ucm.fdi.arties.model.RelationUserCourse;
import es.ucm.fdi.arties.model.Transferable;
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.User.ClientType;
import es.ucm.fdi.arties.model.User.Role;

import java.io.*;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.TreeSet;
import java.util.stream.Collectors;

/**
 *  User management.
 *
 *  Access to this end-point is authenticated.
 */
@Controller()
@RequestMapping("user")
public class UserController {

	private static final Logger log = LogManager.getLogger(UserController.class);

	@Autowired
	private EntityManager em;

	@Autowired
    private LocalData localData;

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@Autowired
	private PasswordEncoder passwordEncoder;

    private DBHandler db = new DBHandler();


    /**
     * Exception to use when denying access to unauthorized users.
     * 
     * In general, admins are always authorized, but users cannot modify
     * each other's profiles.
     */
	@ResponseStatus(
		value=HttpStatus.FORBIDDEN, 
		reason="No eres administrador, y éste no es tu perfil")  // 403
	public static class NoEsTuPerfilException extends RuntimeException {}

	/**
	 * Encodes a password, so that it can be saved for future checking. Notice
	 * that encoding the same password multiple times will yield different
	 * encodings, since encodings contain a randomly-generated salt.
	 * @param rawPassword to encode
	 * @return the encoded password (typically a 60-character string)
	 * for example, a possible encoding of "test" is 
	 * {bcrypt}$2y$12$XCKz0zjXAP6hsFyVc8MucOzx6ER6IsC1qo5zQbclxhddR1t6SfrHm
	 */
	public String encodePassword(String rawPassword) {
		return passwordEncoder.encode(rawPassword);
	}

    /**
     * Generates random tokens. From https://stackoverflow.com/a/44227131/15472
     * @param byteLength
     * @return
     */
    public static String generateRandomBase64Token(int byteLength) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] token = new byte[byteLength];
        secureRandom.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token); //base64 encoding
    }

    /**
     * Landing page for a user profile
     */
	@GetMapping("{id}")
    public String index(@PathVariable long id, Model model, HttpSession session) {
		log.info("------en id --------@@");
        User target = em.find(User.class, id);

		long idConf = 1;
/* 		ConfiguracionRestaurante c = null;
        c = entityManager.find(ConfiguracionRestaurante.class, idConf);
        model.addAttribute("nombreSitio", c.getNombreSitio()); */

        List<RelationUserCourse> coursesList = target.getCoursesList();
        model.addAttribute("coursesList", coursesList);

        //log.info("@@@@ course0: " + coursesList.get(0).getCourse().getName());

        log.info("@@@@ despues de setAttribute");

        model.addAttribute("user", target);
		model.addAttribute("idUs", target.getId());
        return "user";
    }

    /**
     * Alter or create a user
     */
	@PostMapping("/{id}")
	@Transactional
	public String postUser(
			HttpServletResponse response,
			@PathVariable long id, 
			@ModelAttribute User edited, 
			@RequestParam(required=false) String pass2,
			Model model, HttpSession session) throws IOException {

		log.info("------en /id --------@@");

        User requester = (User)session.getAttribute("u");
        User target = null;
        if (id == -1 && requester.hasRole(Role.ADMIN)) {
            // create new user with random password
            target = new User();
            target.setPassword(encodePassword(generateRandomBase64Token(12)));
           
            em.persist(target);
            em.flush(); // forces DB to add user & assign valid id
            id = target.getId();   // retrieve assigned id from DB
        }
        
        // retrieve requested user
        target = em.find(User.class, id);
        model.addAttribute("user", target);
		
		if (requester.getId() != target.getId() &&
				! requester.hasRole(Role.ADMIN)) {
			throw new NoEsTuPerfilException();
		}
		
		if (edited.getPassword() != null) {
            if ( ! edited.getPassword().equals(pass2)) {
                // FIXME: complain
            } else {
                // save encoded version of password
                target.setPassword(encodePassword(edited.getPassword()));
            }
		}		
		target.setUsername(edited.getUsername());
		target.setFirstName(edited.getFirstName());
		target.setLastName(edited.getLastName());

		// update user session so that changes are persisted in the session, too
        if (requester.getId() == target.getId()) {
            session.setAttribute("u", target);
        }

		model.addAttribute("idUs", target.getId());
	
		return "user";
	}	

    /**
     * Returns the default profile pic
     * 
     * @return
     */
    private static InputStream defaultPic() {
	    return new BufferedInputStream(Objects.requireNonNull(
            UserController.class.getClassLoader().getResourceAsStream(
                "static/img/default-pic.jpg")));
    }

    /**
     * Downloads a profile pic for a user id
     * 
     * @param id
     * @return
     * @throws IOException
     */
    @GetMapping("{id}/pic")
    public StreamingResponseBody getPic(Model model, @PathVariable long id) throws IOException {
        File f = localData.getFile("user", ""+id+".jpg");

        InputStream in = new BufferedInputStream(f.exists() ?
            new FileInputStream(f) : UserController.defaultPic());
        return os -> FileCopyUtils.copy(in, os);
    }

    /**
     * Uploads a profile pic for a user id
     * 
     * @param id
     * @return
     * @throws IOException
     */
    @PostMapping("{id}/pic")
	@ResponseBody
    public String setPic(@RequestParam("photo") MultipartFile photo, @PathVariable long id, 
        HttpServletResponse response, HttpSession session, Model model) throws IOException {
        log.info("@@@@ inside setPic in userController");

        User target = em.find(User.class, id);
        model.addAttribute("user", target);
		
		// check permissions
		User requester = (User)session.getAttribute("u");
		if (requester.getId() != target.getId() &&
				! requester.hasRole(Role.ADMIN)) {
            throw new NoEsTuPerfilException();
		}
		
		log.info("Updating photo for user {}", id);
		File f = localData.getFile("user", ""+id+".jpg");
		if (photo.isEmpty()) {
			log.info("failed to upload photo: emtpy file?");
		} else {
			try (BufferedOutputStream stream =
					new BufferedOutputStream(new FileOutputStream(f))) {
				byte[] bytes = photo.getBytes();
				stream.write(bytes);
                log.info("Uploaded photo for {} into {}!", id, f.getAbsolutePath());
			} catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
				log.warn("Error uploading " + id + " ", e);
			}
		}
		return "{\"status\":\"photo uploaded correctly\"}";
    }

    @PostMapping("modifyUserImg")
    @Transactional
    @ResponseBody 
    public String modifyUserImg(@RequestParam("userImg") MultipartFile photo, @RequestParam("userId") long userId)
    {
        log.info("---- inside modifyUserImg ----");

      File img = new File("src/main/resources/static/img/userImgs", userId + ".jpg");

      if (photo.isEmpty()) {
        log.info("failed to upload photo: emtpy file?");
        return null;
      } else {
          try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(img))) {
              byte[] bytes = photo.getBytes();
              stream.write(bytes);
              log.info("la ruta es: " + img.getAbsolutePath());
          } catch (Exception e) {
              return null;
          }
      }

      return "{\"isok\": \"todobien\"}";

    }

	@PostMapping(path = "/actualizarPedido", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String prueba(Model model, @RequestBody JsonNode o, HttpSession session) {
        log.info("----PRUEBA----");
        
        log.info("@@@@@---");
        log.info(o);

        long idCliente = o.get("idCliente").asLong();
		long idPedido = o.get("idPedido").asLong();
		String username = o.get("username").asText();
		int estado = o.get("estado").asInt();
        log.info("idCliente: "+ idCliente);
        
        String json = "{\"idPedido\": " + idPedido + "," +
                "\"estado\": " + estado + "}";


		log.info(json);

        // url a la que te has subscrito en js y los datos a enviar (json)
        messagingTemplate.convertAndSend("/user/"+username+"/misPedidos/updates", json);
        return "{\"isok\": \"todobien\"}";// devuelve un json como un string
    }

    @PostMapping(path = "/deleteUser", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String deleteUser(Model model, @RequestBody JsonNode o, HttpSession session) {
        log.info("@@@@@ dentro de deleteUser @@@@@");
        log.info("id a borrar: " + o.get("idUser").asText());


        db.deleteUser(em, o.get("idUser").asLong());

        return "{\"isok\": \"todobien\"}";// devuelve un json como un string
    }

    @PostMapping(path = "/addStaff", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String addStaff(Model model, @RequestBody JsonNode o, HttpSession session) {
        log.info("@@@@@ dentro de addStaff @@@@@");


        String username = o.get("username").asText();
        long idUser;
        String rol = "STAFF";

        if (db.existsUser(em, username)) {
            log.info("usuario ya existe (rootController anadirUsuario)");
            return null;
        } else {
            String firstName = o.get("firstName").asText();
            String lastName = o.get("lastName").asText();
            String email = o.get("email").asText();
            String phone = o.get("phone").asText();
            String address = o.get("address").asText();
            String password1 = o.get("password1").asText();
            
            User u = new User(username, password1, firstName, lastName, email, address, phone, rol, ClientType.ONLINE);
            String encodedPassword = passwordEncoder.encode(o.get("password1").asText());
            u.setPassword(encodedPassword);

            idUser = db.createUser(em, u);
            if (idUser == -1)
                return null;

            log.info("idUser es: " + idUser);
        }

        return "{\"isok\": \"true\", \"idUser\": " + idUser + "}";// devuelve un json como un string
    }
}
