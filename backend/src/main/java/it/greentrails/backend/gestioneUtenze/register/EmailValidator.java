package it.greentrails.backend.gestioneUtenze.register;

import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.gestioneUtenze.service.UtenteService;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.User;

import java.util.function.Predicate;

public class EmailValidator implements Predicate<String> {
    private UtenteService utenteService;


    @Override
    public boolean test(String s) {

        return utenteService.existsByEmail(s) && !utenteService.emailInUso(s);

    }

}
