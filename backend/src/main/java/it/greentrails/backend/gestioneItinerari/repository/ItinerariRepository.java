package it.greentrails.backend.gestioneItinerari.repository;

import it.greentrails.backend.entities.Itinerario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItinerariRepository extends JpaRepository<Itinerario, Long> {
}