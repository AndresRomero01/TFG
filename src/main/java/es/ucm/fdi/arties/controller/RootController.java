package es.ucm.fdi.arties.controller;

import java.io.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
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
import es.ucm.fdi.arties.model.Message;
import es.ucm.fdi.arties.model.Transferable;
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.book;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.User.Role;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import netscape.javascript.JSException;

/**
 * Non-authenticated requests only.
 */
@Controller
public class RootController {

    @Autowired
    private EntityManager em;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private DBHandler db = new DBHandler();
    private static final Logger log = LogManager.getLogger(RootController.class);

    @GetMapping("/login")
    public String login(Model model, HttpSession session) {
        putCommonDataInModel(model, session);
        return "login";
    }

    @GetMapping("/")
    public String index(Model model, HttpSession session) {
        putCommonDataInModel(model, session);
        return "index";
    }

    @GetMapping(path = "/getCoursesList", produces = "application/json")
    @ResponseBody
    public List<Course> getCoursesList(HttpSession session) {
        String p = (String) session.getAttribute("prueba");
        log.info("######: " + p);

        List<Course> coursesList = new ArrayList<Course>();
        coursesList = db.getCoursesList(em);
        log.info("@@@@: " + coursesList.get(0).getName());
        return coursesList;
    }

    private void putCommonDataInModel(Model model, HttpSession session)
    {
        User u = (User) session.getAttribute("u");

        //ConfiguracionRestaurante conf = saGeneral.getConfiguracion(em);
    
        //model.addAttribute("nombreSitio", conf.getNombreSitio());
        if(u != null)
        {
            log.info("id del usuario:" + u.getId());
            model.addAttribute("idUs", u.getId());
        }

    }


}
