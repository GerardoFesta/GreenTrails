package it.greentrails.backend.gestioneUtenze.controller;

import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneUtenze.service.UtenteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "api/v1/greentrails")
public class UtenteController {

    private final UtenteService utenteService;

    @Autowired
    public UtenteController(UtenteService utenteService) {
        this.utenteService = utenteService;
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestBody Utente utente) {
        HttpHeaders responseHeaders = new HttpHeaders();
        try {
            String token = utenteService.register(utente);
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(token);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .headers(responseHeaders)
                    .body("Registration failed. Please check the input data.");
        }
    }


}
