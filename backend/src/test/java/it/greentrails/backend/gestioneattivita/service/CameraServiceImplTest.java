package it.greentrails.backend.gestioneattivita.service;

import it.greentrails.backend.entities.Attivita;
import it.greentrails.backend.entities.Camera;
import it.greentrails.backend.gestioneattivita.repository.CameraRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CameraServiceImplTest {

  private Validator validator;

  @Mock
  private CameraRepository cameraRepository;

  @InjectMocks
  private CameraServiceImpl cameraService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.initMocks(this);
    validator = Validation.buildDefaultValidatorFactory().getValidator();
  }

  @Test
  public void testSaveCamera_ValidCamera_Success() throws Exception {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);

    when(cameraRepository.save(camera)).thenReturn(camera);
    Camera savedCamera = cameraService.saveCamera(camera);

    assertNotNull(savedCamera);
  }

  @Test
  public void testSaveCamera_NullCamera_ExceptionThrown() {
    assertThrows(Exception.class, () -> {
      cameraService.saveCamera(null);
    });
  }

  @Test
  public void testSaveCamera_NullAlloggio() {
    Camera camera = new Camera();
    camera.setAlloggio(null);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("L'alloggio non può essere vuoto.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_NullTipoCamera() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera(null);
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La tipologia della camera non può essere vuota.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_NullPrice() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(null);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("Il prezzo non può essere vuoto.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_NegativePrice() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(-1.1);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("Il prezzo non può essere negativo.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_NullDisponibilita() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(null);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La disponibilità non può essere vuota.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_DisponibilitaLessThanOne() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(-1);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La disponibilità non può essere inferiore a 1.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_NullDescription() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione(null);
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La descrizione non può essere vuota.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_LongDescription() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione("Questa camera, arredata con gusto, offre un’atmosfera accogliente e rilassante. "
        + "Dotata di un letto matrimoniale comodo, un bagno moderno, una scrivania funzionale e una vista mozzafiato sulla città. "
        + "Perfetta per viaggiatori che cercano comfort e tranquillità.");
    camera.setCapienza(1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La descrizione è troppo lunga.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_NullCapacity() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(null);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La capienza non può essere vuota.", violations.iterator().next().getMessage());
  }

  @Test
  public void testSaveCamera_CapacityLessThanOne() {
    Camera camera = new Camera();
    Attivita attivita = new Attivita();
    attivita.setAlloggio(true);
    camera.setAlloggio(attivita);
    camera.setTipoCamera("singola");
    camera.setPrezzo(50.5);
    camera.setDisponibilita(15);
    camera.setDescrizione("un letto singolo");
    camera.setCapienza(-1);


    Set<ConstraintViolation<Camera>> violations = validator.validate(camera);
    assertFalse(violations.isEmpty());
    assertEquals("La capienza non può essere inferiore a 1.", violations.iterator().next().getMessage());
  }
}
