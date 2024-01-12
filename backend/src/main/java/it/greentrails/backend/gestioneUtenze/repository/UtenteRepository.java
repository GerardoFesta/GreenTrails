package it.greentrails.backend.gestioneUtenze.repository;

import it.greentrails.backend.entities.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UtenteRepository extends JpaRepository<Utente, Long> {

    @Query("SELECT u FROM Utente u WHERE u.email = ?1 LIMIT 1")
    Optional<Utente> findOneByEmail(String email);
}