package it.greentrails.backend.gestionePrenotazioni.repository;

import it.greentrails.backend.entities.PrenotazioneAlloggio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrenotazioneAlloggioRepository extends JpaRepository<PrenotazioneAlloggio, Long> {
}