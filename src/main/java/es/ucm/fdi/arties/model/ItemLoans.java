package es.ucm.fdi.arties.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import lombok.AllArgsConstructor;
import lombok.Data;


@Entity
@Data
@AllArgsConstructor
public class ItemLoans {
    
    @EmbeddedId private ItemLoansId id;
    @ManyToOne
    @MapsId("item") private Item item;

    @ManyToOne
    @MapsId("user")private User user;

    private LocalDateTime loanStart;
    private LocalDateTime loanEnd;
    private int quantity;

    public ItemLoans(){ }


}
