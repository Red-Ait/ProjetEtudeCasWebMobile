package fr.isima.etudecaswebmobile.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    private Long id;
    private String label;

    public Tag(String label) {
        this.label = label;
    }
}
