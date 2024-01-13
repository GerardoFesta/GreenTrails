package it.greentrails.backend.gestioneUtenze.service;

import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneUtenze.register.EmailValidator;
import it.greentrails.backend.gestioneUtenze.register.RichiestaRegistrazione;
import it.greentrails.backend.gestioneUtenze.register.ValidationToken;
import it.greentrails.backend.gestioneUtenze.register.ValidationTokenService;
import it.greentrails.backend.gestioneUtenze.repository.UtenteRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@AllArgsConstructor
public class UtenteService    {
    private UtenteRepository utenteRepository;
    private ValidationTokenService validationTokenService;
    private RichiestaRegistrazione richiestaRegistrazione;
    private EmailValidator emailValidator;


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
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("Email not valid");
        }

        // Encrypt the password using AES
        String encryptedPassword = encryptPassword(request.getPassword());
        Utente utente = new Utente();
        utente.setEmail(request.getEmail());
        utente.setPassword(encryptedPassword);
        utente.setNome(request.getNome());
        utente.setCognome(request.getCognome());
        utente.setDataNascita(request.getDataNascita());
        utente.setRuolo(request.getRuoloUtente());

        utenteRepository.save(utente);
        return "generated token";

    }

    private String encryptPassword(String password) {
        try {
            // In a real-world scenario, you should use a secure way to store and manage your secret key
            String secretKey = "yourSecretKey"; // Replace with a secure method to generate and store the key

            // Create the cipher
            Cipher cipher = Cipher.getInstance("AES");
            SecretKey secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);

            // Encrypt the password
            byte[] encryptedPasswordBytes = cipher.doFinal(password.getBytes());

            // Encode the encrypted password using Base64
            return Base64.getEncoder().encodeToString(encryptedPasswordBytes);
        } catch (Exception e) {
            // Handle encryption exceptions
            throw new RuntimeException("Error encrypting password", e);
        }
    }

}
