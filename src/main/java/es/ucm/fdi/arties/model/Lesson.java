package es.ucm.fdi.arties.model;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.OneToMany;
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
    private int capacity;//TODO llevarselo a la clase (lesson)
    
    @OneToMany (mappedBy = "lesson")
    private List<Session> sessionsList;

    public Lesson(String name, int capacity, String period)
    {
        this.name = name;
        this.capacity  =capacity;
        this.period = period;

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
}

