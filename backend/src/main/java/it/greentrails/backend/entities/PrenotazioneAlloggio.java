package it.greentrails.backend.entities;

import it.greentrails.backend.enums.StatoPagamento;
import it.greentrails.backend.enums.StatoPrenotazione;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "prenotazione_alloggio")
public class PrenotazioneAlloggio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_itinerario", nullable = false)
    private Itinerario itinerario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_camera", nullable = false)
    private Camera camera;

    @Column(name = "num_adulti", nullable = false)
    private int numAdulti;

    @Column(name = "num_bambini", nullable = false)
    private int numBambini;

    @Temporal(TemporalType.TIME)
    @Column(name = "data_inizio", nullable = false)
    private Date dataInizio;

    @Temporal(TemporalType.TIME)
    @Column(name = "data_fine", nullable = false)
    private Date dataFine;

    @Column(name = "num_camere", nullable = false)
    private int numCamere;

    @Enumerated
    @Column(name = "stato", nullable = false)
    private StatoPrenotazione stato = StatoPrenotazione.NON_CONFERMATA;

    @Enumerated
    @Column(name = "stato_pagamento", nullable = false)
    private StatoPagamento statoPagamento = StatoPagamento.IN_CORSO;

    @Column(name = "prezzo", nullable = false)
    private double prezzo;

}