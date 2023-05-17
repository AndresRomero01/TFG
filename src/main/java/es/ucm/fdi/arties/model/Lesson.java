package es.ucm.fdi.arties.model;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@NamedQueries({
    @NamedQuery(name = "lesson.list", query = "select l from Lesson l")
})
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;
    private String name;
    private String period;
    private String description;
    private int capacity;
    private float price = 0;
    
    @OneToMany (mappedBy = "lesson", cascade = CascadeType.REMOVE)
    private List<Session> sessionsList;

    public Lesson(String name, int capacity, String period, String description, float price)
    {
        this.name = name;
        this.capacity  =capacity;
        this.period = period;
        this.description = description;
        this.price = price;

    }


    public boolean haveSession(DayOfWeek dayOfWeek) {
        String[] sessions = period.split(",");
        
        for (String session : sessions) {
            String[] partes = session.split("-");
            DayOfWeek sessionDay = DayOfWeek.valueOf(partes[0]);
            LocalTime horaSesion = LocalTime.parse(partes[1]);
            if (sessionDay == dayOfWeek) {
                return true;
            }
        }
        
        return false;
    }

    public List<LocalTime> getHoursOfDay(DayOfWeek dayOfWeek) {

        List<LocalTime> hoursList = new ArrayList<>();
        String[] sessions = period.split(",");
        
        for (String session : sessions) {
            String[] partes = session.split("-");
            DayOfWeek sessionDay = DayOfWeek.valueOf(partes[0]);
            LocalTime sessionHour = LocalTime.parse(partes[1]);
            if (sessionDay == dayOfWeek) {
                hoursList.add(sessionHour);
            }
        }
        
        return hoursList;
    }

    public List<LocalTime> getHoursOfDay(LocalDateTime date) {
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        return getHoursOfDay(dayOfWeek);

    }

    public List<LocalTime> getHoursOfDay(LocalDate date) {
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        return getHoursOfDay(dayOfWeek);
    }

    public List<String> getListPeriodStrEs()
    {

         String[] sessions = period.split(",");
         List<String> res = new ArrayList<>();
         
        for (String session : sessions) {
            String[] partes = session.split("-");
            String s = Utils.weekDayEnToEs(partes[0])+"-"+partes[1];
            res.add(s);
        }

        return res;
    }


    public List<String> getListPeriodStr()
    {

         String[] sessions = period.split(",");
         List<String> res = new ArrayList<>();
         
        for (String session : sessions) {
            String[] partes = session.split("-");
            String s = partes[0]+"-"+partes[1];
            res.add(s);
        }

        return res;
    }


    
}

