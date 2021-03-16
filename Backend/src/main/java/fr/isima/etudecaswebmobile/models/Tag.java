package fr.isima.etudecaswebmobile.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {

    private Long id_tag;

    private String title;
}
