package it.greentrails.backend.gestioneitinerari.adapter;

import it.greentrails.backend.entities.Itinerario;
import it.greentrails.backend.entities.Preferenze;

public interface GestioneItinerariAdapter {

  Itinerario pianificazioneAutomatica(Preferenze preferenze);
}
