package it.greentrails.backend.gestioneUtenze.repository;

import it.greentrails.backend.entities.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtenteRepository extends JpaRepository<Utente, Long> {
}