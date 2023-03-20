package es.ucm.fdi.arties.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Embeddable
@Data
@AllArgsConstructor
public class ItemLoansId implements Serializable{
    private long user;
    private long item;

    public ItemLoansId(){};
}
