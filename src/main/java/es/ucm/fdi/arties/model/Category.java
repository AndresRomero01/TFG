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
    @NamedQuery(name = "findById", query = "select c from Category c where  :id = c.id"),
    @NamedQuery(name = "findByName", query = "select c from Category c where :name = c.name"),
    @NamedQuery(name = "getList", query = "select c from Category c")
})
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;
    private String name;

    @OneToMany (mappedBy = "category")
    @JsonIgnore
    private List<Course> coursesList;
}
