package es.ucm.fdi.arties.model;

import java.time.LocalDateTime;

public class RelationUserSubs {
    private long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    
    private User user;
    private Subscription sub;
}
