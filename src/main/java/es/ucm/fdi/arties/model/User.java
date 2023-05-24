package es.ucm.fdi.arties.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.collection.internal.PersistentList;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * An authorized user of the system.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name="User.byUsername",
                query="SELECT u FROM User u "
                        + "WHERE u.username = :username"),
        @NamedQuery(name="User.byId",
                query="SELECT u FROM User u "
                        + "WHERE u.id = :idUser"),
        @NamedQuery(name="User.hasUsername",
                query="SELECT COUNT(u) "
                        + "FROM User u "
                        + "WHERE u.username = :username"),
        @NamedQuery(name="User.existsUsername",
                query="SELECT u "
                        + "FROM User u "
                        + "WHERE u.username = :username"),
        @NamedQuery(name="User.byEmail",
                query="SELECT u "
                        + "FROM User u "
                        + "WHERE u.email = :email"),
        @NamedQuery(name="User.byRol",
                query="SELECT u "
                        + "FROM User u "
                        + "WHERE u.roles = :rol")/* ,
        @NamedQuery(name="deleteUser", query="DELETE u FROM User u WHERE u.id = :id") */                                   
})

@Table(name="ARTIESUser")
public class User implements Transferable<User.Transfer> {

    private static final Logger log = LogManager.getLogger(User.class);

    public enum Role {
        USER,			// normal users 
        ADMIN,          // admin users
        STAFF
    }

    public enum ClientType {
        NONE,
        ONLINE,			// normal users 
        ONSITE          // admin users
        
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
	private long id;

    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false)
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;

    private String description;
    private String roles; // split by ',' to separate roles
    private ClientType clientType; // NONE by default


    public User (String username, String password, String firstName, 
    String lastName, String email, String address, String phone, String roles, ClientType clientType, String description){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName= lastName;
        this.email=email;
        this.address=address;
        this.phone = phone;
        this.roles =roles;
        this.clientType = clientType;
        this.description = description;
    }

    public User (String username, String password, String firstName, 
    String lastName, String email, String address, String phone, String roles, ClientType clientType){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName= lastName;
        this.email=email;
        this.address=address;
        this.phone = phone;
        this.roles =roles;
        this.clientType = clientType;
    }

    //por cada usuario, tenemos en esta var la lista de items que tiene alquilados
    
    @OneToMany (mappedBy = "user", cascade = CascadeType.REMOVE)//TODO resvisar. Sin eso no se puede acceder a esta lista desde el controlador de items
    @JsonIgnore
    private List<ItemLoans> itemLoans;


    @OneToMany (mappedBy = "user", cascade = CascadeType.REMOVE)//TODO resvisar. Sin eso no se puede acceder a esta lista desde el controlador de items
    @JsonIgnore
    private List<SessionBookings> sessionBookings;

    // EAGER: cuando se construye el USER, mete la lista de items del tiron
    // LAZY: solo se asocian los datos a la lista de items bajo demanda (getItems)
    // Es muy pesado "precargar" los datos de la lista, si no se va a usar ese atributo
    // Ademas, hibernate solo deja tener 1 EAGER simultaneamente
    
