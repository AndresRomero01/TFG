package es.ucm.fdi.iw.controller;

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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import es.ucm.fdi.iw.model.Transferable;
import es.ucm.fdi.iw.model.User;
import es.ucm.fdi.iw.model.book;
import es.ucm.fdi.iw.model.User.Role;
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

    //private SAGeneralImp saGeneral = new SAGeneralImp();
    private static final Logger log = LogManager.getLogger(RootController.class);

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/books", produces = "application/json")
    @ResponseBody
    public String getBooks() {
      //  return Arrays.asList(new book(1, "Core Java"), new book(2, "Effective Java"), new book(3, "Head First Java"));
      return "{\"isok\": \"todobien\"}";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/books2", produces = "application/json")
    @ResponseBody
    public List < book > getBooks2() {
        return Arrays.asList(new book(1, "Core Java"), new book(2, "Effective Java"), new book(3, "Head First Java"));
     // return "{\"isok\": \"todobien\"}";
    }

}
