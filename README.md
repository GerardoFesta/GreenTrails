# GreenTrails

Portale per la creazione e la prenotazione di itinerari ecosostenibili

Progetto combinato Gestione dei Progetti Software/Ingegneria del Software, a.a. 2023/2024,
Università degli Studi di Salerno

## Partecipanti

| Project Manager | Team Member         |
|-----------------|---------------------|
| Gerardo Festa   | Diana Lavinia Cojoc |
| Davide La Gamba | Ernesto De Iesu     |
|                 | Gabriele Di Stefano |
|                 | Roberta Galluzzo    |
|                 | Michela Percaccio   |
|                 | Emanuele Setaro     |

## Installazione ed esecuzione

### Prerequisiti

- NodeJS (versione 20)
- Java (versione 21)
- Maven
- MySQL (versione 8)

```bash
git clone https://github.com/GerardoFesta/GreenTrails.git
```

### Frontend

```bash
cd frontend
npm install
npm run start
```

### Backend

```bash
cd backend
mvn package
java -Dserver.port=8080 -Dspring.profiles.active=prod -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Database

```mysql
CREATE SCHEMA greentrails;
```