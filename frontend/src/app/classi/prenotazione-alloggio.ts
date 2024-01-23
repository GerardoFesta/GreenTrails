import { StatoPagamento } from "../enums/stato-pagamento";
import { StatoPrenotazione } from "../enums/stato-prenotazione";
import { Camera } from "./camera";
import { Itinerario } from "./itinerario";

export class PrenotazioneAlloggio {
    id?: number;
    itinerario?: Itinerario;
    camera?: Camera;
    numAdulti?: number;
    numBambini?: number;
    dataInizio?: Date;
    dataFine?: Date;
    numCamere?: number;
    stato?: StatoPrenotazione;
    statoPagamento?: StatoPagamento;
    prezzo?: number;
}
