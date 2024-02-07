package it.greentrails.backend.gestioneattivita.service;

import it.greentrails.backend.entities.Categoria;
import it.greentrails.backend.gestioneattivita.repository.CategoriaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

public class CategoriaServiceImplTest {
    @Mock
    private CategoriaRepository categoriaRepository;

    @InjectMocks
    private CategoriaServiceImpl categoriaService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveCategoria_Success() throws Exception {
        Categoria categoria = new Categoria();
        categoria.setNome("Relax e Benessere");
        categoria.setDescrizione("Attività e alloggi per il relax e il benessere. Include spa, centri benessere, o alloggi con servizi di spa e benessere.");

        when(categoriaRepository.save(any())).thenReturn(categoria);

        Categoria savedCategoria = categoriaService.saveCategoria(categoria);

        assertNotNull(savedCategoria);

    }

    @Test
    void saveCategoria_NullCategoria_ExceptionThrown() {
        Categoria nullCategoria = null;

        assertThrows(Exception.class, () -> categoriaService.saveCategoria(nullCategoria));

    }

}
