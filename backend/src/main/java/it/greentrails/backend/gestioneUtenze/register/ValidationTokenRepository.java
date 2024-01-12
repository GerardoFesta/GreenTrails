package it.greentrails.backend.gestioneUtenze.register;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
public interface ValidationTokenRepository extends JpaRepository<ValidationToken, Long> {

    Optional<ValidationToken> findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE ValidationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);
}