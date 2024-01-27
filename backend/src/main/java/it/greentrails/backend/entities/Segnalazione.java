package it.greentrails.backend.entities;

import it.greentrails.backend.enums.StatoSegnalazione;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

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
  private StatoSegnalazione stato = StatoSegnalazione.CREATA;

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