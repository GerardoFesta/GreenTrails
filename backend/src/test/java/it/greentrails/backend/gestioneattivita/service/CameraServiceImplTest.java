package it.greentrails.backend.gestioneattivita.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Camera;
import it.greentrails.backend.gestioneattivita.repository.CameraRepository;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class CameraServiceImplTest {

  @Mock
  private CameraRepository cameraRepository;

  @InjectMocks
  private CameraServiceImpl cameraService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testGetCamereByAlloggio_NullAlloggio() {
    assertThrows(Exception.class, () -> {
      cameraService.getCamereByAlloggio(null);
    });
  }

  @Test
  public void testGetCamereByAlloggio_NotAlloggio() {
    Attivita alloggio = new Attivita();
    alloggio.setAlloggio(false);

    assertThrows(Exception.class, () -> {
      cameraService.getCamereByAlloggio(alloggio);
    });
  }

  @Test
  public void testGetCamereByAlloggio_ValidAlloggio() throws Exception {
    Attivita alloggio = new Attivita();
    alloggio.setAlloggio(true);
    List<Camera> camere = new ArrayList<>();
    when(cameraRepository.findAll()).thenReturn(camere);
    List<Camera> foundCamere = cameraService.getCamereByAlloggio(alloggio);
    assertNotNull(foundCamere);
  }

}
