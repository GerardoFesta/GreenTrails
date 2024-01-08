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
@Table(name = "prenotazione_attivita_turistica")
public class PrenotazioneAttivitaTuristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_itinerario", nullable = false)
    private Itinerario itinerario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_attivita_turistica", nullable = false)
    private Attivita attivitaTuristica;

    @Column(name = "num_adulti", nullable = false)
    private int numAdulti;

    @Column(name = "num_bambini", nullable = false)
    private int numBambini;

    @Temporal(TemporalType.TIME)
    @Column(name = "data_inizio", nullable = false)
    private Date dataInizio;

    @Temporal(TemporalType.TIME)
    @Column(name = "data_fine")
    private Date dataFine;

    @Enumerated
    @Column(name = "stato", nullable = false)
    private StatoPrenotazione stato = StatoPrenotazione.NON_CONFERMATA;

    @Enumerated
    @Column(name = "stato_pagamento", nullable = false)
    private StatoPagamento statoPagamento = StatoPagamento.IN_CORSO;

    @Column(name = "prezzo", nullable = false)
    private double prezzo;

}