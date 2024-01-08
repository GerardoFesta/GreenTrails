package it.greentrails.backend.entities;

import it.greentrails.backend.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@Table(name = "preferenze")
public class Preferenze {

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