package es.ucm.fdi.arties.model;

import java.time.LocalDateTime;

public class Utils {
    

    public static String getDateStrESFormat(LocalDateTime date)
    {
      String dateStr ="";
      String day =date.getDayOfMonth() +"";
      if(day.length() == 1)
        day = "0"+day;

      String month = date.getMonthValue() + "";
      if(month.length() == 1)
        month = "0" + month; 
      dateStr = day + "/" + month + "/" + date.getYear();

      return dateStr;
    }

    public static String getDateStrESFormatHourMin(LocalDateTime date)
    {
      String dateStr = getDateStrESFormat(date);

      String hour =  date.getHour() + "";
      if(hour.length() == 1)
        hour = "0" + hour; 
      String min =  date.getMinute() + "";
      if(min.length() == 1)
        min = "0" + min; 

      dateStr += " " + hour + ":" + min;

      return dateStr;
    }
}
