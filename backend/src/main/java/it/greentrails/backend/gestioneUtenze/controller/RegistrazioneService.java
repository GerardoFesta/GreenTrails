package it.greentrails.backend.gestioneUtenze.controller;

import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.enums.RuoloUtente;
import it.greentrails.backend.gestioneUtenze.register.EmailValidator;
import it.greentrails.backend.gestioneUtenze.register.RichiestaRegistrazione;
import it.greentrails.backend.gestioneUtenze.register.ValidationToken;
import it.greentrails.backend.gestioneUtenze.register.ValidationTokenService;
import it.greentrails.backend.gestioneUtenze.service.UtenteService;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
public class RegistrazioneService {
    private final UtenteService utenteService;
    private final EmailValidator emailValidator;
    private final ValidationTokenService validationTokenService;

    public RegistrazioneService(UtenteService utenteService, EmailValidator emailValidator, ValidationTokenService validationTokenService) {
        this.utenteService = utenteService;
        this.emailValidator = emailValidator;

        this.validationTokenService = validationTokenService;

    }

//controllo se la mail è valida


    @Transactional
    public String confirmToken(String token) {
        ValidationToken validationtoken = validationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (validationtoken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = validationtoken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        validationTokenService.setConfirmedAt(token);
//serve la query della repository
        return "confirmed";
    }

    public String register(RichiestaRegistrazione request) {
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        String token = utenteService.signUpUser(
                new Utente()
        );
        return token;
    }
}