package es.ucm.fdi.arties.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GymSub {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "gen")
    private long id;

    private Double onlinePrice;
    private Double onsitePrice;

    ArrayList<String> onlineInfo;
    ArrayList<String> onsiteInfo;

    /* public GymSub(Long id, Double onlinePrice, Double onsitePrice){
        this.id=id;
        this.onlinePrice = onlinePrice;
        this.onsitePrice = onsitePrice;
        this.onlineInfo = new ArrayList<>(Arrays.asList("Acceso a todos los cursos", "Acceso a material de apoyo", "Ayuda por chat"));
        this.onsiteInfo = new ArrayList<>(Arrays.asList("Acceso a todos los cursos", "Acceso a material de apoyo", "Ayuda por chat", "Acceso al gimnasio", "Acceso gratis a las clases"));

    } */

    public void setOnlineInfo(ArrayList<String> info){
        onlineInfo = new ArrayList<>();
        for(String i: info){
            onlineInfo.add(i);
        }
    }
    
}
