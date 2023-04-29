package es.ucm.fdi.arties.model.DB;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import com.fasterxml.jackson.databind.JsonNode;

import es.ucm.fdi.arties.model.Category;
import es.ucm.fdi.arties.model.ChatMessage;
import es.ucm.fdi.arties.model.Course;
import es.ucm.fdi.arties.model.User;
import es.ucm.fdi.arties.model.User.ClientType;

import org.apache.logging.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;
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

    public List<Course> getFreeCoursesList(EntityManager em) {
        List<Course> courses = null;

        courses = em.createNamedQuery("course.freeCoursesList", Course.class).getResultList();
        return courses;
    }

    public User getUserByUsername(EntityManager em, String username){
        User u = null;
        log.info("&&&&&: " + username);
        u = em.createNamedQuery("User.byUsername", User.class).setParameter("username", username).getSingleResult();

        return u;
    }

    @Transactional
    public User getUser(EntityManager em, long userId)
    {
        log.info("&&&&&: dentro de getUsuario by id: " +  userId);
        /* User u = em.find(User.class, userId); */
        User u = em.createNamedQuery("User.byId", User.class).setParameter("idUser", userId).getSingleResult();
        return u;
    }

    public Boolean existsUser(EntityManager em, String username)
    {
        List<User> lu = em.createNamedQuery("User.existsUsername", User.class).setParameter("username", username).getResultList();
        if(lu.size() == 0) return false;
        else return true;
    }

    public Boolean existsUserById(EntityManager em, Long id)
    {
        User u = em.find(User.class, id);
        if(u == null) return false;
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

    public List<User> getUsersByRol(EntityManager em, String rol){
        List<User> lu = null;
        lu = em.createNamedQuery("User.byRol", User.class).setParameter("rol", "STAFF").getResultList();
        return lu;
    }

    public List<Category> getCoursesCatogories(EntityManager em) {
        List<Category> lc = null;
        lc = em.createNamedQuery("getList", Category.class).getResultList();
        return lc;
    }

    public void deleteUser(EntityManager em, long idUser){
        /* User u = em.createNamedQuery("deleteUser", User.class).setParameter("idUser", idUser).getSingleResult(); */
        User u = em.find(User.class, idUser);
        em.remove(u);
        em.flush();
    }

    public Course getCourse(EntityManager em, long idCourse){
        Course c = em.find(Course.class, idCourse);
        return c;
    }

    public User modifyUser(EntityManager em, Long idUser, User user){

        /* log.info("id de db: " + user.getId()); */
        User u = em.find(User.class, idUser);
        /* log.info("user cogido: " + u.getFirstName()); */

        u.setAddress(user.getAddress());
        u.setEmail(user.getEmail());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        if(!user.getPassword().equals("")) {
            u.setPassword(user.getPassword());
        }
        u.setPhone(user.getPhone());
        u.setUsername(user.getUsername());

        return u;
    }

    public List<ChatMessage> getGeneralQuestions(EntityManager em){
        List<ChatMessage> lcm = em.createNamedQuery("getGeneralQuestions", ChatMessage.class).getResultList();
        return lcm;
    }

    /* public List<ChatMessage> getUserChats(EntityManager em, Long id){
        List<ChatMessage> lcm = em.createNamedQuery("getUserChats", ChatMessage.class).setParameter("userId", id).getResultList();
        // to remove duplicates (cant do group by because each msg has a unique id)
        Set<ChatMessage> map  = new HashSet<ChatMessage>();
        for(ChatMessage)
        return lcm;
    } */

    public List<User> getStaffChats(EntityManager em, Long staffId){
        List<ChatMessage> lcm = em.createNamedQuery("getStaffChats", ChatMessage.class).setParameter("id", staffId).getResultList();
        // to remove duplicates (cant do group by because each msg has a unique id)
        Set<User> set  = new LinkedHashSet<User>();
        for(ChatMessage cm: lcm){
            set.add(cm.getUser());
        }
        //get unique users list
        List<User> lu = new ArrayList<>(set);
        return lu;
    }

    public List<User> getUserChats(EntityManager em, Long userId){
        List<ChatMessage> lcm = em.createNamedQuery("getUserChats", ChatMessage.class).setParameter("id", userId).getResultList();
        // to remove duplicates (cant do group by because each msg has a unique id)
        Set<User> set  = new LinkedHashSet<User>();
        for(ChatMessage cm: lcm){
            if(cm.getStaff() != null) set.add(cm.getStaff()); // so no general question are taken
        }
        //get unique users list
        List<User> lu = new ArrayList<>(set);
        return lu;
    }

    public void linkQuestionStaff(EntityManager em, Long messageId, Long staffId){
        ChatMessage cm = em.find(ChatMessage.class, messageId);
        User staff = em.find(User.class, staffId);
        cm.setStaff(staff);
    }

    public List<ChatMessage> getConversation(EntityManager em, Long userId, Long staffId){
        List<ChatMessage> lcm = em.createNamedQuery("getConversation", ChatMessage.class).setParameter("userid", userId).setParameter("staffid", staffId).getResultList();
        return lcm;
    }

    public Long addMessage(EntityManager em, ChatMessage cm){
        long idDevolver = -1;

        em.persist(cm);
        em.flush();
        idDevolver = cm.getId();

        return idDevolver;
    }

    public User suscribe(EntityManager em, User user, ClientType sub) {
        User u = em.find(User.class, user.getId());
        u.setClientType(sub);

        return u;
    }

    public User updateUserDescription(EntityManager em, long id, String desc) {
        User u = em.find(User.class, id);
        u.setDescription(desc);

        return u;
    }
}
