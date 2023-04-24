package es.ucm.fdi.arties.controller;



import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ch.qos.logback.core.joran.conditional.ElseAction;


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
        u2 = commonDB.getUser(em, u.getId());

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

    @GetMapping(path = "/loanItem")
    @Transactional
    public String loanItem(Model model, HttpSession session, @RequestParam(required = true) long itemId) {
      //  User u = (User) session.getAttribute("u");

        log.info("Id del item pedido es: "+ itemId);

        Item item = em.find(Item.class, itemId);

        User u = (User) session.getAttribute("u");
  
        User u2;
        u2 = commonDB.getUser(em, u.getId());


        boolean hasItem = u2.hasItemLoan(item);

        log.info("el valor del bool es: "+ hasItem);


        LocalDateTime actualDate = LocalDateTime.now();
        String year = actualDate.getYear() + "";
        String month = actualDate.getMonthValue()+ "";
        String day = actualDate.getDayOfMonth()+ "";

        if(month.length() <2)
          month = "0"+month;

        if(day.length() <2)
          day = "0"+day;

        String formatedDate = year + "-" + month + "-" + day; 

        model.addAttribute("hasItem", hasItem);
        model.addAttribute("item", item);
        model.addAttribute("availableQuantity",( availableItemsPerDay(formatedDate, itemId) + ""));

//Si el loan es renovable y hay para reservar el dia actual se puede renovar
        int canRenovate = -1;
        ItemLoans itemLoan = u2.getOneItemLoan(itemId);
        if(itemLoan != null)
        {
          if(itemLoan.isLate())
          {
            canRenovate = -2;
          }
          else
          {
              log.info("fecha sig al loan: " + itemLoan.getLoanEnd().plusMinutes(1));
            //teniendo en cuenta que las reservas acaban a las 23:59, el dia sig empieza en un min mas
            LocalDateTime nextDayForLoan = itemLoan.getLoanEnd().plusMinutes(1);
            if(itemLoan.isRenovable())
            {
              if(availableItemsPerDay(nextDayForLoan, itemId) >= itemLoan.getQuantity())
              {
                canRenovate = 1;
                model.addAttribute("nextEnd", getDateStrESFormatHourMin(nextDayForLoan.plusDays(7).plusHours(23).plusMinutes(59)));
                model.addAttribute("endLoan", getDateStrESFormatHourMin(itemLoan.getLoanEnd()));
              }          
              else
                canRenovate = 0;
            }

          }
          
  
         
        }
        //si ya tenia el item (hasItem = true) entonces:
    //canRenovate = 1 si 48 horas antes del fin del loan y cuando acaba su loan hay tantas unidades disponibles
    //como tenia en casa alquiladas
    //= 0 si no habia unidades suficientes para ampliar
    //=-1 si aun no estaba en fecha para renovar
    //=-2 si se habia pasado de fecha
        model.addAttribute("canRenovate", canRenovate);

       
        

         return "loanItem";
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

       /*  for (Item item : itemList) {
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

        model.addAttribute("itemsToLoan", itemsToLoan); */
        model.addAttribute("itemsToLoan",itemList);

         return "itemsToLoan";
       //return "listToLoan";
    }

    @PostMapping("addNewItem")
    @Transactional
    @ResponseBody 
    public String addNewItem(@RequestParam("itemImg") MultipartFile photo,
                            @RequestParam("itemName") String itemName,
                            @RequestParam("itemQuantity") Integer itemQuantity,
                            @RequestParam("itemDesc") String itemDesc,
                            @RequestParam("itemMaxLoan") Integer itemMaxLoan)   {
                          

      log.info("adding new item");
      Long newId = db.addNewItem(em, itemName, itemQuantity, itemDesc, itemMaxLoan);

      if(newId <0)
      {
        return"";
      }

      File img = new File("src/main/resources/static/img/items", newId + ".jpg");

      if (photo.isEmpty()) {
        log.info("failed to upload photo: emtpy file?");
        return null;
      } else {
          try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(img))) {
              byte[] bytes = photo.getBytes();
              stream.write(bytes);
              log.info("la ruta es: " + img.getAbsolutePath());
          } catch (Exception e) {
              return null;
          }
      }

      String dataToReturn = "{";
        dataToReturn += "\"idItem\": \"" + newId + "\"";
        dataToReturn += "}";

        return dataToReturn;
      
    }

    @PostMapping("modifyItem")
    @Transactional
    @ResponseBody 
    public String modifyItem(
                            @RequestParam("itemName") String itemName,
                            @RequestParam("itemQuantity") Integer itemQuantity,
                            @RequestParam("itemDesc") String itemDesc,
                            @RequestParam("itemMaxLoan") Integer itemMaxLoan,
                            @RequestParam("itemId") long idItem)   {

      int quant = db.modifyItem(em, itemName, itemQuantity, itemDesc, itemMaxLoan, idItem);
      
        //return "{\"quant\": \"todomal\"}";
      
      //0 ha ido bien. mayor que 0 es que se deb tener al menos esa cantidad minima del item a modificar
      return "{\"quant\": \""+quant+"\"}";

    }



    @PostMapping("availableItemDay")
    @Transactional
    @ResponseBody 
    public String availableItemsDay(HttpSession session, @RequestParam("date") String date,
                          @RequestParam("itemId") long itemId)
    {
      log.info("Dia pedido es: "+ date  + " del item con id: "+ itemId);

      //TODO: Comprobar con la sesion que la peticion es de un usuario con suscripcion presencial u online

      return "{\"availableItems\": \""+ (availableItemsPerDay(date, itemId)) +"\"}";
    }

    @PostMapping("modifyItemImg")
    @Transactional
    @ResponseBody 
    public String modifyItemImg(@RequestParam("itemImg") MultipartFile photo, @RequestParam("itemId") long idItem)
    {

      File img = new File("src/main/resources/static/img/items", idItem + ".jpg");

      if (photo.isEmpty()) {
        log.info("failed to upload photo: emtpy file?");
        return null;
      } else {
          try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(img))) {
              byte[] bytes = photo.getBytes();
              stream.write(bytes);
              log.info("la ruta es: " + img.getAbsolutePath());
          } catch (Exception e) {
              return null;
          }
      }

      return "{\"isok\": \"todobien\"}";

    }

    @PostMapping("deleteItem")
    @Transactional
    @ResponseBody 
    public String deleteItem(@RequestParam("itemId") long idItem)
    {
       if(!db.deleteItem(em, idItem))
        return "{\"isok\": \"todomal\"}";

        //TODO borrar img
      
      return "{\"isok\": \"todobien\"}";

    }


   
