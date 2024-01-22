import { StatoSegnalazione } from "../enums/stato-segnalazione";
import { Attivita } from "./attivita";
import { Recensione } from "./recensione";
import { Utente } from "./utente";

export class Segnalazione {
    id?: number;
    dataSegnalazione?: Date;
    descrizione?: string;
    stato?: StatoSegnalazione;
    isForRecensione?: boolean;
    utente?: Utente;
    media?: string;
    recensione?: Recensione;
    attivita?: Attivita;
}
