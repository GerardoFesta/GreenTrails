package it.greentrails.backend.gestioneItinerari.service;

import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.Preferenze;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.enums.RuoloUtente;
import it.greentrails.backend.gestioneItinerari.adapter.GestioneItinerariAdapter;
import it.greentrails.backend.gestioneItinerari.repository.ItinerariRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GestioneItinerariService {

    private final ItinerariRepository repository;

    public Itinerario saveItinerario(Itinerario itinerario) throws Exception {
        if (itinerario == null) {
            throw new Exception("L'itinerario è vuoto.");
        }
        return repository.save(itinerario);
    }


    public Itinerario createByPreferenze(Preferenze preferenze) throws Exception {
        if (preferenze == null) {
            throw new Exception("Le preferenze sono vuote.");
        }
        // TODO: modificare dopo integrazione modulo AI
        return new GestioneItinerariAdapter().pianificazioneAutomatica(preferenze);
    }

    public List<Itinerario> findItinerariByUtente(Utente utente) throws Exception {
        if (utente == null) {
            throw new Exception("L'utente è vuoto.");
        }
        if (utente.getRuolo() != RuoloUtente.VISITATORE) {
            throw new Exception("L'utente non è un visitatore.");
        }
            return repository.findByVisitatore(utente.getId(), Pageable.unpaged()).toList();
    }

    public boolean deleteItinerario(Itinerario itinerario) throws Exception {
        if (itinerario == null) {
            throw new Exception("L'itinerario è vuoto.");
        }
        repository.delete(itinerario);
        repository.flush();
        return repository.findById(itinerario.getId()).isEmpty();
    }

    public Itinerario findById(Long id) throws Exception{
        if(id == null || id < 0){
            throw new Exception("L'id non è valido.");
        }
        Optional<Itinerario> itinerario = repository.findById(id);
        if(itinerario.isEmpty()) {
            throw new Exception("L'itinerario non è stato trovato.");
        }
        return itinerario.get();
    }

}
