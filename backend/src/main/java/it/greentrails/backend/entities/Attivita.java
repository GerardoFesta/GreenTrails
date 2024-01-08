package it.greentrails.backend.entities;

import it.greentrails.backend.enums.CategorieAlloggio;
import it.greentrails.backend.enums.CategorieAttivitaTuristica;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.awt.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "attivita")
public class Attivita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_gestore", nullable = false)
    private Utente gestore;

    @Column(name = "nome", nullable = false, length = 50)
    private String nome;

    @Column(name = "indirizzo", nullable = false)
    private String indirizzo;

    @Column(name = "cap", nullable = false, length = 5)
    @JdbcTypeCode(SqlTypes.CHAR)
    private String cap;

    @Column(name = "citta", nullable = false)
    private String citta;

    @Column(name = "provincia", nullable = false, length = 2)
    @JdbcTypeCode(SqlTypes.CHAR)
    private String provincia;

    @Column(name = "coordinate", nullable = false)
    @JdbcTypeCode(SqlTypes.POINT)
    private Point coordinate;

    @Column(name = "prezzo")
    private Double prezzo;

    @Column(name = "descrizione_breve", nullable = false, length = 140)
    private String descrizioneBreve;

    @Column(name = "descrizione_lunga", nullable = false, length = 1000)
    private String descrizioneLunga;

    @Column(name = "media", nullable = false)
    private String media;

    @Column(name = "disponibilita")
    private Integer disponibilita;

    @OneToOne(optional = false, orphanRemoval = true)
    @JoinColumn(name = "id_valori", nullable = false, unique = true)
    private ValoriEcosostenibilita valoriEcosostenibilita;

    @Enumerated
    @Column(name = "categoria_alloggio")
    private CategorieAlloggio categoriaAlloggio;

    @Enumerated
    @Column(name = "categoria_attivita_turistica")
    private CategorieAttivitaTuristica categoriaAttivitaTuristica;

    @Column(name = "is_alloggio", nullable = false)
    private boolean isAlloggio = false;

    @ManyToMany
    @JoinTable(name = "assegnazione_categorie",
            joinColumns = @JoinColumn(name = "id_attivita"),
            inverseJoinColumns = @JoinColumn(name = "id_categoria"))
    private Set<Categoria> categorie = new LinkedHashSet<>();

}