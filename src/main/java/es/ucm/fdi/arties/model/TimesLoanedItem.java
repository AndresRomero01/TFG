package es.ucm.fdi.arties.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TimesLoanedItem {

    private String name;
    private Integer times;
    
}
