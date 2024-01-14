package it.greentrails.backend.gestioneUtenze.service;

import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneUtenze.repository.UtenteRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AllArgsConstructor
public class UtenteService    {
    private UtenteRepository utenteRepository;


    public static void main(String[] args) {
        SpringApplication.run(UtenteService.class, args);
    }


    public String register(Utente request) {
        Optional<Utente> existingUser = utenteRepository.findOneByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email già esistente");
        }
        String encryptedPassword = encryptPassword(request.getPassword());
        Utente utente = new Utente();
        utente.setNome(request.getNome());
        utente.setCognome(request.getCognome());
        utente.setEmail(request.getEmail());
        utente.setPassword(encryptedPassword);
        utente.setDataNascita(request.getDataNascita());
        utente.setRuolo(request.getRuolo());

       return String.valueOf(utenteRepository.save(utente));

    }

    private String encryptPassword(String password) {
        try {
            String secretKey = "yourSecretKey"; 
            Cipher cipher = Cipher.getInstance("AES");
            SecretKey secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);

            byte[] encryptedPasswordBytes = cipher.doFinal(password.getBytes());

            return Base64.getEncoder().encodeToString(encryptedPasswordBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting password", e);
        }
    }

}
