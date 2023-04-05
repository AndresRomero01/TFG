package es.ucm.fdi.arties.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NamedQueries({
    @NamedQuery(name = "getGeneralQuestions", query = "select m from ChatMessage m where staff_id = null"),
    @NamedQuery(name = "getStaffChats", query = "select m from ChatMessage m where staff_id = :id"),
    @NamedQuery(name = "getConversation", query = "select m from ChatMessage m where staff.id = :staffid AND user.id = :userid"),
    @NamedQuery(name = "getUserChats", query = "select m from ChatMessage m where user_id = :id")
})
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;

    @ManyToOne
    @JsonIgnore
    private User user;

    @Nullable
    @ManyToOne
    @JsonIgnore
    private User staff;

    private String text;
    @Nullable
    private String subject; // this atr is here so it is not necessary to have another object Question, for chat msgs this will be null
    private Boolean userSentIt;

    public ChatMessage(User u, String text, String subject, Boolean userSentIt){
        this.user = u;
        this.text = text;
        this.subject = subject;
        this.userSentIt = userSentIt;
    }

    public ChatMessage(User u, User staff, String text, Boolean userSentIt){
        this.user = u;
        this.text = text;
        this.staff = staff;
        this.userSentIt = userSentIt;
    }
}
