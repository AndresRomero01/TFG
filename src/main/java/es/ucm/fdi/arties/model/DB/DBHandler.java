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
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.User.ClientType;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import lombok.Data;

@Data
public class DBHandler {
    private static final Logger log = LogManager.getLogger(DBHandler.class);
    
    public List<Course> getCoursesList(EntityManager em) {
        List<Course> courses = null;

        courses = em.createNamedQuery("course.list", Course.class).getResultList();
        return courses;
    }

    public User getUserByUsername(EntityManager em, String username){
        User u = null;
        log.info("&&&&&: " + username);
        u = em.createNamedQuery("User.byUsername", User.class).setParameter("username", username).getSingleResult();

        return u;
    }

    public User getUsuario(EntityManager em, long idUsuario)
    {
        log.info("&&&&&: dentro de getUsuario by id: " +  idUsuario);
        /* User u = em.find(User.class, idUsuario); */
        User u = em.createNamedQuery("User.byId", User.class).setParameter("idUser", idUsuario).getSingleResult();
        return u;
    }

    public Boolean existsUser(EntityManager em, String username)
    {
        List<User> lu = em.createNamedQuery("User.existsUsername", User.class).setParameter("username", username).getResultList();
        if(lu.size() == 0) return false;
        else return true;
    }

    public long createUser(EntityManager em, User user){
        long idDevolver = -1;

        if(!existsUser(em, user.getUsername())){
            //User u = new User(username, password, firstName, lastName, email, direccion, telf, roles, enabled);
            em.persist(user);
            em.flush();
            idDevolver = user.getId();
        }

        return idDevolver;
    }
}
