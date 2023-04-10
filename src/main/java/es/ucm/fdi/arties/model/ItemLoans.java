package es.ucm.fdi.arties.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import es.ucm.fdi.arties.controller.ItemsController;
import lombok.AllArgsConstructor;
import lombok.Data;


@Entity
@Data
@AllArgsConstructor
/* @NamedQueries({
@NamedQuery(name = "es.ucm.fdi.iw.model.itemLoans.availabilityItem", query = "select loan from item_loans loan where  :date1 >= loan.loan_start AND :date2 <= loan.loan_end AND loan.item_id = idItem"),
}) */
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


    public boolean isRenovable()
    {
        LocalDateTime actualDate = LocalDateTime.now();
        long hours = ChronoUnit.HOURS.between(actualDate, loanEnd);

        if(hours <= 48)
            return true;
        else
        return false;
    }

    public boolean isLate()
    {
        LocalDateTime actualDate = LocalDateTime.now();
        int compare = actualDate.compareTo(loanEnd);// > 0 time es as tarde  <0  es antes  = 0 es igual
        return compare > 0; //si compare > 0 es que actualdate es mas tarde que loanEnd, es decir, se paso la fecha
    }

    public String getLoanEndStrES()
    {
        return ItemsController.getDateStrESFormat(loanEnd);
    }

    public String getLoanEndStrESHourMin()
    {
        return ItemsController.getDateStrESFormatHourMin(loanEnd);
    }


}
