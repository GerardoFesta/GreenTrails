package it.greentrails.backend.gestioneattivita.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import it.greentrails.backend.entities.Categoria;
import it.greentrails.backend.gestioneattivita.repository.CategoriaRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class CategoriaServiceImplTest {

  @Mock
  private CategoriaRepository categoriaRepository;

  @InjectMocks
  private CategoriaServiceImpl categoriaService;

  private Validator validator;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    validator = Validation.buildDefaultValidatorFactory().getValidator();
  }

  @Test
  void saveCategoriaSuccess() throws Exception {
    Categoria categoria = new Categoria();
    categoria.setNome("Relax e Benessere");
    categoria.setDescrizione(
        "Attività e alloggi per il relax e il benessere." +
            " Include spa, centri benessere, o alloggi con servizi di spa e benessere.");

    when(categoriaRepository.save(any())).thenReturn(categoria);

    Categoria savedCategoria = categoriaService.saveCategoria(categoria);

    assertNotNull(savedCategoria);

  }

  @Test
  void saveCategoriaNullCategoriaExceptionThrown() {
    Categoria nullCategoria = null;

    assertThrows(Exception.class, () -> categoriaService.saveCategoria(nullCategoria));

  }

  @Test
  void saveCategoriaNullNameExceptionThrown() {
    Categoria categoria = new Categoria();
    categoria.setNome(null);
    categoria.setDescrizione(
        "Attività e alloggi per il relax e il benessere." +
            " Include spa, centri benessere, o alloggi con servizi di spa e benessere."
    );

    Set<ConstraintViolation<Categoria>> violations = validator.validate(categoria);
    assertFalse(violations.isEmpty());
    assertEquals("Il nome non può essere vuoto.",
        violations.iterator().next().getMessage());
  }

  @Test
  void saveCategoriaNullDescriptionExceptionThrown() {
    Categoria categoria = new Categoria();
    categoria.setNome("Relax e Benessere");
    categoria.setDescrizione(null);

    Set<ConstraintViolation<Categoria>> violations = validator.validate(categoria);
    assertFalse(violations.isEmpty());
    assertEquals("La descrizione non può essere vuota.",
        violations.iterator().next().getMessage());
  }

}
