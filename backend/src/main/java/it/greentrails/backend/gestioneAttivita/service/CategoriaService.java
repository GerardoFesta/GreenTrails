package it.greentrails.backend.gestioneAttivita.service;

import it.greentrails.backend.entities.Categoria;
import it.greentrails.backend.gestioneAttivita.repository.CategoriaRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoriaService {

  private final CategoriaRepository repository;

  public Categoria saveCategoria(Categoria categoria) throws Exception {
    if (categoria == null) {
      throw new Exception("Non è possibile salvare questa categoria.");
    }
    return repository.save(categoria);
  }

  public boolean deleteCategoria(Categoria categoria) throws Exception {
    if (categoria == null) {
      throw new Exception("Non è possibile cancellare questa categoria.");
    }
    repository.delete(categoria);
    repository.flush();
    return repository.findById(categoria.getId()).isEmpty();

  }

  public Categoria findById(Long id) throws Exception {
    if (id == null || id < 0) {
      throw new Exception("L'id non è valido.");
    }
    Optional<Categoria> categoria = repository.findById(id);
    if (categoria.isEmpty()) {
      throw new Exception("La categoria non è stata trovata.");
    }
    return categoria.get();
  }

}
