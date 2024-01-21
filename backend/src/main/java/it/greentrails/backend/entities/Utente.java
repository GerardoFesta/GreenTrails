package it.greentrails.backend.entities;

import it.greentrails.backend.enums.RuoloUtente;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "utente")
public class Utente {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nome", length = 50, nullable = false)
    private String nome;

    @Column(name = "cognome", length = 50, nullable = false)
    private String cognome;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_nascita", nullable = false)
    private Date dataNascita;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated
    @Column(name = "ruolo", nullable = false)
    private RuoloUtente ruolo = RuoloUtente.VISITATORE;

}