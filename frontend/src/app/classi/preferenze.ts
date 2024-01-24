import { PreferenzeAlimentari } from "../enums/preferenze-alimentari";
import { PreferenzeAlloggio } from "../enums/preferenze-alloggio";
import { PreferenzeAttivita } from "../enums/preferenze-attivita";
import { PreferenzeBudget } from "../enums/preferenze-budget";
import { PreferenzeStagione } from "../enums/preferenze-stagione";
import { PreferenzeViaggio } from "../enums/preferenze-viaggio";
import { Utente } from "./utente";

export class Preferenze {
    id?: number;
    visitatore?: Utente;
    viaggioPreferito?: PreferenzeViaggio;
    alloggioPreferito?: PreferenzeAlloggio;
    preferenzaAlimentare?: PreferenzeAlimentari;
    attivitaPreferita?: PreferenzeAttivita;
    animaleDomestico?: boolean;
    budgetPreferito?: PreferenzeBudget;
    souvenir?: boolean;
    stagioniPreferite?: PreferenzeStagione;
}
