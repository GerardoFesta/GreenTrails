package it.greentrails.backend.gestioneAttivita.repository;

import it.greentrails.backend.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}