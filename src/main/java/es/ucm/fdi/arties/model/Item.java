package es.ucm.fdi.arties.model;

import java.util.List;

import javax.persistence.CascadeType;
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


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Entity
@Data
@NamedQueries({
    @NamedQuery(name = "item.list", query = "select i from Item i")
})
@AllArgsConstructor
@NoArgsConstructor
public class Item {

    private static final Logger log = LogManager.getLogger(Item.class);
    
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
    @OneToMany (mappedBy = "item", cascade = CascadeType.REMOVE)/* , fetch=FetchType.EAGER) */
    private List<ItemLoans> itemLoans;

 public Item(String name, String desc, Integer quant, Integer maxL)
 {
    this.name = name;
    description = desc;
    quantity = quant;
    maxLoan = maxL;
 }


 public void removeItemLoan(long idUsr, long idLoan)
    {
        ItemLoans toRemove = null;
        for(ItemLoans il:itemLoans)
        {
            if(il.getId() == idLoan && il.getUser().getId() == idUsr)
            {
                toRemove = il;
                il.setActive(false);
                log.info("id encontrado en user");
            }
                
        }
        if(toRemove != null)
        {
          //  itemLoans.remove(toRemove);
        }
    }

    public void undoRemoveItemLoan(long idUsr, long idLoan)
    {
        ItemLoans toRemove = null;
        for(ItemLoans il:itemLoans)
        {
            if(il.getId() == idLoan && il.getUser().getId() == idUsr)
            {
                toRemove = il;
                il.setActive(true);
                log.info("id encontrado en user");
            }
                
        }
        if(toRemove != null)
        {
          //  itemLoans.remove(toRemove);
        }
    }

    
}
