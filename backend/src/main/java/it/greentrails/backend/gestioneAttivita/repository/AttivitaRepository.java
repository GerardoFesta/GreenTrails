package it.greentrails.backend.gestioneAttivita.repository;

import it.greentrails.backend.entities.Attivita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttivitaRepository extends JpaRepository<Attivita, Long> {
}