package it.greentrails.backend.gestioneutenze.controller;


import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.enums.RuoloUtente;
import it.greentrails.backend.gestioneutenze.service.GestioneUtenzeService;
import it.greentrails.backend.utils.service.ResponseGenerator;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/utenti")
@RequiredArgsConstructor
public class GestioneUtenzeController {

  private final GestioneUtenzeService service;
  private final PasswordEncoder passwordEncoder;

  @PutMapping
  private ResponseEntity<Object> registrazione(
      @RequestParam final boolean isGestore,
      @RequestBody final Utente utente
  ) {
    Utente u;
    if (service.findByEmail(utente.getEmail()).isPresent()) {
      return ResponseGenerator.generateResponse(HttpStatus.BAD_REQUEST, "L'utente esiste già.");
    }
    RuoloUtente ruoloUtente = isGestore ? RuoloUtente.GESTORE_ATTIVITA : RuoloUtente.VISITATORE;
    utente.setPassword(passwordEncoder.encode(utente.getPassword()));
    utente.setRuolo(ruoloUtente);
    try {
      u = service.saveUtente(utente);
      return ResponseGenerator.generateResponse(HttpStatus.OK, u);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping
  private ResponseEntity<Object> visualizzaInfo(
      @AuthenticationPrincipal final Utente utente
  ) {
    Optional<Utente> u = service.findByEmail(utente.getEmail());
    if (u.isEmpty()) {
      return ResponseGenerator.generateResponse(HttpStatus.BAD_REQUEST,
          "L'utente non esiste.");
    }
    return ResponseGenerator.generateResponse(HttpStatus.OK, u);
  }

}
