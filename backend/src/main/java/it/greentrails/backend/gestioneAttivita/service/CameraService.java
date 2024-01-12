package it.greentrails.backend.gestioneAttivita.service;

import it.greentrails.backend.entities.Camera;
import it.greentrails.backend.gestioneAttivita.repository.CameraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CameraService {

    private final CameraRepository repository;

    public Camera saveCamera(Camera camera) throws Exception{
        if(camera == null){
            throw new Exception("La camera è vuota.");
        }
        return repository.save(camera);
    }

    public Camera findById(Long id) throws Exception{
        if(id == null || id < 0){
            throw new Exception("L'id non è valido.");
        }
        Optional<Camera> camera = repository.findById(id);
        if (camera.isEmpty()) {
            throw new Exception("La recensione non è stata trovata.");
        }
        return camera.get();
    }

    public boolean deleteCamera(Camera camera) throws Exception{
        if(camera == null){
            throw new Exception("La camera è vuota.");
        }
        repository.delete(camera);
        repository.flush();
        return repository.findById(camera.getId()).isEmpty();
    }
}
