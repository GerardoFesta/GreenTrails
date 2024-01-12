package it.greentrails.backend.gestionePrenotazioni.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Camera;
import it.greentrails.backend.entities.PrenotazioneAlloggio;
import it.greentrails.backend.enums.StatoPrenotazione;
import it.greentrails.backend.gestionePrenotazioni.repository.PrenotazioneAlloggioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrenotazioneAlloggioService {

    private final PrenotazioneAlloggioRepository repository;

    public PrenotazioneAlloggio savePrenotazioneAlloggio(Camera camera, PrenotazioneAlloggio prenotazioneAlloggio) throws Exception {
        if (prenotazioneAlloggio == null) {
            throw new Exception("La prenotazione dell'attività è vuota.");
        }
        if (camera == null) {
            throw new Exception("La camera è vuota.");
        }
        if (camera.getAlloggio() == null) {
            throw new Exception("La camera non ha un alloggio collegato.");
        }
        prenotazioneAlloggio.setCamera(camera);
        return repository.save(prenotazioneAlloggio);
    }

    public boolean deletePrenotazioneAlloggio(PrenotazioneAlloggio prenotazioneAlloggio) throws Exception {
        if (prenotazioneAlloggio == null) {
            throw new Exception("La prenotazione dell'alloggio è vuota.");
        }
        repository.delete(prenotazioneAlloggio);
        repository.flush();
        return repository.findById(prenotazioneAlloggio.getId()).isEmpty();
    }

    public List<PrenotazioneAlloggio> getAllPrenotazioniAlloggio() {
        return repository.findAll();
    }

    public List<PrenotazioneAlloggio> getPrenotazioniAlloggioByStato(StatoPrenotazione stato) throws Exception {
        if (stato == null) {
            throw new Exception("Lo stato della prenotazione dell'alloggio è inesistente.");
        }
        List<PrenotazioneAlloggio> risultato = new ArrayList<>();
        getAllPrenotazioniAlloggio().forEach(p -> {
            if (p.getStato().equals(stato)) {
                risultato.add(p);
            }
        });
        return risultato;
    }

    public PrenotazioneAlloggio findById(Long id) throws Exception {
        if (id == null || id < 0) {
            throw new Exception("L'id non è valido.");
        }
        Optional<PrenotazioneAlloggio> prenotazioneAlloggio = repository.findById(id);
        if (prenotazioneAlloggio.isEmpty()) {
            throw new Exception("La prenotazione non è stata trovata.");
        }
        return prenotazioneAlloggio.get();
    }


    public List<PrenotazioneAlloggio> getPrenotazioniByAlloggio(Attivita attivita) throws Exception {
        if (attivita == null) {
            throw new Exception("L'attività è vuota.");
        }
        if (!attivita.isAlloggio()) {
            throw new Exception("L'attività non può essere un'attività turistica.");
        }
        return repository.findByAlloggio(attivita.getId(), Pageable.unpaged()).toList();
    }
}
