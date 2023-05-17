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
import es.ucm.fdi.arties.model.Session;
import es.ucm.fdi.arties.model.SessionBookings;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.DB.DBItemsHandler;
import es.ucm.fdi.arties.model.DB.DBLessonsHandler;
import es.ucm.fdi.arties.model.User.ClientType;

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


    @GetMapping(path = "/lessonsToBook")
    public String lessonsToBook(Model model, HttpSession session)
    {
      
      model.addAttribute("lessonsToBook", dbLessons.getAllLessons(em));

      return"lessonsToBook";
    }
  
    @GetMapping(path = "/myBookingLessons")
    @Transactional
    public String myItems(Model model, HttpSession session) {
        User u = (User) session.getAttribute("u");
        User u2;
        u2 = commonDB.getUser(em, u.getId());

        List<SessionBookings> sbList = new ArrayList<>();
       for(SessionBookings sb : u2.getSessionBookings())
       {
          if(sb.getSession().getDate().compareTo(LocalDateTime.now()) >0 )
          {
            sbList.add(sb);
          }
       }

        model.addAttribute("sessionBookings", sbList);
       // demo();
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


    @PostMapping(path = "/getDaysOfLesson")
    @Transactional
    @ResponseBody 
    public String getDaysOfLesson(Model model, HttpSession session, @RequestParam(required = true) long lessonId)
    {
      Lesson l = dbLessons.getLesson(em, lessonId);

      String jsonDays = "[";
      for(Session s: l.getSessionsList())
      {
        log.info("dentro del bucle session");
        //si la fecha y hora de la sesion es despues de la actual
        if(s.getDate().compareTo(LocalDateTime.now()) >0)
        {
          log.info("dentro del if");
          jsonDays += ("{\"idSession\":"+"\""+s.getId()+"\","+
                        "\"capa\":"+"\""+(l.getCapacity() - s.getSessionBookings().size())+"\","+
                        "\"date\":"+"\""+(s.getDate())+"\""+
                        "},");
        }
      }
      if(jsonDays.endsWith(","))
      {
        jsonDays = jsonDays.substring(0,jsonDays.length() - 1);
      }
      jsonDays += "]";
      log.info("MyJson: "+ jsonDays);

      return jsonDays;
    }


    @GetMapping(path = "/bookLesson")
    @Transactional
    public String bookLesson(Model model, HttpSession session, @RequestParam(required = true) long lessonId) {


      model.addAttribute("lesson", dbLessons.getLesson(em, lessonId));

      return "bookLesson";
    }

    @PostMapping("addNewLesson")
    @Transactional
    @ResponseBody 
    public String addNewLesson(
                            @RequestParam("lessonImg") MultipartFile photo,
                            @RequestParam("lessonName") String lessonName,
                            @RequestParam("lessonCapacity") Integer lessonCapacity,
                            @RequestParam("lessonPrice") float lessonPrice,
                            @RequestParam("period") String period,
                            @RequestParam("description") String description
                            )   {

      
      long id = dbLessons.addNewLesson(em, lessonName, lessonCapacity, period, description, lessonPrice);

      if(id > 0)
      {
        File img = new File("src/main/resources/static/img/lessons", id + ".jpg");

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
      }
      
        //return "{\"quant\": \"todomal\"}";
      
      //0 ha ido bien. mayor que 0 es que se deb tener al menos esa cantidad minima del item a modificar
      return "{\"newId\": \""+id+"\"}";

    }

    @PostMapping("deleteLesson")
    @Transactional
    @ResponseBody 
    public String deletLesson(@RequestParam("lessonId") long idLesson)
    {
      dbLessons.deleteLesson(em, idLesson);
      
      return "{\"isok\": \"todobien\"}";

    }

    @PostMapping("modifyLesson")
    @Transactional
    @ResponseBody 
    public String modifyLesson(
                              @RequestParam("lessonName") String lessonName,
                              @RequestParam("lessonCapacity") Integer lessonCapacity,
                              @RequestParam("lessonPrice") float lessonPrice,
                              @RequestParam("period") String period,
                              @RequestParam("description") String description,
                              @RequestParam("deletedSessions") String deletedSessions,
                              @RequestParam("newSessions") String newSessions,
                              @RequestParam("lessonId") long idLesson
                              )   {

    //  int quant = db.modifyItem(em, itemName, itemQuantity, itemDesc, itemMaxLoan, idItem);

      int res = dbLessons.modifyLesson(em, lessonName, lessonCapacity, period, description, lessonPrice, deletedSessions, newSessions, idLesson);
      
        //return "{\"quant\": \"todomal\"}";
      
      //0 ha ido bien. mayor que 0 es que se deb tener al menos esa cantidad minima del item a modificar
      return "{\"quant\": \""+res+"\"}";

    }

    @PostMapping("modifyLessonImg")
    @Transactional
    @ResponseBody 
    public String modifyLessonImg(@RequestParam("lessonImg") MultipartFile photo, @RequestParam("lessonId") long idLesson)
    {

      File img = new File("src/main/resources/static/img/lessons", idLesson + ".jpg");

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


    @PostMapping("bookLessonSession")
    @Transactional
    @ResponseBody 
    public String bookLessonSession(Model model, HttpSession session, @RequestParam("sessionId") long sessionid)
    {
      User u = (User) session.getAttribute("u");
      User u2;
      u2 = commonDB.getUser(em, u.getId());

      if(u2.isType(ClientType.NONE) || u2.isType(ClientType.ONLINE))
        return "{\"res\": \""+(-7)+"\"}";

      
      int res = dbLessons.makeBookLessonSession(em, u2, sessionid);


      return "{\"res\": \""+res+"\"}";
    }

    @GetMapping("payBooking")
    public String payLessonSession(Model model, @RequestParam("sessionId") long sessionid)
    {
        model.addAttribute("sessionId", sessionid);

        return "paymentPageBookings";
    }

    @PostMapping("paidBookingLessonSession")
    @Transactional
    @ResponseBody 
    public String paidBookingLessonSession(Model model, HttpSession session, @RequestParam("sessionId") long sessionid)
    {
      User u = (User) session.getAttribute("u");
      User u2;
      u2 = commonDB.getUser(em, u.getId());

      int res = dbLessons.makeBookLessonSession(em, u2, sessionid);

      return "{\"res\": \""+res+"\"}";
    }



    @PostMapping("cancelBookSession")
    @Transactional
    @ResponseBody 
    public String cancelBookSession(Model model, HttpSession session, @RequestParam("sessionId") long sessionid)
    {
      User u = (User) session.getAttribute("u");
      User u2;
      u2 = commonDB.getUser(em, u.getId());
      

     dbLessons.cancelBookSession(em, u2, sessionid);


      return "{\"res\": \"ok\"}";
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


    private boolean alreadyInit = false;
    //crea las sesiones de las clases definidas en el import. Se ejecuta despues del incio
    //y no vuelve a ejecutarse hasta Long.MaxValue segundos despues, no haciendo ya nada
    @Scheduled(fixedDelay =  Long.MAX_VALUE)
    @Transactional
    public void createInitialSessions() {

        if(alreadyInit)
          return;

        log.info("evento automatico iniciado");

        

        LocalDate actualDate = LocalDate.now();
		    LocalDate date = actualDate;
        
        for (int i = 1; i <= 30; i++) {
			
          log.info("date: "+ date.toString());
          dbLessons.createNewSessionsInDay(em,date);
          date = actualDate.plusDays(i);		   
        }

        //dbLessons.addSessionOfLesson(em, null, null);
        alreadyInit = true;
        log.info("evento automatico ejecutado");
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
