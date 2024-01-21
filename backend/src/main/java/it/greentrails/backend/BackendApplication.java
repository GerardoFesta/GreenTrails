package it.greentrails.backend;

import it.greentrails.backend.gestioneUtenze.register.EmailValidator;
import it.greentrails.backend.gestioneUtenze.controller.RegistrazioneService;
import it.greentrails.backend.gestioneUtenze.register.ValidationTokenService;
import it.greentrails.backend.gestioneUtenze.service.UtenteService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	private UtenteService utenteService;
	private EmailValidator emailValidator;
	private ValidationTokenService validationTokenService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	public RegistrazioneService registrazioneService() {
		return new RegistrazioneService(utenteService, emailValidator, validationTokenService);
	}

}
