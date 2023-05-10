package es.ucm.fdi.arties.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class SessionBookings {


    @EmbeddedId private SessionBookingsId id;

    @ManyToOne
    @MapsId("user")private User user;
    
    @ManyToOne
    @MapsId("session") private Session session;

    public SessionBookings(){};

   

    
}
