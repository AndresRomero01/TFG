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
import org.springframework.transaction.annotation.Transactional;
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

        for(ItemLoans il: i.getItemLoans())
        {
            //si tenia algun loan activo es que esta en alquiler,y no se puede eliminar
            if(il.isActive())
                return false;
        }

       /*  if(i.getItemLoans().size() > 0)
            return false; */

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

    @Transactional
    public Item getItem(EntityManager em, long id) {
        Item i = em.find(Item.class, id);
        return i;
    }

    @Transactional
    public User makeLoan(EntityManager em, long idItem, long idUser, int quantity, LocalDateTime date)
    {
        Item item = em.find(Item.class, idItem);
        User user = em.find(User.class, idUser);

        LocalDateTime start = LocalDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(),0, 0);
        LocalDateTime end = LocalDateTime.of(date.getYear(), date.getMonthValue(), date.getDayOfMonth(),23, 59);

       // ItemLoansId itemLoansId = new ItemLoansId(idUser, idItem);
     //   ItemLoans itemLoan = new ItemLoans(itemLoansId, item, user, start, end.plusDays(7), quantity, true);
        ItemLoans itemLoan = new ItemLoans(item, user, start, end.plusDays(7), quantity, true);
        log.info( "item name: " +itemLoan.getItem().getName() + "item id: "+itemLoan.getItem().getId());
      
        //em.flush(); 

        em.persist(itemLoan);
        em.flush(); 

        user.addItemLoan(itemLoan, item);

        em.flush(); 

   

        long newId = itemLoan.getId();
        log.info("nuevo id" + newId);
        
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
            //el usuario solo tiene un alquiler con ese objeto que este activo
            if(itemLoans.isActive() && itemLoans.getItem().getId() == idItem)
            {
                LocalDateTime updatedEnd =itemLoans.getLoanEnd().plusDays(7);
                log.info("nuevo end: "+ updatedEnd);
                itemLoans.setLoanEnd(updatedEnd);
            }
        }



        return true;
    }

    public void cancelLoan(EntityManager em, long idLoan)
    {
       /*  Item item = em.find(Item.class, idItem);
        User user = em.find(User.class, idUser); */

        ItemLoans il = em.find(ItemLoans.class, idLoan);
        em.remove(il);
        em.flush();

        /* ItemLoans il = user.removeItemLoan(idItem, idLoan);
        item.removeItemLoan(idUser, idLoan);
        il.setActive(false);
       // em.remove(il);

        em.flush();  
        return il;*/
    } 

    public ItemLoans endLoan(EntityManager em, long idItem, long idUser, long idLoan)
    {
        Item item = em.find(Item.class, idItem);
        User user = em.find(User.class, idUser);

        ItemLoans il = user.removeItemLoan(idItem, idLoan);
        item.removeItemLoan(idUser, idLoan);
        il.setActive(false);
       // em.remove(il);

        em.flush();  
        return il;
    }

    public void undoEndLoan(EntityManager em, long idItem, long idUser, long idLoan)
    {
        Item item = em.find(Item.class, idItem);
        User user = em.find(User.class, idUser);

        ItemLoans il = user.undoRemoveItemLoan(idItem, idLoan);
        item.undoRemoveItemLoan(idUser, idLoan);
        il.setActive(true);
       // em.remove(il);

        em.flush();  
       // return il;
    }

    

    

}
