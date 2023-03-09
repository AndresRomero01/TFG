package es.ucm.fdi.arties.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Arrays;
import java.util.List;

/**
 * An authorized user of the system.
 */
@Entity
@Data
@NoArgsConstructor
@NamedQueries({
    @NamedQuery(name="User.byUsername", query="SELECT u FROM User u WHERE u.username = :username"),
    @NamedQuery(name="User.byId", query="SELECT u FROM User u WHERE u.id = :idUser")                           
})
/* @NamedQueries({
        @NamedQuery(name="User.byUsername",
                query="SELECT u FROM User u "
                        + "WHERE u.username = :username AND u.enabled = TRUE")                           
        }) */

@Table(name="ARTIESUser")
public class User implements Transferable<User.Transfer> {

    public User (String username, String password, String firstName, 
    String lastName, String email, String address, String phone, String roles, Boolean enabled){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName= lastName;
        this.email=email;
        this.address=address;
        this.phone= phone;
        this.roles =roles;
        this.enabled = enabled;
    }

    public enum Role {
        USER,			// normal users 
        ADMIN,          // admin users
        EMPLEADO
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
    private boolean enabled;
    private String roles; // split by ',' to separate roles
    private ClientType clientType; // NONE by default

	@OneToMany (mappedBy = "user")
    private List<RelationUserCourse> coursesList;

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
}

