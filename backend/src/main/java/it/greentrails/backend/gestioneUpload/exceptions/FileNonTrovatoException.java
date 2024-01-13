package it.greentrails.backend.gestioneUpload.exceptions;

public class FileNonTrovatoException extends ArchiviazioneException {

  public FileNonTrovatoException(String message) {
    super(message);
  }

  public FileNonTrovatoException(String message, Throwable cause) {
    super(message, cause);
  }
}
