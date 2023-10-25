package com.example.gempruntes.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Emprunte implements Serializable {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    long id ;
    long idLivre;
String description;

@Temporal(TemporalType.DATE)
    Date date;


}
