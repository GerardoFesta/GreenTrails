import { StatoItinerario } from "../enums/stato-itinerario";
import { Utente } from "./utente";

export class Itinerario {
    id?: number;
    stato: StatoItinerario = StatoItinerario.PIANIFICATO;
    totale?: number;
    visitatore?: Utente;
}
