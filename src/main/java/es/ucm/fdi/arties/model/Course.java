package es.ucm.fdi.arties.model;

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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NamedQueries({
    @NamedQuery(name = "course.list", query = "select c from Course c"),
    @NamedQuery(name = "course.freeCoursesList", query = "select c from Course c where c.isFree = true")
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
    private Boolean hasImage;
    private Boolean hasVideo;
    //TO DO: Variables para videos e imagenes (aprender a hacerlo)

    @ManyToOne
    @JsonIgnore
    private Category category;

    @OneToMany (mappedBy = "course", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<RelationUserCourse> coursesList;

    public Course(String name, Category cat, String desc, Boolean isFree, Boolean hasImage){
        this.name = name;
        this.category = cat;
        this.description = desc;
        this.isFree = isFree;
        this.hasImage = hasImage;
    }
}
