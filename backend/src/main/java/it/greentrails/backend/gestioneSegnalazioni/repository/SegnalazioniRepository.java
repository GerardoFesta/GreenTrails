package it.greentrails.backend.gestioneSegnalazioni.repository;

import it.greentrails.backend.entities.Segnalazione;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SegnalazioniRepository extends JpaRepository<Segnalazione, Long> {
}