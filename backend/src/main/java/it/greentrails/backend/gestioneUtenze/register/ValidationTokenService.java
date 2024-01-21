package it.greentrails.backend.gestioneUtenze.register;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@AllArgsConstructor
@Service
public class ValidationTokenService {
    private final ValidationTokenRepository validationTokenRepository;

    public void saveConfirmationToken(ValidationToken token) {
        validationTokenRepository.save(token);
    }

    public Optional<ValidationToken> getToken(String token) {
        return validationTokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return validationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
