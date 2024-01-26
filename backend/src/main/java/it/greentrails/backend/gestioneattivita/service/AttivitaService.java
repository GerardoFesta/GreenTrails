package it.greentrails.backend.gestioneattivita.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.ValoriEcosostenibilita;
import java.util.List;
import java.util.Optional;

public interface AttivitaService {

  Attivita saveAttivita(Attivita attivita) throws Exception;

  Attivita findById(Long id) throws Exception;

  List<Attivita> findAllAttivitaByGestore(Long idGestore) throws Exception;

  Optional<Attivita> findByValori(ValoriEcosostenibilita valoriEcosostenibilita)
      throws Exception;

  List<Attivita> getAttivitaTuristicheEconomiche(int limite);

  public boolean deleteAttivita(Attivita attivita) throws Exception {
    if (attivita == null) {
      throw new Exception("L'attività è vuota.");
    }
    repository.delete(attivita);
    repository.flush();
    return repository.findById(attivita.getId()).isEmpty();
  }
  public List<Attivita> getAlloggi(int limite) {
    return  repository.getAlloggi(Pageable.ofSize(limite)).toList();
  }

  public List<Attivita> getAttivitaTuristiche(int limite) {
    return  repository.getAttivitaTuristiche(Pageable.ofSize(limite)).toList();
  }

}
