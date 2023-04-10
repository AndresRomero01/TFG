package es.ucm.fdi.arties.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NamedQueries({
    @NamedQuery(name = "item.list", query = "select i from Item i")
})
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;



    private String name;
    private String description;
    private Integer quantity;
    private Integer maxLoan;
    // TO DO variables video/imagenes

    //por cada item, tenemos en esta var la lista de loans de ese item con el usuario que la tiene
    @OneToMany (mappedBy = "item", fetch=FetchType.EAGER)
    private List<ItemLoans> itemLoans;

 public Item(String name, String desc, Integer quant, Integer maxL)
 {
    this.name = name;
    description = desc;
    quantity = quant;
    maxLoan = maxL;
 }

    
}
