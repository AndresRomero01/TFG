package es.ucm.fdi.arties.controller;

import java.io.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import javax.websocket.Decoder.Text;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.util.JSONPObject;

import es.ucm.fdi.arties.model.Course;
import es.ucm.fdi.arties.model.Transferable;
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.User.ClientType;
import es.ucm.fdi.arties.model.User.Role;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import netscape.javascript.JSException;

/**
 * Non-authenticated requests only.
 */
@Controller
public class RootController {

    @Autowired
    private EntityManager em;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    private DBHandler db = new DBHandler();


    private static final Logger log = LogManager.getLogger(RootController.class);

    @GetMapping("/")
    public String index(Model model, HttpSession session) {
        putComundDataInModel(model, session);

        //para alimentar el carousel con 5 cursos gratis (si hay)
        List<Course> coursesList = new ArrayList<Course>();
        List<Course> freeCourses = new ArrayList<Course>();
        coursesList = db.getCoursesList(em);
        if(coursesList.size() >= 5){
            for(int i = 0; i < 5; i++){
                freeCourses.add(coursesList.get(i));
            }
            model.addAttribute("freeCourses", freeCourses);
            /* model.addAttribute("freeCoursesCount", freeCourses.size()); */
        } 

        return "index";
    }

    @GetMapping("/login")
    public String login(Model model, HttpSession session) {
        putComundDataInModel(model, session);
        return "login";
    }

    @GetMapping("/subscriptions")
    public String subscriptionsPage(Model model, HttpSession session) {
        return "subscriptions";
    }

    @GetMapping("/lessons")
    public String lessonsPage(Model model, HttpSession session) {
        return "lessons";
    }

    @GetMapping("/settings")
    public String settingsPage(Model model, HttpSession session) {
        return "settings";
    }

    @GetMapping("/signup")
    public String signUpPage(Model model, HttpSession session) {
        return "signup";
    }

    @PostMapping(path = "/signup", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String signUpQuery(Model model, @RequestBody JsonNode o) {
        log.info("----------- dentro de signup -------------");

        String username = o.get("username").asText();
        long idUser;
        String rol = "USER";
         

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
            String password2 = o.get("password2").asText();


            User u = new User(username, password1, firstName, lastName, email, address, phone, rol, ClientType.ONLINE);
            String encodedPassword = passwordEncoder.encode(o.get("password1").asText());
            u.setPassword(encodedPassword);

            log.info("------------------------------");
            log.info(firstName);
            log.info(lastName);
            log.info(email);
            log.info(phone);
            log.info(address);
            log.info(password1);
            log.info(password2);

            idUser = db.createUser(em, u);
            /* idUsuario = db.crearUsuario(em, o.get("address").asText(), o.get("email").asText(),
                    o.get("firstName").asText(), o.get("lastName").asText(),
                    password, rol, o.get("phone").asText(), username); */
            if (idUser == -1)
                return null;
        }

        return "{\"isok\": \"true\", \"idUsuario\": " + idUser + "}";// devuelve un json como un string
    }

    @GetMapping("/courses")
    public String courses(Model model, HttpSession session) {
        List<Course> coursesList = new ArrayList<Course>();
        coursesList = db.getCoursesList(em);

        model.addAttribute("coursesList", coursesList);
        return "courses";
    }

    /* @GetMapping(path = "/getCoursesList", produces = "application/json")
    @ResponseBody
    public List<Course> getCoursesList(HttpSession session) {
        String p = (String) session.getAttribute("prueba");
        log.info("######: " + p);

        List<Course> coursesList = new ArrayList<Course>();
        coursesList = db.getCoursesList(em);
        log.info("@@@@: " + coursesList.get(0).getName());
        return coursesList;
    } */


    
    private void putComundDataInModel(Model model, HttpSession session)
    {
        User u = (User) session.getAttribute("u");

        if(u != null)
        {
            log.info("id del usuario:" + u.getId());
            model.addAttribute("idUs", u.getId());
        }

    }


}
