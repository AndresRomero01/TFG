package es.ucm.fdi.arties.model;

import java.time.LocalDateTime;

public class RelationUserItem {
    private long id;
    private User user;
    private Item item;
    private LocalDateTime loanStart;
    private LocalDateTime loanEnd;
}
