package es.ucm.fdi.arties.model.DB;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import com.fasterxml.jackson.databind.JsonNode;

import es.ucm.fdi.arties.model.Course;
import es.ucm.fdi.arties.model.Item;
import es.ucm.fdi.arties.model.ItemLoans;
import es.ucm.fdi.arties.model.ItemLoansId;
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.User.ClientType;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import lombok.Data;
import net.bytebuddy.asm.Advice.Local;

@Data
public class DBItemsHandler {

    private static final Logger log = LogManager.getLogger(DBItemsHandler.class);

    public List<Item> getItemList(EntityManager em) {
        List<Item> items = null;

        items = em.createNamedQuery("item.list", Item.class).getResultList();
        return items;
    }


    public Long addNewItem(EntityManager em, String name, Integer quantity, String desc, Integer maxLoan)
    {
        long newId = -1;

        Item item = new Item(name, desc, quantity,maxLoan);

        em.persist(item);
        em.flush();
        newId = item.getId();

        return newId;


    }

    public int modifyItem(EntityManager em, String name, Integer quantity, String desc, Integer maxLoan, long id)
    {
        Item i = em.find(Item.class, id);

        int loanedQuantity = 0;
        for (ItemLoans il : i.getItemLoans()) {
            loanedQuantity += il.getQuantity();
        }

        //cantidad nueva es menor que la actual disponible (cantidad actual total - reservados)
        log.info("cantidad disp: "+ (i.getQuantity() - loanedQuantity) + " quantity to put "+ quantity);
        if( quantity < loanedQuantity)
            return loanedQuantity;

        i.setQuantity(quantity);
        i.setName(name);
        i.setDescription(desc);
        i.setMaxLoan(maxLoan);
        em.flush();


        return 0;
    }

    public boolean deleteItem(EntityManager em, long id)
    {
        Item i = em.find(Item.class, id);

        //si el item estaba alquilado no se puede eliminar
        if(i.getItemLoans().size() > 0)
            return false;

        em.remove(i);
        em.flush();
        return true;
    }

    //public List<Reserva> listarReservasFecha(EntityManager em, String fecha)
    public int getItemAvailability(EntityManager em, String date)
    {
       /*  List<ItemLoans> loans = null;
        Query q = em.createNamedQuery("es.ucm.fdi.iw.model.Reserva.findByFecha", Reserva.class);
        LocalDateTime time;
        time = LocalDateTime.parse(fecha + "T00:00:00");
        q.setParameter("fecha", time);
        q.setParameter("fecha2", time.plusDays(1));
        reservas = q.getResultList();

        return reservas; */


        return 0;
    }

    public Item getItem(EntityManager em, long id) {
        Item i = em.find(Item.class, id);
        return i;
    }


    public User makeLoan(EntityManager em, long idItem, long idUser, int quantity, LocalDateTime date)
    {
        Item item = em.find(Item.class, idItem);
        User user = em.find(User.class, idUser);

        LocalDateTime start = LocalDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(),0, 0);
        LocalDateTime end = LocalDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(),23, 59);

        ItemLoansId itemLoansId = new ItemLoansId(idUser, idItem);
        ItemLoans itemLoan = new ItemLoans(itemLoansId, item, user, start, end.plusDays(7), quantity);

        em.persist(itemLoan);

        user.addItemLoan(itemLoan, item);


        em.flush();  
/*     for (ItemLoans il : user.getItemLoans()) {
        log.info("User il - item id: " + il.getItem().getId());
    }

    for (ItemLoans il : item.getItemLoans()) {
        log.info("item il - user id: " + il.getUser().getId());
    } */

        return user;
    }

    public boolean renovateLoan(EntityManager em, long idItem, long idUser)
    {
        User user = em.find(User.class, idUser);

        List<ItemLoans> updatedItemLoans = user.getItemLoans();
        ItemLoans updatedItemLoan;

        /* 
        for (int i = 0; i < updatedItemLoans.size(); i++) {
            if(updatedItemLoans.get(i).getItem().getId() == idItem)
            {
                ItemLoans oldLoan = updatedItemLoans.get(i);
                LocalDateTime updatedEnd =oldLoan.getLoanEnd().plusDays(7);
                oldLoan.setLoanEnd(updatedEnd);

            }
        }
 */
        //probar esta solucion, y sino hacer la de arriba con una sobreescritura d ela lista completa
        //Si funciona
        for (ItemLoans itemLoans :  user.getItemLoans()) {
            if(itemLoans.getItem().getId() == idItem)
            {
                LocalDateTime updatedEnd =itemLoans.getLoanEnd().plusDays(7);
                log.info("nuevo end: "+ updatedEnd);
                itemLoans.setLoanEnd(updatedEnd);
            }
        }



        return true;
    }

    

    

}
