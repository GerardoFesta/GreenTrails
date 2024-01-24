import { CategorieAlloggio } from "../enums/categorie-alloggio";
import { CategorieAttivitaTuristica } from "../enums/categorie-attivita-turistica";
import { Point } from "../interfacce/point";
import { Categoria } from "./categoria";
import { Utente } from "./utente";
import { ValoriEcosostenibilita } from "./valori-ecosostenibilita";

export class Attivita {
    id?: number;
    gestore?: Utente;
    nome?: string;
    indirizzo?: string;
    cap?: string;
    citta?: string;
    provincia?: string;
    coordinate?: Point;
    prezzo?: number;
    descrizioneBreve?: string;
    descrizioneLunga?: string;
    media?: string;
    disponibilita?: number;
    valoriEcosostenibilita?: ValoriEcosostenibilita;
    categoriaAlloggio?: CategorieAlloggio;
    categoriaAttivitaTuristica?: CategorieAttivitaTuristica;
    isAlloggio?: boolean;
    categorie?: Categoria[];
}
