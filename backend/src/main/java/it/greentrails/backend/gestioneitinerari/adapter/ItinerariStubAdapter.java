package it.greentrails.backend.gestioneitinerari.adapter;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.Preferenze;
import it.greentrails.backend.entities.PrenotazioneAttivitaTuristica;
import it.greentrails.backend.gestioneattivita.repository.AttivitaRepository;
import it.greentrails.backend.gestioneattivita.repository.CameraRepository;
import it.greentrails.backend.gestioneitinerari.repository.ItinerariRepository;
import it.greentrails.backend.gestioneprenotazioni.repository.PrenotazioneAlloggioRepository;
import it.greentrails.backend.gestioneprenotazioni.repository.PrenotazioneAttivitaTuristicaRepository;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItinerariStubAdapter implements ItinerariAdapter {

  private final AttivitaRepository attivitaRepository;
  private final CameraRepository cameraRepository;
  private final ItinerariRepository itinerariRepository;
  private final PrenotazioneAlloggioRepository prenotazioneAlloggioRepository;
  private final PrenotazioneAttivitaTuristicaRepository prenotazioneAttivitaTuristicaRepository;


  @Override
  public Itinerario pianificazioneAutomatica(Preferenze preferenze) {
    Itinerario itinerario = new Itinerario();
    itinerario.setVisitatore(preferenze.getVisitatore());
    Itinerario itinerarioFinal = itinerariRepository.save(itinerario);
    List<Attivita> attivitaTuristiche = attivitaRepository.findAll(Pageable.unpaged()).toList();
    Collections.shuffle(attivitaTuristiche);
    attivitaTuristiche.stream().filter(a -> !a.isAlloggio()).limit(2).forEach(a -> {
      PrenotazioneAttivitaTuristica p = new PrenotazioneAttivitaTuristica();
      p.setAttivitaTuristica(a);
      p.setItinerario(itinerarioFinal);
      p.setDataInizio(new Date());
      p.setNumAdulti(1);
      p.setPrezzo(a.getPrezzo());
      prenotazioneAttivitaTuristicaRepository.save(p);
    });
    return itinerario;
  }

}
