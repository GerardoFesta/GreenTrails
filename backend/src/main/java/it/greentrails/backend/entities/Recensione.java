package it.greentrails.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recensione")
public class Recensione {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_visitatore")
  private Utente visitatore;

  @ManyToOne(optional = false)
  @JoinColumn(name = "id_attivita", nullable = false)
  private Attivita attivita;

  @Column(name = "valutazione_stelle_esperienza", nullable = false)
  private int valutazioneStelleEsperienza;

  @Column(name = "descrizione", nullable = false)
  private String descrizione;

  @Column(name = "media", nullable = false)
  private String media;

  @ManyToOne(optional = false)
  @JoinColumn(name = "id_valori", nullable = false)
  private ValoriEcosostenibilita valoriEcosostenibilita;

}