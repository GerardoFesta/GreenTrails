package it.greentrails.backend.gestioneUtenze.controller;

import it.greentrails.backend.gestioneUtenze.register.RichiestaRegistrazione;
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

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RichiestaRegistrazione request) {
        HttpHeaders responseHeaders = new HttpHeaders();

        try {
            String token = utenteService.register(request);
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .headers(responseHeaders)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/confirm-sign-up")
    public ResponseEntity<String> confirmSignUp(@RequestParam("token") String token) {
        HttpHeaders responseHeaders = new HttpHeaders();

        try {
            String confirmationMessage = utenteService.confirmToken(token);
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(confirmationMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .headers(responseHeaders)
                    .body("Confirmation failed: " + e.getMessage());
        }
    }



}
