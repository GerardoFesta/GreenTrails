package it.greentrails.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "camera")
public class Camera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_alloggio", nullable = false)
    private Attivita alloggio;

    @Column(name = "tipo_camera", nullable = false, length = 50)
    private String tipoCamera;

    @Column(name = "prezzo", nullable = false)
    private double prezzo;

    @Column(name = "disponibilita", nullable = false)
    private Integer disponibilita;

    @Column(name = "descrizione", nullable = false)
    private String descrizione;

    @Column(name = "capienza", nullable = false)
    private int capienza;

}