package es.ucm.fdi.arties.model.DB;


import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import es.ucm.fdi.arties.model.Lesson;
import es.ucm.fdi.arties.model.Session;
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
    public long addNewLesson(EntityManager em, String lessonName, int capacity, String period,String description) {

        long newId = -1;
        Lesson l = new Lesson(lessonName, capacity, period, description);
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


   


    
}
