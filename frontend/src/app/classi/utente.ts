import { RuoloUtente } from "../enums/ruolo-utente";

export class Utente {
    id?: number;
    nome?: string;
    cognome?: string;
    dataNascita?: Date;
    email?: string;
    password?: string;
    ruolo?: RuoloUtente;
}