//TODO: decididr si se va a ir actualizando los datos del user de la session, o se accedera cada vez con el id a la bd con sus datos
    @PostMapping("makeLoan")
    @Transactional
    @ResponseBody 
    public String makeLoan(HttpSession session, @RequestParam("date") String date,
                          @RequestParam("quantity") Integer itemQuantity,
                          @RequestParam("itemId") long itemId)
    {

      int availableQuantity = availableItemsPerDay(date, itemId);
      LocalDateTime time = LocalDateTime.parse(date + "T00:00:00");
      log.info("Cantidad disp: "+ availableQuantity);
      log.info("cantidad ped: " + itemQuantity);

      //comprobaciones repetidas por seguridad ya hechas en el cliente,
      if(availableQuantity < itemQuantity || itemQuantity <= 0)
        return"";

        User u = (User) session.getAttribute("u");
      if(u.hasItemLoan(itemId))
        return "";


        User updatedUser = db.makeLoan(em, itemId, u.getId(), itemQuantity, time);
      if(updatedUser != null)
      {
        session.setAttribute("u", updatedUser);
        if(updatedUser.hasItemLoan(itemId))
        {

        }
        return "{\"isok\": \"todobien\"}";//TODO redirigir desde el javascript
      }
        
      else
      return "{\"isok\": \"todomal\"}";


    }

    @PostMapping("renovateLoan")
    @Transactional
    @ResponseBody 
    public String renovateLoan(HttpSession session, @RequestParam("itemId") long itemId)
    {
      User u = (User) session.getAttribute("u");
      User u2;
      u2 = commonDB.getUser(em, u.getId());
      ItemLoans itemLoan = u2.getOneItemLoan(itemId);


      //comprobaciones que deberian estar bien en el cliente pero que se repiten por seguridad
      if(itemLoan == null) return "{\"isok\": \"todomal\"}";

      if(!itemLoan.isRenovable()) return "{\"isok\": \"todomal\"}";

      if(itemLoan.isLate()) return "{\"isok\": \"todomal\"}";

      LocalDateTime nextDayForLoan = itemLoan.getLoanEnd().plusMinutes(1);
        if(availableItemsPerDay(nextDayForLoan, itemId) < itemLoan.getQuantity())  return "{\"isok\": \"todomal\"}";


        db.renovateLoan(em, itemId, u2.getId());

      return "{\"isok\": \"todomal\"}";
    }


    private int availableItemsPerDay(String date, long itemId)
    {
      LocalDateTime time;
      time = LocalDateTime.parse(date + "T00:00:00");

      return availableItemsPerDay(time, itemId);
    }


    private int availableItemsPerDay(LocalDateTime time, long itemId)
    {

  /*     LocalDateTime time;
      time = LocalDateTime.parse(date + "T00:00:00"); */

      Item item = db.getItem(em, itemId);


      int loanedItems = 0;

      LocalDateTime actualDate = LocalDateTime.now();
      log.info("fecha de hoy: "+ actualDate);

      for (ItemLoans il : item.getItemLoans()) {
        int compareStart = time.compareTo(il.getLoanStart());// > 0 time es mas tarde  <0  es antes  = 0 es igual

        
       
        log.info("fecha de fin loan: "+ il.getLoanEnd());

        //la fecha actual es posterior a la de endLoan, es decir, el item no se devolvio. Automaticamente descontamos esa cantidad
        if(actualDate.compareTo(il.getLoanEnd()) > 0)
        {
          log.info("dentro del if");
          loanedItems += il.getQuantity();
        }
        else{
          int compareEnd = time.compareTo(il.getLoanEnd());// > 0 time es as tarde  <0  es antes  = 0 es igual

          //los objetos prestados son aquellos con fecha de reserva anterior a la dada y de finalizacion superior a la dada
          //es decir, time debe ser despues de loanStart (compareStart >= 0)
          //y time debe ser antes que loanEnd (compare loan <=0)
          //el = se incluye ya que si un item esta previsto para empezar su reserva un dia, ese dia ya cuenta como reservado
          //del mismo modo, si esta previsto que se devuelva un dia, ese mismo dia no se puede reservar, porque puede ser que no lo devuelvan
          if(compareStart >= 0 && compareEnd <= 0)
            loanedItems += il.getQuantity();

        }
       
      }

      return item.getQuantity()-loanedItems;

    }

    public static String getDateStrESFormat(LocalDateTime date)
    {
      String dateStr ="";
      String day =date.getDayOfMonth() +"";
      if(day.length() == 1)
        day = "0"+day;

      String month = date.getMonthValue() + "";
      if(month.length() == 1)
        month = "0" + month; 
      dateStr = day + "/" + month + "/" + date.getYear();

      return dateStr;
    }

    public static String getDateStrESFormatHourMin(LocalDateTime date)
    {
      String dateStr = getDateStrESFormat(date);
      dateStr += " " + date.getHour() + ":" + date.getMinute();

      return dateStr;
    }



}