package es.ucm.fdi.arties.model.DB;


import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import es.ucm.fdi.arties.model.Lesson;
import es.ucm.fdi.arties.model.Session;
import es.ucm.fdi.arties.model.SessionBookings;
import es.ucm.fdi.arties.model.SessionBookingsId;
import es.ucm.fdi.arties.model.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;


@Data
public class DBLessonsHandler {

    private static final Logger log = LogManager.getLogger(DBLessonsHandler.class);



    @Transactional
    public Lesson getLesson(EntityManager em, long id) {
        Lesson l = em.find(Lesson.class, id);
        return l;
    }


    @Transactional
    public long addNewLesson(EntityManager em, String lessonName, int capacity, String period,String description, float lessonPrice) {

        long newId = -1;
        Lesson l = new Lesson(lessonName, capacity, period, description, lessonPrice);
        em.persist(l);
        em.flush();
        newId = l.getId();

        if(newId != -1)
        {
            LocalDate actualDate = LocalDate.now();
		    LocalDate date = actualDate;
            for (int i = 1; i <= 30; i++) {
			
                log.info("date: "+ date.toString());
                createNewSessionsInDay(em,date);
                date = actualDate.plusDays(i);		   
          }
        }

        return newId;
    }




    @Transactional
    public void addSessionOfLesson(EntityManager em, Lesson l, LocalDateTime date) {
       // Lesson l = em.find(Lesson.class, id);
        
       
           long newId = -1;
   
           Session session = new Session(l, date);
   
           em.persist(session);
           em.flush();
           newId = session.getId();

    }


    /**
     * Dada una fecha crea todas las sesiones de todas las clases que haya definidas y que ocurran el dia dado
     * @param em
     * @param date
     */
    @Transactional
    public void createNewSessionsInDay(EntityManager em, LocalDate date)
    {
        List<Lesson> lessons = null;
        lessons = em.createNamedQuery("lesson.list", Lesson.class).getResultList();
       // LocalDate date = LocalDate.now();

        for(Lesson l: lessons)
        {
            List<LocalTime> hoursList = l.getHoursOfDay(date);

             for(LocalTime t: hoursList)
             {
                log.info("horas: "+t.toString());
                LocalDateTime dateAndHour = date.atTime(t);
                addSessionOfLesson(em, l, dateAndHour);
             }
        }
    }


    public List<Lesson> getAllLessons(EntityManager em)
    {
        List<Lesson> lessons = null;
        lessons = em.createNamedQuery("lesson.list", Lesson.class).getResultList();
        return lessons;
    }

    @Transactional
    public int makeBookLessonSession(EntityManager em, User u, long idSession)
    {
        Session s = em.find(Session.class, idSession);
        Lesson l = s.getLesson();

        //si capacidad de la clase menor que actuales mas la nueva es que no habia hueco para la reserva
        if(l.getCapacity() < (s.getSessionBookings().size()+1))
            return -2;

        //si el usuario ya tenia una reserva para esa sesion
        for(SessionBookings sb : u.getSessionBookings())
        {
            if(sb.getSession().getId() == idSession)
                return -1;
        }



        SessionBookingsId sbi = new SessionBookingsId(u.getId(), idSession);
       

        SessionBookings sb = new SessionBookings(sbi, u, s);

        em.persist(sb);
        em.flush();
        u.getSessionBookings().add(sb);
        s.getSessionBookings().add(sb);
       // SessionBookingsId  si = new SessionBookingsId(u.getId(), idSession);
        //SessionBookings sb = new Ses
        return 0;
    }


    @Transactional
    public void cancelBookSession(EntityManager em, User u, long idSession)
    {

        u.removeBookSession(idSession);

        Session s = em.find(Session.class, idSession);

        SessionBookings sb = s.removeBookSession(u.getId());

        em.remove(sb);

        em.flush(); 
    }


   


    
}
