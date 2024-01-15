import { StatoPagamento } from "../enums/stato-pagamento";
import { StatoPrenotazione } from "../enums/stato-prenotazione";
import { Attivita } from "./attivita";
import { Itinerario } from "./itinerario";

export class PrenotazioneAttivitaTuristica {
    id?: number;
    itinerario?: Itinerario;
    attivitaTuristica?: Attivita;
    numAdulti?: number;
    numBambini?: number;
    dataInizio?: Date;
    dataFine?: Date;
    stato?: StatoPrenotazione;
    statoPagamento?: StatoPagamento;
    prezzo?: number;
}
