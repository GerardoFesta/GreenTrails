package it.greentrails.backend.gestioneItinerari.controller;

import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.Preferenze;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneItinerari.service.GestioneItinerariService;
import it.greentrails.backend.gestionePrenotazioni.service.PrenotazioneAlloggioService;
import it.greentrails.backend.gestionePrenotazioni.service.PrenotazioneAttivitaTuristicaService;
import it.greentrails.backend.gestioneUtenze.service.GestioneUtenzeService;
import it.greentrails.backend.utils.service.ResponseGenerator;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/itinerari")
@RequiredArgsConstructor
public class GestioneItinerariController {

  private final GestioneItinerariService gestioneItinerariService;
  private final PrenotazioneAttivitaTuristicaService prenotazioneAttivitaTuristicaService;
  private final PrenotazioneAlloggioService prenotazioneAlloggioService;
  private final GestioneUtenzeService gestioneUtenzeService;

  @PostMapping
  private ResponseEntity<Object> creaItinerario(
      @AuthenticationPrincipal Utente utente
  ) {
    try {
      Itinerario itinerario = new Itinerario();
      itinerario.setVisitatore(utente);
      itinerario = gestioneItinerariService.saveItinerario(itinerario);
      return ResponseGenerator.generateResponse(HttpStatus.OK, itinerario);
    } catch (Exception e) {
      return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @PostMapping("genera")
  private ResponseEntity<Object> generaItinerario(
      @AuthenticationPrincipal Utente utente
  ) {
    try {
      Preferenze preferenze = gestioneUtenzeService.getPreferenzeById(utente.getId());
      // TODO: integrare modulo AI
      Itinerario itinerario = gestioneItinerariService.createByPreferenze(preferenze);
      return ResponseGenerator.generateResponse(HttpStatus.NOT_IMPLEMENTED,
          "Funzione non implementata.");
    } catch (Exception e) {
      return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @GetMapping("{id}")
  private ResponseEntity<Object> visualizzaItinerario(
      @AuthenticationPrincipal Utente utente,
      @PathVariable("id") final Long id
  ) {
    try {
      Itinerario itinerario = gestioneItinerariService.findById(id);
      if (!itinerario.getVisitatore().getId().equals(utente.getId())) {
        return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Itinerario non trovato");
      }
      HashMap<String, Object> risultato = new HashMap<>();
      risultato.put("itinerario", itinerario);
      risultato.put("prenotazioniAlloggio",
          prenotazioneAlloggioService.getPrenotazioniByItinerario(itinerario));
      risultato.put("prenotazioniAttivitaTuristica",
          prenotazioneAttivitaTuristicaService.getPrenotazioniByItinerario(itinerario));
      return ResponseGenerator.generateResponse(HttpStatus.OK, risultato);
    } catch (Exception e) {
      return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @DeleteMapping("{id}")
  private ResponseEntity<Object> cancellaItinerario(
      @AuthenticationPrincipal Utente utente,
      @PathVariable("id") final Long id
  ) {
    try {
      Itinerario itinerario = gestioneItinerariService.findById(id);
      if (!itinerario.getVisitatore().getId().equals(utente.getId())) {
        return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Itinerario non trovato");
      }
      return ResponseGenerator.generateResponse(HttpStatus.OK,
          gestioneItinerariService.deleteItinerario(itinerario));
    } catch (Exception e) {
      return ResponseGenerator.generateResponse(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

}
