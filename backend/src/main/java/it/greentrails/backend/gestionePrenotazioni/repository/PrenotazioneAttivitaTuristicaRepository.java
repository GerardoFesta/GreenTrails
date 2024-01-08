package it.greentrails.backend.gestionePrenotazioni.repository;

import it.greentrails.backend.entities.PrenotazioneAttivitaTuristica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrenotazioneAttivitaTuristicaRepository extends JpaRepository<PrenotazioneAttivitaTuristica, Long> {
}