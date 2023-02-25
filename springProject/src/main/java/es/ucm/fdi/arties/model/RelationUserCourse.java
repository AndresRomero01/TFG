package es.ucm.fdi.arties.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class RelationUserCourse {
    @EmbeddedId private RelationUserCourseId id;
    
    @ManyToOne
    @MapsId("course") private Course course;

    @ManyToOne
    @MapsId("user")private User user;

    private int timesDone; // habra cursos para los q no importara pq sean educativos


    @Embeddable
    @Data
    @AllArgsConstructor
    public class RelationUserCourseId implements Serializable{
        private long user;
        private long course;

        public RelationUserCourseId(){};
    }
}


