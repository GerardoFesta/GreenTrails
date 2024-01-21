package it.greentrails.backend.gestioneprenotazioni.repository;

import it.greentrails.backend.entities.PrenotazioneAlloggio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrenotazioneAlloggioRepository extends JpaRepository<PrenotazioneAlloggio, Long> {

  @Query("SELECT p FROM PrenotazioneAlloggio p JOIN p.camera.alloggio a WHERE a.id = ?1")
  Page<PrenotazioneAlloggio> findByAlloggio(Long idAlloggio, Pageable pageable);

  @Query("SELECT p FROM PrenotazioneAlloggio p WHERE p.itinerario.visitatore.id = ?1")
  Page<PrenotazioneAlloggio> findByVisitatore(Long idVisitatore, Pageable pageable);

  @Query("SELECT p FROM PrenotazioneAlloggio p WHERE p.itinerario.id = ?1")
  Page<PrenotazioneAlloggio> findByItinerario(Long idItinerario, Pageable pageable);
}