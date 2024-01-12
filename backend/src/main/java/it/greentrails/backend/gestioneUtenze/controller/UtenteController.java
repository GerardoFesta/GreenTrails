package it.greentrails.backend.gestioneUtenze.controller;

import it.greentrails.backend.entities.Utente;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3306")
@RestController
@RequestMapping(path = "api/v1/greentrails")
public class UtenteController {

    private final RegistrazioneService registrazioneService;
    @Autowired
    public UtenteController(RegistrazioneService registrazioneService) {
        this.registrazioneService = registrazioneService;
    }

    @PostMapping
    public Utente signUpString(@RequestBody Utente utente) {
        return registrazioneService.register(utente);
    }

    @GetMapping(path = "/")
    public String confirmSignUp(@RequestParam("token") String token) {
        return registrazioneService.confirmToken(token);
    }



}
