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

import es.ucm.fdi.arties.model.Category;
import es.ucm.fdi.arties.model.ChatMessage;
import es.ucm.fdi.arties.model.Course;
import es.ucm.fdi.arties.model.GymSub;
import es.ucm.fdi.arties.model.Item;
import es.ucm.fdi.arties.model.Transferable;
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.DB.DBItemsHandler;
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
    private DBItemsHandler dbItems = new DBItemsHandler();


    private static final Logger log = LogManager.getLogger(RootController.class);

    @GetMapping("/")
    public String index(Model model, HttpSession session) {
        putComundDataInModel(model, session);

        //para alimentar el carousel con 5 cursos gratis (si hay)
        List<Course> coursesList = new ArrayList<Course>();
        List<Course> freeCourses = new ArrayList<Course>();
        coursesList = db.getFreeCoursesList(em);
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
    @Transactional // para no recibir resultados inconsistentes
    public String subscriptionsPage(Model model, HttpSession session) {
        //loadSubscriptionPhrases(model);

        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);
        if(gymSub.getOnlineInfo() == null && gymSub.getOnsiteInfo() == null){
            loadSubscriptionPhrases(model);
        } else {
            model.addAttribute("onlinePhrases", gymSub.getOnlineInfo());
            model.addAttribute("onsitePhrases", gymSub.getOnsiteInfo());
            model.addAttribute("sizesDif", Math.abs(gymSub.getOnlineInfo().size() - gymSub.getOnsiteInfo().size()));
            model.addAttribute("onlineArraySize", gymSub.getOnlineInfo().size());
            model.addAttribute("onsiteArraySize", gymSub.getOnsiteInfo().size());
            model.addAttribute("onlinePrice", gymSub.getOnlinePrice());
            model.addAttribute("onsitePrice", gymSub.getOnsitePrice());
        }
        

        return "subscriptions";
    }

    @Transactional // para no recibir resultados inconsistentes
    public void loadSubscriptionPhrases(Model model){
        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);

        ArrayList<String> onlineInfo = new ArrayList<>();
        onlineInfo.add("Acceso a todos los cursos");
        onlineInfo.add("Alquiler de material");
        onlineInfo.add("Ayuda por chat");
        gymSub.setOnlineInfo(onlineInfo);

        ArrayList<String> onsiteInfo = new ArrayList<>();
        onsiteInfo.add("Acceso al gimnasio");
        onsiteInfo.add("Acceso a todos los cursos");
        onsiteInfo.add("Alquiler de material");
        onsiteInfo.add("Acceso gratis a las clases");
        onsiteInfo.add("Ayuda por chat");
        gymSub.setOnsiteInfo(onsiteInfo);

        model.addAttribute("onlinePhrases", gymSub.getOnlineInfo());
        model.addAttribute("onsitePhrases", gymSub.getOnsiteInfo());
        model.addAttribute("sizesDif", Math.abs(gymSub.getOnlineInfo().size() - gymSub.getOnsiteInfo().size()));
        model.addAttribute("onlineArraySize", gymSub.getOnlineInfo().size());
        model.addAttribute("onsiteArraySize", gymSub.getOnsiteInfo().size());
        model.addAttribute("onlinePrice", gymSub.getOnlinePrice());
        model.addAttribute("onsitePrice", gymSub.getOnsitePrice());
    }

    @GetMapping("/lessons")
    public String lessonsPage(Model model, HttpSession session) {
        return "lessons";
    }

    @GetMapping("/chats")
    public String chatsPage(Model model, HttpSession session) {
        putComundDataInModel(model, session);

        User u = (User) session.getAttribute("u");

        List<ChatMessage> lcm = db.getGeneralQuestions(em);
        model.addAttribute("generalQuestions", lcm);

        List<User> lu = db.getStaffChats(em, u.getId());
        model.addAttribute("usersList", lu);

        return "chats";
    }

    @GetMapping("/settings")
    @Transactional // para no recibir resultados inconsistentes
    public String settingsPage(Model model, HttpSession session) {
        List<User> lu = db.getUsersByRol(em, "STAFF");
        List<Category> lc = db.getCoursesCatogories(em);
        model.addAttribute("employeesList", lu);
        model.addAttribute("categories", lc);

        List<Item> itemList = dbItems.getItemList(em);
        model.addAttribute("items", itemList);

        List<Course> coursesList = new ArrayList<Course>();
        coursesList = db.getCoursesList(em);
        model.addAttribute("coursesList", coursesList);


        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);
        if(gymSub.getOnlineInfo() == null && gymSub.getOnsiteInfo() == null){
            loadSubscriptionPhrases(model);
        } else {
            model.addAttribute("onlinePhrases", gymSub.getOnlineInfo());
            model.addAttribute("onsitePhrases", gymSub.getOnsiteInfo());
            model.addAttribute("sizesDif", Math.abs(gymSub.getOnlineInfo().size() - gymSub.getOnsiteInfo().size()));
            model.addAttribute("onlineArraySize", gymSub.getOnlineInfo().size());
            model.addAttribute("onsiteArraySize", gymSub.getOnsiteInfo().size());
            model.addAttribute("onlinePrice", gymSub.getOnlinePrice());
            model.addAttribute("onsitePrice", gymSub.getOnsitePrice());
        }

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

    @PostMapping(path = "/modifyUser", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String modifyUser(Model model, @RequestBody JsonNode o) {
        log.info("----------- dentro de modifyUser -------------");

        String username = o.get("username").asText();
        String oldUsername = o.get("oldUsername").asText();
        log.info("@@@@@ " + username);
        long idUser = o.get("id").asLong();
        String rol = "USER";
         
        if (db.existsUserById(em, idUser)) {
            log.info("usuario ya existe (rootController modifyUser)");

            // para comprobar que el nuevo username no existia ya
            if(!oldUsername.equals(username)){
                if(db.existsUser(em, username)) return null;
            }

            String firstName = o.get("firstName").asText();
            String lastName = o.get("lastName").asText();
            String email = o.get("email").asText();
            String phone = o.get("phone").asText();
            String address = o.get("address").asText();
            String password1 = o.get("password1").asText();

            User u = new User(username, password1, firstName, lastName, email, address, phone, rol, ClientType.NONE);
            if(!password1.equals("")) {
                String encodedPassword = passwordEncoder.encode(o.get("password1").asText());
                u.setPassword(encodedPassword);
            }

            User modifiedUser = db.modifyUser(em, idUser, u);
        } else {
            return null;
        }
        

        return "{\"isok\": \"true\", \"username\": \"" + username + "\"}";// devuelve un json como un string
    }

    @GetMapping("/courses")
    public String courses(Model model, HttpSession session) {
        List<Course> coursesList = new ArrayList<Course>();
        List<Category> lc = db.getCoursesCatogories(em);
        coursesList = db.getCoursesList(em);
        model.addAttribute("categories", lc);
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

    @GetMapping("/addCourse")
    public String adCourse(Model model, HttpSession session) {
        List<Category> lc = db.getCoursesCatogories(em);
        model.addAttribute("categories", lc);
        return "addCourse";
    }

    @GetMapping("/modifyCourse")
    public String modifyCourse(Model model, HttpSession session, @RequestParam(required = true) Long courseId) {
        List<Category> lc = db.getCoursesCatogories(em);
        model.addAttribute("categories", lc);
        Course c = em.find(Course.class, courseId);
        model.addAttribute("course", c);
        
        return "modifyCourse"; //reuse the addCourse page, but with the info of the course preloaded
    }

    @PostMapping(path = "/modifyCourse", produces = "application/json")
    @ResponseBody
    @Transactional
    public String modifyCourse(@RequestBody JsonNode o){
        String courseName = o.get("name").asText();
        String desc = o.get("desc").asText();
        Boolean isFree = o.get("isFree").asBoolean();
        Long catId = o.get("cat").asLong();
        Long courseId = o.get("courseId").asLong();
        /* Boolean hasImage = o.get("hasImage").asBoolean(); */

        db.modifyCourse(em, courseId, courseName, catId, desc, isFree);
        
        return "{\"isok\": \"ok\"}";
    }

    @PostMapping(path = "/createCourse", produces = "application/json")
    @ResponseBody
    @Transactional
    public String createCourse(@RequestBody JsonNode o){
        String courseName = o.get("name").asText();
        String desc = o.get("desc").asText();
        Boolean isFree = o.get("isFree").asBoolean();
        Long catId = o.get("cat").asLong();
        Boolean hasImage = o.get("hasImage").asBoolean();

        long id = db.createCourse(em, courseName, catId, desc, isFree, hasImage);
        
        return "{\"courseId\":" + id + "}";
    }

    @PostMapping("/modifyCourseImg")
    @Transactional
    @ResponseBody 
    public String modifyCourseImg(@RequestParam("courseImg") MultipartFile photo, @RequestParam("courseId") long courseId)
    {
        log.info("---- inside modifyCourseImg ----");

      File img = new File("src/main/resources/static/img/courses", courseId + ".jpg");

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

    @PostMapping(path = "/deleteCourse", produces = "application/json")
    @ResponseBody
    @Transactional
    public String deleteCourse(@RequestBody JsonNode o){
        Long courseId = o.get("courseId").asLong();
        /* Boolean hasImage = o.get("hasImage").asBoolean(); */

        db.deleteCourse(em, courseId);
        
        return "{\"isok\": \"ok\"}";
    }

    @GetMapping("/seeCourse")
    public String verPlato(Model model, HttpSession session, @RequestParam(required = true) Long chosenCourseId) {
        putComundDataInModel(model, session);

        Course c = db.getCourse(em, chosenCourseId);

        log.info("@@@@ chosen course " + c.getName());

        model.addAttribute("course", c);

        return "seeCourse";
    }

    @GetMapping(path = "/getUser", produces = "application/json")
    @ResponseBody
    @Transactional
    public User getUser(Model model, @RequestParam String id){
        Long userId = Long.parseLong(id);
        User u = db.getUser(em, userId);
        log.info("@@@@@@  " + u.getFirstName());
        return u;
    }

    @PostMapping(path = "/newQuestion", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String newQuestion(Model model, @RequestBody JsonNode o) {
        log.info("----------- dentro de newQuestion -------------");

        String subject = o.get("subject").asText();
        String question = o.get("questionArea").asText();
        Long userId = o.get("userId").asLong();

        User u = db.getUser(em, userId);

        ChatMessage cm = new ChatMessage(u,question,subject,true);
        Long questionId = db.addMessage(em, cm);
        
        log.info("@@@@ " + questionId);
        log.info("@@@@@ subject: " + subject + " question: " + question + " userId: " + userId);

        String jsonForWebSocket = "{\"subject\": \""+ subject +"\", \"question\": \""+question+"\", \"userId\":"+userId+", \"firstName\": \""
                                    +u.getFirstName()+"\", \"lastName\": \""+u.getLastName()+"\", \"questionId\":"+questionId+"}";

        messagingTemplate.convertAndSend("/questionForStaff", jsonForWebSocket);

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }

    @PostMapping(path = "/newMessage", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String newMessage(Model model, @RequestBody JsonNode o) {
        log.info("----------- dentro de newMessage -------------");

        String msg = o.get("msg").asText();
        Long userId = o.get("userId").asLong();
        Long staffId = o.get("staffId").asLong();
        Boolean userSentIt = o.get("userSentIt").asBoolean();

        User u = db.getUser(em, userId);
        User staff = db.getUser(em, staffId);

        ChatMessage cm = new ChatMessage(u, staff , msg, userSentIt);
        Long msgId = db.addMessage(em, cm);
        
        log.info("@@@@ " + msgId);
        log.info("@@@@@ msg: " + msg + " userId: " + userId);

        String jsonForWebSocket = "{\"staffId\": "+ staffId +", \"msg\": \""+msg+"\", \"userId\":"+userId+", \"firstName\": \""
                                    +u.getFirstName()+"\", \"lastName\": \""+u.getLastName()+"\", \"msgId\":"+msgId+"}";

        if(userSentIt) messagingTemplate.convertAndSend("/getChatWithUser"+staffId, jsonForWebSocket);
        else messagingTemplate.convertAndSend("/getChatWithUser"+userId, jsonForWebSocket);
        

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }

    /* @GetMapping("/getGeneralQuestions")
    public List<ChatMessage> getGeneralQuestions(Model model, HttpSession session) {

        List<ChatMessage> lcm = db.getGeneralQuestions(em);

        return null;
    } */

    @PostMapping(path = "/linkQuestionStaff", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String linkQuestionStaff(Model model, HttpSession session, @RequestBody JsonNode o) {
        log.info("---------- inside linkQuestionStaff -------------");

        User u = (User) session.getAttribute("u");
        Long messageId = o.get("messageId").asLong();
        log.info("@@@@ " + messageId);
        log.info("@@@@ " +  u.getId());

        db.linkQuestionStaff(em, messageId, u.getId());

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }

    @GetMapping("/getConversation")
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public List<ChatMessage> getConversation(Model model, HttpSession session, @RequestParam(required = true) Long userId, @RequestParam(required = true) Long staffId) {

        log.info("@@@@@@@ " + userId);
        log.info("@@@@@@@ " + staffId);
        List<ChatMessage> lcm = db.getConversation(em, userId, staffId);

        return lcm;
    }

    @GetMapping(path = "/getStaffList", produces = "application/json")
    @ResponseBody
    public List<User> getStaffList(Model model){
        List<User> lu = db.getUsersByRol(em, "STAFF");
        return lu;
    }

    @GetMapping(path = "/getUserChats", produces = "application/json")
    @ResponseBody
    public List<User> getUserChats(Model model, HttpSession session){
        User u = (User) session.getAttribute("u");

        List<User> lu = db.getUserChats(em, u.getId());

        return lu;
    }

    @PostMapping(path = "/suscribe", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String suscribe(Model model, HttpSession session, @RequestBody JsonNode o) {
        log.info("---------- inside suscribe -------------");

        User u = (User) session.getAttribute("u");
        Boolean onlineSub = o.get("onlineSub").asBoolean();
        log.info("@@@@ sub1: " + u.getClientType());

        if(onlineSub) u = db.suscribe(em, u, ClientType.ONLINE);
        else u = db.suscribe(em, u, ClientType.ONSITE);

        session.setAttribute("u", u);
        log.info("@@@@ sub2: " + u.getClientType());

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }

    @PostMapping(path = "/updateUserDescription", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String updateUserDescription(Model model, HttpSession session, @RequestBody JsonNode o) {
        log.info("---------- inside updateUserDescription -------------");

        User u = (User) session.getAttribute("u");
        String desc = o.get("userDescription").asText();

        User updatedUser = db.updateUserDescription(em, u.getId(), desc);
        session.setAttribute("u", updatedUser);

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }

    @GetMapping("/paymentPage")
    @Transactional
    public String paymentPage(Model model, HttpSession session, @RequestParam(required = true) String subType) {
        log.info("---------- inside paymentPage -------------");
        log.info("@@@@ type: " + subType);

        Double quantity;
        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);
        if(subType.equals("onsite")) quantity = gymSub.getOnsitePrice();
        else quantity = gymSub.getOnlinePrice();

        model.addAttribute("price", quantity);

        return "paymentPage";
    }

    @PostMapping(path = "/deletePhrase", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String deletePhrase(Model model, HttpSession session, @RequestBody JsonNode o) {
        log.info("---------- inside deletePhrase -------------");

        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);

        int index = o.get("index").asInt();
        String type = o.get("type").asText();
        log.info("@@@@ index to delete: " + index);
        log.info("@@@@ type to delete: " + type);

        if(type.equals("online")) {
            gymSub.getOnlineInfo().remove(index);

        } else if (type.equals("onsite")){
            gymSub.getOnsiteInfo().remove(index);
        }

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }

    @PostMapping(path = "/addPhrase", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String addPhrase(Model model, HttpSession session, @RequestBody JsonNode o) {
        log.info("---------- inside addPhrase -------------");

        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);

        String phrase = o.get("phrase").asText();
        String type = o.get("type").asText();
        log.info("@@@@ phrase to add " + phrase);
        log.info("@@@@ type to add: " + type);

        int arraySize = 0;

        if(type.equals("online")) {
            gymSub.getOnlineInfo().add(phrase);
            arraySize = gymSub.getOnlineInfo().size();

        } else if (type.equals("onsite")){
            gymSub.getOnsiteInfo().add(phrase);
            arraySize = gymSub.getOnsiteInfo().size();
        }



        return "{\"arraySize\": "+arraySize+"}";// devuelve un json como un string
    }

    @PostMapping(path = "/changeGymSubPrice", produces = "application/json")
    @Transactional // para no recibir resultados inconsistentes
    @ResponseBody // no devuelve nombre de vista, sino objeto JSON
    public String changeGymSubPrice(Model model, HttpSession session, @RequestBody JsonNode o) {
        log.info("---------- inside changeGymSubPrice -------------");

        Long id = Long.valueOf(1);
        GymSub gymSub = em.find(GymSub.class, id);

        double price = o.get("price").asDouble();
        String type = o.get("type").asText();
        log.info("@@@@ changed price " + price);
        log.info("@@@@ type to add: " + type);

        if(type.equals("online")) {
            gymSub.setOnlinePrice(price);;

        } else if (type.equals("onsite")){
            gymSub.setOnsitePrice(price);;
        }

        return "{\"isok\": \"true\"}";// devuelve un json como un string
    }
}
