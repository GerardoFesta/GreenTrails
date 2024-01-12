package it.greentrails.backend.gestionePrenotazioni.controller;

import it.greentrails.backend.entities.*;
import it.greentrails.backend.gestioneAttivita.service.AttivitaService;
import it.greentrails.backend.gestioneAttivita.service.CameraService;
import it.greentrails.backend.gestioneItinerari.service.GestioneItinerariService;
import it.greentrails.backend.gestionePrenotazioni.service.PrenotazioneAlloggioService;
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
public class PrenotazioneAlloggioController {

    private final GestioneItinerariService gestioneItinerariService;
    private final AttivitaService attivitaService;
    private final CameraService cameraService;
    private final PrenotazioneAlloggioService prenotazioneAlloggioService;


    @PostMapping
    private ResponseEntity<Object> creaPrenotazioneAlloggio(
            @AuthenticationPrincipal Utente utente,
            @RequestParam("idItinerario") final Long idItinerario,
            @RequestParam("idCamera") final Long idCamera,
            @RequestParam("numAdulti") final int numAdulti,
            @RequestParam(value = "numBambini", defaultValue = "0", required = false) final int numBambini,
            @RequestParam("dataInizio") final Long dataInizioTimestamp,
            @RequestParam(value = "dataFine") final Long dataFineTimestamp,
            @RequestParam("numCamere") final int numCamere
    ) {
        try {
            Itinerario itinerario = gestioneItinerariService.findById(idItinerario);
            if (!itinerario.getVisitatore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Itinerario non trovato");
            }
            Camera camera = cameraService.findById(idCamera);
            Date dataInizio = new Date(dataInizioTimestamp * 1000);
            PrenotazioneAlloggio prenotazioneAlloggio = new PrenotazioneAlloggio();
            prenotazioneAlloggio.setCamera(camera);
            prenotazioneAlloggio.setItinerario(itinerario);
            prenotazioneAlloggio.setNumAdulti(numAdulti);
            prenotazioneAlloggio.setNumBambini(numBambini);
            prenotazioneAlloggio.setNumCamere(numCamere);
            prenotazioneAlloggio.setDataInizio(dataInizio);
            double prezzo = numCamere * camera.getPrezzo();
            Date dataFine = new Date(dataFineTimestamp * 1000);
            prenotazioneAlloggio.setDataFine(dataFine);
            long durataOre = Duration.between(dataInizio.toInstant(), dataFine.toInstant()).toHours();
            if (durataOre > 24) {
                prezzo = prezzo * Math.ceil((double) durataOre / 24);
            }
            prenotazioneAlloggio.setPrezzo(prezzo);
            prenotazioneAlloggio = prenotazioneAlloggioService.savePrenotazioneAlloggio(camera, prenotazioneAlloggio);
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAlloggio);
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("{id}")
    private ResponseEntity<Object> visualizzaPrenotazioneAlloggio(
            @AuthenticationPrincipal Utente utente,
            @PathVariable("id") final Long id
    ) {
        try {
            PrenotazioneAlloggio prenotazioneAlloggio = prenotazioneAlloggioService.findById(id);
            if (!prenotazioneAlloggio.getItinerario().getVisitatore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Prenotazione non trovata");
            }
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAlloggio);
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("perAttivita/{idAttivita}")
    private ResponseEntity<Object> visualizzaPrenotazioniAlloggioPerAttivita(
            @AuthenticationPrincipal Utente utente,
            @PathVariable("idAttivita") final Long idAttivita
    ) {
        try {
            Attivita attivita = attivitaService.findById(idAttivita);
            if (!attivita.getGestore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Alloggio non trovato");
            }
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAlloggioService.getPrenotazioniByAlloggio(attivita));
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }


    @GetMapping
    private ResponseEntity<Object> visualizzaPrenotazioniAlloggioPerVisitatore(
            @AuthenticationPrincipal Utente utente
    ) {
        try {
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAlloggioService.getPrenotazioniByVisitatore(utente));
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @DeleteMapping("{id}")
    private ResponseEntity<Object> cancellaPrenotazioneAlloggio(
            @AuthenticationPrincipal Utente utente,
            @PathVariable("id") final Long id
    ) {
        try {
            PrenotazioneAlloggio prenotazioneAlloggio = prenotazioneAlloggioService.findById(id);
            if (!prenotazioneAlloggio.getItinerario().getVisitatore().getId().equals(utente.getId())) {
                return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Prenotazione non trovata");
            }
            return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazioneAlloggioService.deletePrenotazioneAlloggio(prenotazioneAlloggio));
        } catch (Exception e) {
            return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

}
