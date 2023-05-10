package es.ucm.fdi.arties.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Session {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;
   
    

    @ManyToOne
    private Lesson lesson;

    private LocalDateTime date;

    @OneToMany (mappedBy = "session")/* , fetch=FetchType.EAGER) */
    private List<SessionBookings> sessionBookings;


    public Session(Lesson l, LocalDateTime d)
    {
        lesson = l;
        date = d;
    }

    public String getDateStrES()
    {
        return Utils.getDateStrESFormat(date);
    }

    public String getDateStrESHourMin()
    {
        return Utils.getDateStrESFormatHourMin(date);
    }




   


    
}
