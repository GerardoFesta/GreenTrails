package it.greentrails.backend.gestioneAttivita.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Recensione;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneAttivita.repository.RecensioneRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class RecensioneService {

  private final RecensioneRepository repository;

  public Recensione saveRecensione(Recensione recensione) throws Exception {
    if (recensione == null) {
      throw new Exception("La recensione è vuota.");
    }
    return repository.save(recensione);
  }

  public Recensione findById(Long id) throws Exception {
    if (id == null || id < 0) {
      throw new Exception("L'id non è valido.");
    }
    Optional<Recensione> recensione = repository.findById(id);
    if (recensione.isEmpty()) {
      throw new Exception("La recensione non è stata trovata.");
    }
    return recensione.get();
  }

  public boolean deleteRecensione(Recensione recensione) throws Exception {
    if (recensione == null) {
      throw new Exception("La recensione è vuota.");
    }
    repository.delete(recensione);
    repository.flush();
    return repository.findById(recensione.getId()).isEmpty();
  }

  public List<Recensione> getRecensioniByAttivita(Attivita attivita) throws Exception {
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    return repository.findByAttivita(attivita.getId(), Pageable.unpaged()).toList();
  }

  public List<Recensione> getAllRecensioniByVisitatore(Utente utente) throws Exception {
    if (utente == null) {
      throw new Exception("L'utente è vuoto.");
    }
    List<Recensione> recensioni = new ArrayList<>();
    repository.findAll().forEach(r -> {
      if (r.getVisitatore().getId().equals(utente.getId())) {
        recensioni.add(r);
      }
    });
    return recensioni;
  }
}
