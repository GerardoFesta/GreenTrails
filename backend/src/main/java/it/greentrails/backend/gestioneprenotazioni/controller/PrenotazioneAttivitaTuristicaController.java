package it.greentrails.backend.gestioneprenotazioni.controller;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.PrenotazioneAttivitaTuristica;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneattivita.service.AttivitaService;
import it.greentrails.backend.gestioneitinerari.service.GestioneItinerariService;
import it.greentrails.backend.gestioneprenotazioni.service.PrenotazioneAttivitaTuristicaService;
import it.greentrails.backend.utils.service.ResponseGenerator;
import java.time.Duration;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/prenotazioni-attivita-turistica")
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
      @RequestParam("numAdulti") final int adulti,
      @RequestParam(value = "numBambini", defaultValue = "0", required = false) final int bambini,
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
      PrenotazioneAttivitaTuristica prenotazione = new PrenotazioneAttivitaTuristica();
      prenotazione.setAttivitaTuristica(attivita);
      prenotazione.setItinerario(itinerario);
      prenotazione.setNumAdulti(adulti);
      prenotazione.setNumBambini(bambini);
      prenotazione.setDataInizio(dataInizio);
      double prezzo = (adulti + bambini) * attivita.getPrezzo();
      if (dataFineTimestamp != null) {
        Date dataFine = new Date(dataFineTimestamp * 1000);
        prenotazione.setDataFine(dataFine);
        long durataOre = Duration.between(dataInizio.toInstant(), dataFine.toInstant()).toHours();
        if (durataOre > 24) {
          prezzo = prezzo * Math.ceil((double) durataOre / 24);
        }
      }
      prenotazione.setPrezzo(prezzo);
      prenotazione = prenotazioneAttivitaTuristicaService.savePrenotazioneAttivitaTuristica(
          attivita, prenotazione);
      itinerario.setTotale(prezzo + itinerario.getTotale());
      gestioneItinerariService.saveItinerario(itinerario);
      return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazione);
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
      PrenotazioneAttivitaTuristica prenotazione = prenotazioneAttivitaTuristicaService.findById(
          id);
      if (!prenotazione.getItinerario().getVisitatore().getId()
          .equals(utente.getId())) {
        return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Prenotazione non trovata");
      }
      return ResponseGenerator.generateResponse(HttpStatus.OK, prenotazione);
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
        return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND,
            "Attività turistica non trovata");
      }
      return ResponseGenerator.generateResponse(HttpStatus.OK,
          prenotazioneAttivitaTuristicaService.getPrenotazioniByAttivitaTuristica(attivita));
    } catch (Exception e) {
      return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @GetMapping
  private ResponseEntity<Object> visualizzaPrenotazioniAttivitaTuristicaPerVisitatore(
      @AuthenticationPrincipal Utente utente
  ) {
    try {
      return ResponseGenerator.generateResponse(HttpStatus.OK,
          prenotazioneAttivitaTuristicaService.getPrenotazioniByVisitatore(utente));
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
      PrenotazioneAttivitaTuristica prenotazione = prenotazioneAttivitaTuristicaService.findById(
          id);
      if (!prenotazione.getItinerario().getVisitatore().getId()
          .equals(utente.getId())) {
        return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Prenotazione non trovata");
      }
      Itinerario itinerario = prenotazione.getItinerario();
      itinerario.setTotale(itinerario.getTotale() - prenotazione.getPrezzo());
      gestioneItinerariService.saveItinerario(itinerario);
      return ResponseGenerator.generateResponse(HttpStatus.OK,
          prenotazioneAttivitaTuristicaService.deletePrenotazioneAttivitaTuristica(
              prenotazione));
    } catch (Exception e) {
      return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

}
