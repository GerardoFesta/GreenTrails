package it.greentrails.backend.gestioneAttivita.repository;

import it.greentrails.backend.entities.Recensione;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecensioneRepository extends JpaRepository<Recensione, Long> {
}