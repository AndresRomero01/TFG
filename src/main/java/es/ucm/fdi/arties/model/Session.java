package es.ucm.fdi.arties.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
/* @NamedQueries({
  @NamedQuery(name = "session.list", query = "select s from Session s")
}) */
public class Session {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;
   
    

    @ManyToOne
    private Lesson lesson;

    private LocalDateTime date;

    @OneToMany (mappedBy = "session", cascade = CascadeType.REMOVE)/* , fetch=FetchType.EAGER) */
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


    public SessionBookings removeBookSession(long idUsr)
    {
        SessionBookings toRemove = null;
        for(SessionBookings sb:sessionBookings)
        {
            if(sb.getUser().getId() == idUsr)
            {
                toRemove = sb;
            }
                
        }
        if(toRemove != null)
        {
            sessionBookings.remove(toRemove);
        }

        return toRemove;
    }

   /*  public String getDateStr()
    {
        String dateStr ="";
      String day =date.getDayOfMonth() +"";
      if(day.length() == 1)
        day = "0"+day;

      String month = date.getMonthValue() + "";
      if(month.length() == 1)
        month = "0" + month; 

        String hour =  date.getHour() + "";
      if(hour.length() == 1)
        hour = "0" + hour; 
      String min =  date.getMinute() + "";
      if(min.length() == 1)
        min = "0" + min; 


      dateStr = day + "/" + month + "-" + date.getYear();

      return dateStr;
    } */




   


    
}
