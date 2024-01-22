import { Attivita } from "./attivita";
import { Utente } from "./utente";
import { ValoriEcosostenibilita } from "./valori-ecosostenibilita";

export class Recensione {
    id?: number;
    visitatore?: Utente;
    attivita?: Attivita;
    valutazioneStelleEsperienza?: number;
    descrizione?: string;
    media?: string;
    valoriEcosostenibilita?: ValoriEcosostenibilita;
}
