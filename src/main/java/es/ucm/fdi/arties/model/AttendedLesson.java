package es.ucm.fdi.arties.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AttendedLesson {
    String nameLesson;
    Integer attendance;
    
}
