package es.ucm.fdi.arties.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;

@Embeddable
@Data
@AllArgsConstructor
public class RelationUserCourseId implements Serializable{
    @JsonIgnore
    private long user;
    @JsonIgnore
    private long course;

    public RelationUserCourseId(){};
}
