package it.greentrails.backend.gestioneAttivita.repository;

import it.greentrails.backend.entities.Attivita;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AttivitaRepository extends JpaRepository<Attivita, Long> {

  @Query("SELECT a FROM Attivita a WHERE a.gestore.id = ?1")
  Page<Attivita> findByGestore(Long idGestore, Pageable pageable);
}