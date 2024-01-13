package it.greentrails.backend.entities;

import it.greentrails.backend.enums.RuoloUtente;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

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