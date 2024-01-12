package it.greentrails.backend.gestionePrenotazioni.controller;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.PrenotazioneAttivitaTuristica;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneAttivita.service.AttivitaService;
import it.greentrails.backend.gestioneItinerari.service.GestioneItinerariService;
import it.greentrails.backend.gestionePrenotazioni.service.PrenotazioneAttivitaTuristicaService;
import it.greentrails.backend.utils.service.ResponseGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;

@RestController
@RequestMapping(path = "api/prenotazioni")
@RequiredArgsConstructor
public class PrenotazioneAttivitaTuristicaController {

    private final GestioneItinerariService gestioneItinerariService;
    private final AttivitaService attivitaService;
    private final PrenotazioneAttivitaTuristicaService prenotazioneAttivitaTuristicaService;


    @PostMapping
    private ResponseEntity<Object> creaPrenotazioneAttivitaTuristica(
            @AuthenticationPrincipal Utente utente,
            @RequestParam("idItinerario") final Long idItinerario,
            @RequestParam("idAttivita") final Long idAttivita,
            @RequestParam("numAdulti") final int numAdulti,
            @RequestParam(value = "numBambini", defaultValue = "0", required = false) final int numBambini,
            @RequestParam("dataInizio") final Long dataInizioTimestamp,
            @RequestParam(value = "dataFine", required = false) final Long dataFineTimestamp
    ) {
        try {
            Itinerario itinerario = gestioneItinerariService.findById(idItinerario);
            if (!itinerario.getVisitatore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Itinerario non trovato");
            }
            Attivita attivita = attivitaService.findById(idAttivita);
            if (attivita.isAlloggio()) {
                throw new Exception("L'attività non è un'attività turistica.");
            }
            Date dataInizio = new Date(dataInizioTimestamp * 1000);
            PrenotazioneAttivitaTuristica prenotazioneAttivitaTuristica = new PrenotazioneAttivitaTuristica();
            prenotazioneAttivitaTuristica.setAttivitaTuristica(attivita);
            prenotazioneAttivitaTuristica.setItinerario(itinerario);
            prenotazioneAttivitaTuristica.setNumAdulti(numAdulti);
            prenotazioneAttivitaTuristica.setNumBambini(numBambini);
            prenotazioneAttivitaTuristica.setDataInizio(dataInizio);
            double prezzo = (numAdulti + numBambini) * attivita.getPrezzo();
            if (dataFineTimestamp != null) {
                Date dataFine = new Date(dataFineTimestamp * 1000);
                prenotazioneAttivitaTuristica.setDataFine(dataFine);
                long durataOre = Duration.between(dataInizio.toInstant(), dataFine.toInstant()).toHours();
                if (durataOre > 24) {
                    prezzo = prezzo * Math.ceil((double) durataOre / 24);
                }
            }
            prenotazioneAttivitaTuristica.setPrezzo(prezzo);
            prenotazioneAttivitaTuristica = prenotazioneAttivitaTuristicaService.savePrenotazioneAttivitaTuristica(attivita, prenotazioneAttivitaTuristica);
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAttivitaTuristica);
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("{id}")
    private ResponseEntity<Object> visualizzaPrenotazioneAttivitaTuristica(
            @AuthenticationPrincipal Utente utente,
            @PathVariable("id") final Long id
    ) {
        try {
            PrenotazioneAttivitaTuristica prenotazioneAttivitaTuristica = prenotazioneAttivitaTuristicaService.findById(id);
            if (!prenotazioneAttivitaTuristica.getItinerario().getVisitatore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Prenotazione non trovata");
            }
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAttivitaTuristica);
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("perAttivita/{idAttivita}")
    private ResponseEntity<Object> visualizzaPrenotazioniAttivitaTuristicaPerAttivita(
            @AuthenticationPrincipal Utente utente,
            @PathVariable("idAttivita") final Long idAttivita
    ) {
        try {
            Attivita attivita = attivitaService.findById(idAttivita);
            if (!attivita.getGestore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Attività turistica non trovata");
            }
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAttivitaTuristicaService.getPrenotazioniByAttivitaTuristica(attivita));
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping
    private ResponseEntity<Object> visualizzaPrenotazioniAttivitaTuristicaPerVisitatore(
            @AuthenticationPrincipal Utente utente
    ) {
        try {
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAttivitaTuristicaService.getPrenotazioniByVisitatore(utente));
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @DeleteMapping("{id}")
    private ResponseEntity<Object> cancellaPrenotazioneAttivitaTuristica(
            @AuthenticationPrincipal Utente utente,
            @PathVariable("id") final Long id
    ) {
        try {
            PrenotazioneAttivitaTuristica prenotazioneAttivitaTuristica = prenotazioneAttivitaTuristicaService.findById(id);
            if (!prenotazioneAttivitaTuristica.getItinerario().getVisitatore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Prenotazione non trovata");
            }
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAttivitaTuristicaService.deletePrenotazioneAttivitaTuristica(prenotazioneAttivitaTuristica));
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

}
