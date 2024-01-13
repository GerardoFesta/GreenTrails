package it.greentrails.backend.gestioneUtenze.register;

import java.util.Date;

import it.greentrails.backend.enums.RuoloUtente;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString

public class RichiestaRegistrazione {
    private final String nome;
    private final String cognome;
    private final String email;
    private final String password;
    private final Date dataNascita;
    private final  RuoloUtente ruoloUtente;
}

