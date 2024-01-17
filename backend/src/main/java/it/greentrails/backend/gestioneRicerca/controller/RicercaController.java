package it.greentrails.backend.gestioneRicerca.controller;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.gestioneAttivita.service.CategoriaService;
import it.greentrails.backend.gestioneRicerca.service.RicercaService;
import it.greentrails.backend.utils.service.ResponseGenerator;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("api/ricerca")
@RequiredArgsConstructor
public class RicercaController {

  private final RicercaService ricercaService;
  private final CategoriaService categoriaService;

  @PostMapping
  private ResponseEntity<Object> cerca(
      @RequestParam(value = "query") final String query,
      @RequestParam(value = "idCategorie", required = false) final Long[] idCategorie,
      @RequestParam(value = "coordinate", required = false) final Point coordinate,
      @RequestParam(value = "raggio", required = false) final Double raggio
      ) {
    List<Attivita> risultati = ricercaService.findAttivita(query);
    if (idCategorie != null && idCategorie.length > 0) {
      risultati = ricercaService.findAttivitaByCategorie(Arrays.stream(idCategorie).map(idCategoria -> {
        try {
          return categoriaService.findById(idCategoria);
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
      }).collect(Collectors.toList()))
          .stream()
          .filter(risultati::contains)
          .collect(Collectors.toList());
    }
    if (coordinate != null && raggio != null) {
      risultati = ricercaService.findAttivitaByPosizione(coordinate, raggio)
          .stream()
          .filter(risultati::contains)
          .collect(Collectors.toList());
    }
    return ResponseGenerator.generateResponse(HttpStatus.OK, risultati);
  }

}
