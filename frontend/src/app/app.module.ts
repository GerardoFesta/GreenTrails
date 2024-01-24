import { RecensioneFormComponent } from './componenti/pagina-attivita/recensioni/recensione-form/recensione-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { InfoAttivitaComponent } from './componenti/pagina-attivita/info-attivita/info-attivita.component';
import { CardAttivitaComponent } from './componenti/pagina-attivita/info-attivita/card-attivita/card-attivita.component';
import { RecensioniComponent } from './componenti/pagina-attivita/recensioni/recensioni.component';
import { DescrizioneAttivitaComponent } from './componenti/pagina-attivita/descrizione-attivita/descrizione-attivita.component';
import { ValutazioneAttivitaComponent } from './componenti/pagina-attivita/info-attivita/valutazione-attivita/valutazione-attivita.component';
import { PoliticheEcosostenibiliAttivitaComponent } from './componenti/pagina-attivita/info-attivita/politiche-ecosostenibili-attivita/politiche-ecosostenibili-attivita.component';
import { SlideshowComponent } from './componenti/pagina-attivita/descrizione-attivita/slideshow/slideshow.component';
import { MapComponent } from './componenti/pagina-attivita/info-attivita/map/map.component';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componenti/login/login.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { PopupRecensioneComponent } from './componenti/pagina-attivita/recensioni/popup-recensione/popup-recensione.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieService } from 'ngx-cookie-service';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { GalleryDialogComponent } from './componenti/pagina-attivita/recensioni/gallery-dialog/gallery-dialog.component';
import { VideoDialogComponent } from './componenti/pagina-attivita/recensioni/video-dialog/video-dialog.component';
import { ToolbarComponent } from './componenti/toolbar/toolbar.component';
import { ToolbarHomepageComponent } from './componenti/toolbar-homepage/toolbar-homepage.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { IconToolbarComponent } from './componenti/icon-toolbar/icon-toolbar.component';
import { RicercaComponent } from './componenti/ricerca/ricerca.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaAttivitaComponent,
    InfoAttivitaComponent,
    CardAttivitaComponent,
    RecensioniComponent,
    DescrizioneAttivitaComponent,
    ValutazioneAttivitaComponent,
    PoliticheEcosostenibiliAttivitaComponent,
    SlideshowComponent,
    MapComponent,
    RegistrazioneComponent,
    RecensioneFormComponent,
    PopupRecensioneComponent,
    GalleryDialogComponent,
    VideoDialogComponent,
    HomePageComponent,
    ToolbarComponent,
    ToolbarHomepageComponent,
    GestionePrenotazioniAttiveComponent,
    IconToolbarComponent,
    RicercaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCarouselModule,
    MatTooltipModule,
    HttpClientModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCarouselModule,
    MatTooltipModule,
    HttpClientModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
