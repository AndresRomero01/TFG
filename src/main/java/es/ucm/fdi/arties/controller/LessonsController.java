package es.ucm.fdi.arties.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;


import es.ucm.fdi.arties.model.Item;

import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.ItemLoans;
import es.ucm.fdi.arties.model.Lesson;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.DB.DBItemsHandler;
import es.ucm.fdi.arties.model.DB.DBLessonsHandler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ch.qos.logback.core.joran.conditional.ElseAction;


/**
 * Non-authenticated requests only.
 */
@Controller
@RequestMapping("lessons")
public class LessonsController {

    @Autowired
    private EntityManager em;

    private DBLessonsHandler dbLessons = new DBLessonsHandler();
   
 //   private DBItemsHandler db = new DBItemsHandler();

    private DBHandler commonDB = new DBHandler();


    private static final Logger log = LogManager.getLogger(LessonsController.class);

  
    @GetMapping(path = "/myBookingLessons")
    @Transactional
    public String myItems(Model model, HttpSession session) {
        User u = (User) session.getAttribute("u");
        User u2;
        u2 = commonDB.getUser(em, u.getId());

        model.addAttribute("sessionBookings", u2.getSessionBookings());
        demo();
        //model.addAttribute("loans", u2.getItemLoans());
        
  /*       for (ItemLoans il : u2.getItemLoans()) {
          log.info("loan: " + il.getItem().getName() + " end date: " + il.getLoanEnd());
        }  */

     //   List<Course> coursesList = new ArrayList<Course>();
    
        //  coursesList = db.getCoursesList(em);
      //  log.info("@@@@: " + coursesList.get(0).getName());
       // return coursesList;
       return "userBookings";
    }

    @PostMapping("addNewLesson")
    @Transactional
    @ResponseBody 
    public String addNewLesson(
                            @RequestParam("lessonName") String lessonName,
                            @RequestParam("lessonCapacity") Integer lessonCapacity,
                            @RequestParam("period") String period
                            )   {

      
      long id = dbLessons.addNewLesson(em, lessonName, lessonCapacity, period);
      
        //return "{\"quant\": \"todomal\"}";
      
      //0 ha ido bien. mayor que 0 es que se deb tener al menos esa cantidad minima del item a modificar
      return "{\"newId\": \""+id+"\"}";

    }


  

   @Transactional
   public void demo()
   {
      Lesson l = dbLessons.getLesson(em, 1);

      //local time tiene info sobre la hora, sin nada sobre el dia
      

      LocalDate actualDate = LocalDate.now();
      LocalDate date = actualDate;
      for (int i = 1; i <= 30; i++) {
         
            log.info("date: "+ date.toString());
            List<LocalTime> hoursList = l.getHoursOfDay(date);

            for(LocalTime t: hoursList)
            {
               log.info("horas: "+t.toString());
               LocalDateTime dateAndHour = date.atTime(t);
               dbLessons.addSessionOfLesson(em, l, dateAndHour);
            }

            date = actualDate.plusDays(i);
         
      }


   }


   @Scheduled(cron = "0 0 0 * * ?")
   @Transactional
    public void eventCreateSessions() {
        log.info("ejecutando evento");
        LocalDate actualDate = LocalDate.now();
        LocalDate date = actualDate.plusDays(30-1);  
        dbLessons.createNewSessionsInDay(em,date);
        log.info("nueva date " +date);
    }


    //TODO, no funciona. Sol provisional, que al ver la pagina de clases o la de config se pregunte si 
    //habia datos en sessiones y si no los habia, crearlos con las clases que hubiera definidas
   /*  @PostConstruct
    @Transactional
    public void initSessions()
    {
      LocalDate actualDate = LocalDate.now();
		    LocalDate date = actualDate;
            for (int i = 1; i <= 30; i++) {
			
                log.info("date: "+ date.toString());
                dbLessons.createNewSessionsInDay(em,date);
                date = actualDate.plusDays(i);		   
          }
    } */
    


}
