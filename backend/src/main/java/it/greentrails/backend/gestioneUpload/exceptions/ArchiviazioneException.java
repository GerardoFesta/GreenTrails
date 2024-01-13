package it.greentrails.backend.gestioneUpload.exceptions;

public class ArchiviazioneException extends RuntimeException {

  public ArchiviazioneException(String message) {
    super(message);
  }

  public ArchiviazioneException(String message, Throwable cause) {
    super(message, cause);
  }
}
