package it.greentrails.backend.gestioneattivita.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.ValoriEcosostenibilita;
import it.greentrails.backend.gestioneattivita.repository.AttivitaRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttivitaServiceImpl {

  private final AttivitaRepository repository;

  public Attivita saveAttivita(Attivita attivita) throws Exception {
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    return repository.save(attivita);
  }

  public Attivita findById(Long id) throws Exception {
    if (id == null || id < 0) {
      throw new Exception("L'id non è valido.");
    }
    Optional<Attivita> attivita = repository.findById(id);
    if (attivita.isEmpty()) {
      throw new Exception("L'attività non è stata trovata.");
    }
    return attivita.get();
  }

  public List<Attivita> findAllAttivitaByGestore(Long idGestore) throws Exception {
    if (idGestore == null || idGestore < 0) {
      throw new Exception("L'id non è valido.");
    }
    return repository.findByGestore(idGestore, Pageable.unpaged()).toList();
  }

  public Optional<Attivita> findByValori(ValoriEcosostenibilita valoriEcosostenibilita)
      throws Exception {
    if (valoriEcosostenibilita == null) {
      throw new Exception("I valori sono vuoti.");
    }
    return repository.findByValori(valoriEcosostenibilita.getId());
  }

  public List<Attivita> getAttivitaTuristicheEconomiche(int limite) {
    return repository.getAllByPrezzo(Pageable.ofSize(limite)).toList();
  }

  public boolean deleteAttivita(Attivita attivita) throws Exception {
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    attivita.setEliminata(true);
    try {
      saveAttivita(attivita);
      return true;
    } catch (Exception e) {
      return false;
    }
  }


}
