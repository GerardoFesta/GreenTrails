package it.greentrails.backend.gestionePrenotazioni.repository;

import it.greentrails.backend.entities.PrenotazioneAlloggio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrenotazioneAlloggioRepository extends JpaRepository<PrenotazioneAlloggio, Long> {

    @Query("SELECT p FROM PrenotazioneAlloggio p JOIN p.camera.alloggio a WHERE a.id = ?1")
    Page<PrenotazioneAlloggio> findByAlloggio(Long idAlloggio, Pageable pageable);
}