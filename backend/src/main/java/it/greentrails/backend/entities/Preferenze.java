package it.greentrails.backend.entities;

import it.greentrails.backend.enums.PreferenzeAlimentari;
import it.greentrails.backend.enums.PreferenzeAlloggio;
import it.greentrails.backend.enums.PreferenzeAttivita;
import it.greentrails.backend.enums.PreferenzeBudget;
import it.greentrails.backend.enums.PreferenzeStagione;
import it.greentrails.backend.enums.PreferenzeViaggio;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "preferenze")
public class Preferenze {

  @Id
  @Column(name = "id_visitatore", nullable = false)
  private Long id;

  @OneToOne
  @MapsId
  @JoinColumn(name = "id_visitatore", nullable = false)
  private Utente visitatore;

  @Enumerated
  @Column(name = "viaggio_preferito", nullable = false)
  private PreferenzeViaggio viaggioPreferito;

  @Enumerated
  @Column(name = "alloggio_preferito", nullable = false)
  private PreferenzeAlloggio alloggioPreferito;

  @Enumerated
  @Column(name = "preferenza_alimentare", nullable = false)
  private PreferenzeAlimentari preferenzaAlimentare;

  @Enumerated
  @Column(name = "attivita_preferita", nullable = false)
  private PreferenzeAttivita attivitaPreferita;

  @Column(name = "animale_domestico", nullable = false)
  private Boolean animaleDomestico = false;

  @Enumerated
  @Column(name = "budget_preferito", nullable = false)
  private PreferenzeBudget budgetPreferito;

  @Column(name = "souvenir", nullable = false)
  private Boolean souvenir = false;

  @Enumerated
  @Column(name = "stagioni_preferite", nullable = false)
  private PreferenzeStagione stagioniPreferite;

}