    @OneToMany (mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    //@LazyCollection(LazyCollectionOption.FALSE)
    private List<RelationUserCourse> coursesList;

    @OneToMany (mappedBy = "user", cascade = CascadeType.REMOVE)
    /* @OnDelete(action = OnDeleteAction.CASCADE) */
    @JsonIgnore
    private List<ChatMessage> messagesList;

    /**
     * Checks whether this user has a given role.
     * @param role to check
     * @return true iff this user has that role.
     */
    public boolean hasRole(Role role) {
        String roleName = role.name();
        return Arrays.asList(roles.split(",")).contains(roleName);
    }

    public boolean hasAnyRole(Role... rolesToComprobate) {
        for(Role r : rolesToComprobate)//recorre la lista de roles a comprobar si tiene el usuario
        {
            String roleName = r.name();
            if(Arrays.asList(roles.split(",")).contains(roleName)) //si alguno de los roles, coincide con alguno de los roles del usuario, entonces true
                return true;
        }
        return false;
    }

    public boolean hasAnySub()
    {
        log.info("las subs son: "+ clientType);
        return clientType == ClientType.ONLINE || clientType == ClientType.ONSITE;
    }

    public boolean isType(ClientType type)
    {
        return clientType == type;
    }

    public boolean isType(String type)
    {
        return clientType == strToClientType(type);
    }

    public ClientType strToClientType(String clientType)
    {
        if (clientType.equalsIgnoreCase("ONLINE")) {
            return ClientType.ONLINE;
        } else if (clientType.equalsIgnoreCase("ONSITE")) {
            return ClientType.ONSITE;
        } else {
            return ClientType.NONE;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Transfer {
		private long id;
        private String username;
    }

	@Override
    public Transfer toTransfer() {
		return new Transfer(id,	username);
	}
	
	@Override
	public String toString() {
		return toTransfer().toString();
	}

    
    public boolean hasItemLoan(Item item)
    {
        log.info("comprobando items loans del user " + id);
        for (ItemLoans il : itemLoans) {
            log.info("id item: "+ il.getItem().getId());
            if(il.getItem().getId() == item.getId() && il.isActive())
            return true;
        }

        return false;
    }

    //@Transactional
    public boolean hasItemLoan(long itemId)
    {
        log.info("comprobando items loans del user " + id);
        for (ItemLoans il : itemLoans) {
            log.info("id item: "+ il.getItem().getId());
            if(il.getItem().getId() == itemId && il.isActive())
            return true;
        }

        return false;
    }

    public boolean hasItemLoanId(long loanId)
    {
        log.info("comprobando items loans del user " + id);
        for (ItemLoans il : itemLoans) {
            log.info("id item: "+ il.getItem().getId());
            if(il.getId() == loanId && il.isActive())
            return true;
        }

        return false;
    }

    @Transactional
    public void addItemLoan(ItemLoans itemLoan, Item item)
    {
        this.itemLoans.add(itemLoan);
        item.getItemLoans().add(itemLoan);
    }




    public ItemLoans getOneItemLoan(long itemId)
    {
        for (ItemLoans il : itemLoans) {
            if(il.getItem().getId() == itemId && il.isActive())
            return il;
        }
        return null;
    }

    public ItemLoans removeItemLoan(long idItem, long idLoan)
    {
        ItemLoans toRemove = null;
        for(ItemLoans il:itemLoans)
        {
            if(il.getId() == idLoan && il.getItem().getId() == idItem)
            {
                toRemove = il;
                il.setActive(false);
                log.info("id encontrado en user");
            }
                
        }

        if(toRemove != null)
        {
            //itemLoans.remove(toRemove);
            
        }

        return toRemove;
    }

    public ItemLoans undoRemoveItemLoan(long idItem, long idLoan)
    {
        ItemLoans toRemove = null;
        for(ItemLoans il:itemLoans)
        {
            if(il.getId() == idLoan && il.getItem().getId() == idItem)
            {
                toRemove = il;
                il.setActive(true);
                log.info("id encontrado en user");
            }
                
        }

        if(toRemove != null)
        {
            //itemLoans.remove(toRemove);
            
        }

        return toRemove;
    }

    
    public void removeBookSession(long idSession)
    {
        SessionBookings toRemove = null;
        for(SessionBookings sb:sessionBookings)
        {
            if(sb.getSession().getId() == idSession)
            {
                toRemove = sb;
            }
                
        }
        if(toRemove != null)
        {
            sessionBookings.remove(toRemove);
        }
    }


    public List<AttendedLesson> getAttendance(){
        List<AttendedLesson> attendance = new ArrayList<>();
        HashMap<String, Integer> aux = new HashMap<>();
        LocalDateTime actual = LocalDateTime.now();

        for(SessionBookings sb : sessionBookings)
        {
            //si la clase fue antes de la fecha actual (asi no cuenta para estadisticas futuras reservas)
            if(sb.getSession().getDate().compareTo(actual) < 0)
            {
                String lessonName = sb.getSession().getLesson().getName();
                if(aux.containsKey(lessonName))
                {
                    Integer prev = aux.get(lessonName);
                    aux.put(lessonName, (prev+1));
                }
                else
                    aux.put(lessonName, (1));
            }
        }

        for (Map.Entry<String, Integer> entry : aux.entrySet()) {
            String key = entry.getKey();
            Integer value = entry.getValue();

            attendance.add(new AttendedLesson(key, value));
            // Realizar operaciones con la clave y el valor...
        }


        return attendance;
    }


    public List<TimesLoanedItem> getHistoryLoans(){
        List<TimesLoanedItem> history = new ArrayList<>();
        HashMap<String, Integer> aux = new HashMap<>();

        for(ItemLoans il : itemLoans)
        {
            //si la clase fue antes de la fecha actual (asi no cuenta para estadisticas futuras reservas)
            if(!il.isActive())
            {
                String itemName = il.getItem().getName();
                if(aux.containsKey(itemName))
                {
                    Integer prev = aux.get(itemName);
                    aux.put(itemName, (prev+1));
                }
                else
                    aux.put(itemName, (1));
            }
        }

        for (Map.Entry<String, Integer> entry : aux.entrySet()) {
            String key = entry.getKey();
            Integer value = entry.getValue();

            history.add(new TimesLoanedItem(key, value));
            // Realizar operaciones con la clave y el valor...
        }


        return history;
    }

 /*    public void incrementCourseTimesDone(long idCourse)
    {
        for(RelationUserCourse ruc: coursesList)
        {
            if(ruc.getCourse().get)
        }
    } */
}

