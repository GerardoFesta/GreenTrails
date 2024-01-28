package it.greentrails.backend.gestioneattivita.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.ValoriEcosostenibilita;
import it.greentrails.backend.gestioneattivita.repository.AttivitaRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

public interface AttivitaService {

   Attivita saveAttivita(Attivita attivita) throws Exception;

   Attivita findById(Long id) throws Exception;

   List<Attivita> findAllAttivitaByGestore(Long idGestore) throws Exception;

   Optional<Attivita> findByValori(ValoriEcosostenibilita valoriEcosostenibilita)
      throws Exception;

   List<Attivita> getAttivitaTuristicheEconomiche(int limite);

   boolean deleteAttivita(Attivita attivita) throws Exception;
   List<Attivita> getAlloggi(int limite);
   List<Attivita> getAttivitaTuristiche(int limite);

   List<Attivita> findAll();

}
