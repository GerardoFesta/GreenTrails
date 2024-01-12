package it.greentrails.backend.gestioneUtenze.service;

import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneUtenze.register.ValidationTokenService;
import it.greentrails.backend.gestioneUtenze.repository.UtenteRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication
@AllArgsConstructor
public class UtenteService    {
    private UtenteRepository utenteRepository;
    ValidationTokenService validationTokenService;


    public static void main(String[] args) {
        SpringApplication.run(UtenteService.class, args);
    }

    public Utente findUtenteByEmail(String email) {
        return utenteRepository.findUtenteByEmail(email);
    }

    public boolean existsByEmail(String email) {
       return utenteRepository.existsByEmail(email);
    }


     public Utente saveUtente(Utente utente) {
        return utenteRepository.save(utente);

    }
    public boolean emailInUso(String email){
        return utenteRepository.existsByEmail(email);
    }

    public String signUpUser(Utente utente) {
        // Verifica se l'email è già presente nel database
        if (utenteRepository.existsByEmail(utente.getEmail())) {
            return "L'email è già in uso.";
        }
        utenteRepository.save(utente);

        return "Registrazione completata con successo!";
    }


}
