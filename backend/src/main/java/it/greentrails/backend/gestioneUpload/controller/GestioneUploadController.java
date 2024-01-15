package it.greentrails.backend.gestioneUpload.controller;

import it.greentrails.backend.gestioneUpload.exceptions.FileNonTrovatoException;
import it.greentrails.backend.gestioneUpload.service.ArchiviazioneService;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@RequestMapping("api/file")
@RequiredArgsConstructor
public class GestioneUploadController {

  private final ArchiviazioneService archiviazioneService;

  @GetMapping
  public String elencaFileCaricati(Model model) {

    model.addAttribute("file", archiviazioneService.loadAll().map(
            path -> MvcUriComponentsBuilder.fromMethodName(GestioneUploadController.class,
                "serviFile", path.getFileName().toString()).build().toUri().toString())
        .collect(Collectors.toList()));

    return "uploadForm";
  }

  @GetMapping("{filename:.+}")
  @ResponseBody
  public ResponseEntity<Resource> serviFile(@PathVariable String filename) {

    Resource file = archiviazioneService.loadAsResource(filename);

    if (file == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + file.getFilename() + "\"").body(file);
  }

  @PostMapping
  public String gestisciUploadFile(@RequestParam("file") MultipartFile file,
      RedirectAttributes redirectAttributes) {

    archiviazioneService.store(file);
    redirectAttributes.addFlashAttribute("message",
        "Hai caricato " + file.getOriginalFilename() + "!");

    return "redirect:/";
  }

  @ExceptionHandler(FileNonTrovatoException.class)
  public ResponseEntity<?> handleStorageFileNotFound(FileNonTrovatoException exc) {
    return ResponseEntity.notFound().build();
  }

}