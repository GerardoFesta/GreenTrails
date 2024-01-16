package it.greentrails.backend.gestioneUtenze.controller;


import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.enums.RuoloUtente;
import it.greentrails.backend.gestioneUtenze.service.GestioneUtenzeService;
import it.greentrails.backend.utils.service.ResponseGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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


}
