package es.ucm.fdi.arties.controller;



import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;



import es.ucm.fdi.arties.model.Item;

import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.ItemLoans;
import es.ucm.fdi.arties.model.DB.DBHandler;
import es.ucm.fdi.arties.model.DB.DBItemsHandler;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * Non-authenticated requests only.
 */
@Controller
@RequestMapping("items")
public class ItemsController {

    @Autowired
    private EntityManager em;


   
    private DBItemsHandler db = new DBItemsHandler();

    private DBHandler commonDB = new DBHandler();


    private static final Logger log = LogManager.getLogger(ItemsController.class);

  
    @GetMapping(path = "/myItems")
    public String myItems(Model model, HttpSession session) {
        User u = (User) session.getAttribute("u");
        User u2;
        u2 = commonDB.getUsuario(em, u.getId());

        log.info("los roles son "+ u2.getRoles());

        
        model.addAttribute("loans", u2.getItemLoans());
        
        for (ItemLoans il : u2.getItemLoans()) {
          log.info("loan: " + il.getItem().getName() + " end date: " + il.getLoanEnd());
        } 

     //   List<Course> coursesList = new ArrayList<Course>();
    
        //  coursesList = db.getCoursesList(em);
      //  log.info("@@@@: " + coursesList.get(0).getName());
       // return coursesList;
       return "userItems";
    }
    

    @GetMapping(path = "/listAll")
    public String listAll(Model model, HttpSession session) {
      //  User u = (User) session.getAttribute("u");

        List<Item> itemList = db.getItemList(em);

        model.addAttribute("items", itemList);

         return "allItems";
       //return "listToLoan";
    }

    @GetMapping(path = "/listToLoan")
    public String listToLoan(Model model, HttpSession session) {
      //  User u = (User) session.getAttribute("u");

        List<Item> itemList = db.getItemList(em);

        List<Item> itemsToLoan = new ArrayList<Item>();

     /*TODO
      * Ahora mismo si un item tiene todas sus unidades alquiladas no se mete a la lista, y por tanto no
        se muestra al cliente para reservar.
        ¿Dejarlo asi, o mostrarlo pudiendo reservarlo para alquilarlo mas adelante?
        Pensar sistema de reservas de materiales
      */

        for (Item item : itemList) {
            log.info("item :" + item.getName() + " Loans de este item: ");

            int cantidadReservada = 0;
             for (ItemLoans il : item.getItemLoans()) {
                cantidadReservada += il.getQuantity();

               // itemsToLoan[itemsToLoan.size()-1] = new Item(); 
                log.info( "item loan: " + il.getItem().getName() +  " cantidad loan " + il.getQuantity() + " user " +il.getUser());
            }
            
            if(cantidadReservada < item.getQuantity())
            {
                item.setQuantity(item.getQuantity() - cantidadReservada);
                itemsToLoan.add(item);
                log.info("Item can loan: " + item.getName() + " with quantity: "+ item.getQuantity());
            }
        }

        model.addAttribute("itemsToLoan", itemsToLoan);

         return "itemsToLoan";
       //return "listToLoan";
    }





}