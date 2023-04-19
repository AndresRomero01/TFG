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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RelationUserCourse {
    @JsonIgnore
    @EmbeddedId private RelationUserCourseId id;
    
    @ManyToOne
    @JsonIgnore
    @MapsId("course") private Course course;

    @ManyToOne
    @JsonIgnore
    @MapsId("user")private User user;

    private int timesDone; // habra cursos para los q no importara pq sean educativos


    
}


