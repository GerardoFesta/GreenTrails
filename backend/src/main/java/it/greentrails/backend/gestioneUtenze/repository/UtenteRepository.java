package it.greentrails.backend.gestioneUtenze.repository;

import it.greentrails.backend.entities.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("utenteRepository")
public interface UtenteRepository extends JpaRepository<Utente, Long> {

    Utente findUtenteByEmail(String email);
    boolean existsByEmail(String email);
    @Modifying
    @Query("UPDATE Utente u SET u.nome = :nome, u.cognome = :cognome, u.email = :email, u.password = :password WHERE u.id = :userId")
    void updateUtente(@Param("userId") Long userId, @Param("nome") String nome, @Param("cognome") String cognome, @Param("email") String email, @Param("password") String password);



}