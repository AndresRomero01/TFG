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
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.User.ClientType;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import lombok.Data;

@Data
public class DBItemsHandler {
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

}
