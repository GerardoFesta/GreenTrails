package it.greentrails.backend.gestioneprenotazioni.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.PrenotazioneAttivitaTuristica;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.enums.RuoloUtente;
import it.greentrails.backend.enums.StatoPrenotazione;
import it.greentrails.backend.gestioneprenotazioni.repository.PrenotazioneAttivitaTuristicaRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PrenotazioneAttivitaTuristicaService {

  private final PrenotazioneAttivitaTuristicaRepository repository;

  public PrenotazioneAttivitaTuristica savePrenotazioneAttivitaTuristica(Attivita attivita,
      PrenotazioneAttivitaTuristica prenotazioneAttivitaTuristica) throws Exception {
    if (prenotazioneAttivitaTuristica == null) {
      throw new Exception("La prenotazione dell'attività è vuota.");
    }
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    if (attivita.isAlloggio()) {
      throw new Exception("L'attività non può essere un alloggio.");
    }
    prenotazioneAttivitaTuristica.setAttivitaTuristica(attivita);
    return repository.save(prenotazioneAttivitaTuristica);
  }

  public boolean deletePrenotazioneAttivitaTuristica(
      PrenotazioneAttivitaTuristica prenotazioneAttivitaTuristica) throws Exception {
    if (prenotazioneAttivitaTuristica == null) {
      throw new Exception("La prenotazione dell'attività è vuota.");
    }
    repository.delete(prenotazioneAttivitaTuristica);
    repository.flush();
    return repository.findById(prenotazioneAttivitaTuristica.getId()).isEmpty();
  }

  public List<PrenotazioneAttivitaTuristica> getAllPrenotazioniAttivitaTuristica() {
    return repository.findAll();
  }

  public List<PrenotazioneAttivitaTuristica> getPrenotazioniAttivitaTuristicaByStato(
      StatoPrenotazione stato) throws Exception {
    if (stato == null) {
      throw new Exception("Lo stato della prenotazione dell'attività è inesistente.");
    }
    List<PrenotazioneAttivitaTuristica> risultato = new ArrayList<>();
    getAllPrenotazioniAttivitaTuristica().forEach(p -> {
      if (p.getStato().equals(stato)) {
        risultato.add(p);
      }
    });
    return risultato;
  }

  public PrenotazioneAttivitaTuristica findById(Long id) throws Exception {
    if (id == null || id < 0) {
      throw new Exception("L'id non è valido.");
    }
    Optional<PrenotazioneAttivitaTuristica> prenotazioneAttivitaTuristica = repository.findById(id);
    if (prenotazioneAttivitaTuristica.isEmpty()) {
      throw new Exception("La prenotazione non è stata trovata.");
    }
    return prenotazioneAttivitaTuristica.get();
  }

  public List<PrenotazioneAttivitaTuristica> getPrenotazioniByAttivitaTuristica(Attivita attivita)
      throws Exception {
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    return repository.findByAttivitaTuristica(attivita.getId(), Pageable.unpaged()).toList();
  }

  public List<PrenotazioneAttivitaTuristica> getPrenotazioniByVisitatore(Utente visitatore)
      throws Exception {
    if (visitatore == null) {
      throw new Exception("L'utente è vuoto.");
    }
    if (visitatore.getRuolo() != RuoloUtente.VISITATORE) {
      throw new Exception("L'utente non è un visitatore.");
    }
    return repository.findByVisitatore(visitatore.getId(), Pageable.unpaged()).toList();
  }

  public List<PrenotazioneAttivitaTuristica> getPrenotazioniByItinerario(Itinerario itinerario)
      throws Exception {
    if (itinerario == null) {
      throw new Exception("L'itinerario è vuoto.");
    }
    return repository.findByItinerario(itinerario.getId(), Pageable.unpaged()).toList();
  }

  public int controllaDisponibilitaAttivitaTuristica(Attivita attivita, Date dataInizio)
      throws Exception {
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    if (attivita.isAlloggio()) {
      throw new Exception("L'attività non può essere un alloggio.");
    }
    return attivita.getDisponibilita() - repository.getPostiOccupatiIn(dataInizio);
  }

}
