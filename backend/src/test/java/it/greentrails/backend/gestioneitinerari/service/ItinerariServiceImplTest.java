package it.greentrails.backend.gestioneitinerari.service;

import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.Utente;
import it.greentrails.backend.enums.RuoloUtente;
import it.greentrails.backend.gestioneitinerari.repository.ItinerariRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;

public class ItinerariServiceImplTest {

  @Mock
  private ItinerariRepository repository;

  @InjectMocks
  private ItinerariServiceImpl itinerariService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void testFindItinerariByUtente() throws Exception {
    // Mocking utente
    Utente utente = new Utente();
    utente.setId(1L);
    utente.setRuolo(RuoloUtente.VISITATORE);

    // Mocking repository
    when(repository.findByVisitatore(utente.getId(), Pageable.unpaged()))
        .thenReturn(new PageImpl<>(Collections.emptyList()));

    // Call service method
    List<Itinerario> result = itinerariService.findItinerariByUtente(utente);

    // Assertions
    Assertions.assertNotNull(result);
    Assertions.assertTrue(result.isEmpty());
  }

  @Test
  void testFindItinerariByNullUtente() {

    // Test per verificare se viene lanciata un'eccezione quando l'utente è null
    Assertions.assertThrows(Exception.class, () -> {
      itinerariService.findItinerariByUtente(null);
    });


  }

  @Test
  void testFindItinerariByNonVisitorUtente() {
    // Test per verificare se viene lanciata un'eccezione quando l'utente ha un ruolo diverso da VISITATORE
    Utente utenteNonVisitatore = new Utente();
    utenteNonVisitatore.setId(1L);
    utenteNonVisitatore.setRuolo(RuoloUtente.AMMINISTRATORE);

    /*    when(repository.findByVisitatore(utenteNonVisitatore.getId(), Pageable.unpaged()))
                .thenReturn(new PageImpl<>(Collections.emptyList()));
*/

    Assertions.assertThrows(Exception.class, () -> {
      itinerariService.findItinerariByUtente(utenteNonVisitatore);
    });
  }
}

