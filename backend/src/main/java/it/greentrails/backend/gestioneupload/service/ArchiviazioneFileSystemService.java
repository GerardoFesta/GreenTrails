package it.greentrails.backend.gestioneupload.service;

import it.greentrails.backend.gestioneupload.exceptions.ArchiviazioneException;
import it.greentrails.backend.gestioneupload.exceptions.FileNonTrovatoException;
import it.greentrails.backend.utils.ArchiviazioneProperties;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArchiviazioneFileSystemService implements ArchiviazioneService {

  private final Path rootLocation;

  @Autowired
  public ArchiviazioneFileSystemService(ArchiviazioneProperties properties) {

    if (properties.getLocation().trim().isEmpty()) {
      throw new ArchiviazioneException("Il percorso di upload è vuoto.");
    }

    this.rootLocation = Paths.get(properties.getLocation());
  }

  @Override
  public void store(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new ArchiviazioneException("Il file è vuoto.");
      }
      Path destinationFile = this.rootLocation.resolve(
              Paths.get(file.getOriginalFilename()))
          .normalize().toAbsolutePath();
      if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
        throw new ArchiviazioneException(
            "Impossibile salvare al di fuori della cartella di upload.");
      }
      try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, destinationFile,
            StandardCopyOption.REPLACE_EXISTING);
      }
    } catch (IOException e) {
      throw new ArchiviazioneException("Impossibile salvare il file.", e);
    }
  }

  @Override
  public Stream<Path> loadAll() {
    try {
      return Files.walk(this.rootLocation, 1)
          .filter(path -> !path.equals(this.rootLocation))
          .map(this.rootLocation::relativize);
    } catch (IOException e) {
      throw new ArchiviazioneException("Impossibile leggere i file salvati", e);
    }

  }

  @Override
  public Path load(String filename) {
    return rootLocation.resolve(filename);
  }

  @Override
  public Resource loadAsResource(String filename) {
    try {
      Path file = load(filename);
      Resource resource = new UrlResource(file.toUri());
      if (resource.exists() || resource.isReadable()) {
        return resource;
      } else {
        throw new FileNonTrovatoException(
            "Impossibile trovare il file: " + filename);

      }
    } catch (MalformedURLException e) {
      throw new FileNonTrovatoException("Impossibile trovare il file: " + filename, e);
    }
  }

  @Override
  public void deleteAll() {
    FileSystemUtils.deleteRecursively(rootLocation.toFile());
  }

  @Override
  public void init() {
    try {
      Files.createDirectories(rootLocation);
    } catch (IOException e) {
      throw new ArchiviazioneException("Impossibile inizializzare l'archiviazione", e);
    }
  }
}
