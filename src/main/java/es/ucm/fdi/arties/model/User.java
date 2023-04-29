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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
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
        ONLINE,			// normal users 
        ONSITE,          // admin users
        NONE
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
    
    @OneToMany (mappedBy = "user")//TODO resvisar. Sin eso no se puede acceder a esta lista desde el controlador de items
    @JsonIgnore
    private List<ItemLoans> itemLoans;

    // EAGER: cuando se construye el USER, mete la lista de items del tiron
    // LAZY: solo se asocian los datos a la lista de items bajo demanda (getItems)
    // Es muy pesado "precargar" los datos de la lista, si no se va a usar ese atributo
    // Ademas, hibernate solo deja tener 1 EAGER simultaneamente
    
    @OneToMany (mappedBy = "user")
    @JsonIgnore
    //@LazyCollection(LazyCollectionOption.FALSE)
    private List<RelationUserCourse> coursesList;

    @OneToMany (mappedBy = "user")
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
            if(il.getItem().getId() == item.getId())
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
            if(il.getItem().getId() == itemId)
            return true;
        }

        return false;
    }

    public void addItemLoan(ItemLoans itemLoan, Item item)
    {
        this.itemLoans.add(itemLoan);
        item.getItemLoans().add(itemLoan);
    }

    public ItemLoans getOneItemLoan(long itemId)
    {
        for (ItemLoans il : itemLoans) {
            if(il.getItem().getId() == itemId)
            return il;
        }
        return null;
    }

    public ItemLoans removeItemLoan(long idItem)
    {
        ItemLoans toRemove = null;
        for(ItemLoans il:itemLoans)
        {
            if(il.getItem().getId() == idItem)
            {
                toRemove = il;
                log.info("id encontrado en user");
            }
                
        }

        if(toRemove != null)
        {
            itemLoans.remove(toRemove);
        }

        return toRemove;
    }
}

