package es.ucm.fdi.arties.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NamedQueries({
    @NamedQuery(name = "course.list", query = "select c from Course c")
})
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;
    
    private Boolean isFree;
    private String name;
    private String description;
    //TO DO: Variables para videos e imagenes (aprender a hacerlo)

    @ManyToOne
    private Category category;

    @OneToMany (mappedBy = "course")
    @JsonIgnore
    private List<RelationUserCourse> coursesList;
}
