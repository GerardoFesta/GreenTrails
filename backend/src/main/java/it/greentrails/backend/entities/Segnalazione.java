package it.greentrails.backend.entities;

import it.greentrails.backend.enums.StatoSegnalazione;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "segnalazione")
public class Segnalazione {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Temporal(TemporalType.TIME)
    @Column(name = "data_segnalazione", nullable = false)
    private Date dataSegnalazione;

    @Column(name = "descrizione", nullable = false)
    private String descrizione;

    @Enumerated
    @Column(name = "stato", nullable = false)
    private StatoSegnalazione stato;

    @Column(name = "is_for_recensione", nullable = false)
    private boolean isForRecensione = false;

    @ManyToOne
    @JoinColumn(name = "id_utente", nullable = false)
    private Utente utente;

    @Column(name = "media")
    private String media;

    @ManyToOne
    @JoinColumn(name = "id_recensione")
    private Recensione recensione;

    @ManyToOne
    @JoinColumn(name = "id_attivita")
    private Attivita attivita;

}