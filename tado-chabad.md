# Primo rilascio

## Database

- Articoli: a se stanti
  - [x] immagini nel bucket (emanuele)
- News: a se stanti
  - [x] immagini nel bucket (emanuele)
- Scraped: a se stanti
- Live e video:
  - [~] sono solo dei link a youtube caricati su database
    - [ ] far comparire il video youtube sul sito
  - [ ] Può essere collegato a un responsible, (tabella live_responsibles) (emanuele)
- Responsibles
  - legato a una organizzazione (id_organizzazione)
- Organizzazione: a sé stante
- Eventi
  - legato a una organizzazione

## pagine del sito:

- [x] Chabad (arriva da elia?)
- Tutti gli articoli (no filtri per rilascio)
  - [ ] paginazione (simone)
  - [ ] grafica paginazione (emanuele)
- Singolo articolo
  - [x] altri articoli con link (emanuele)
  - [ ] vai a tutti gli articoli (emanuele)
    - [ ] anche nella homepage e dove serve
- Tutte le news
  - [ ] paginazione (emanuele)
- Singola news
  - [x] altre news con link (emanuele)
  - [ ] vai a tutte le news (emanuele)
  - [~] markdown con mdx (simone)
- tutte le Live e video
  - [ ] paginazione (emanuele)
  - [ ] apri link in una nuova scheda (emanuele)
    - [ ] rispiegare
  - [ ] sezione JIMTv (per ora non si sa)
    - [ ] funzionalità (simone) (manca il feed rss)
    - [ ] design (emanuele)
- Tutte le organizzazioni
  - [ ] mostrare contatti : social con icone + telefono, mail, iban (simone con emanuele)
  - [x] aggiunger link a singola organizzazione (emanuele)
- Singola organizzazione
  - [~] collegare a db (compresi eventi e responsabili) (emanuele)
  - [x] contatti deve scorrere ai contatti (simone con emanuele)
  - [~] mostrare contatti : social con icone + telefono, mail, iban (emanuele)
  - [~] markdown con mdx (simone)
- contribute
  - [x] tutte le organizzazioni con un link di donazione
  - [ ] collegare al database (compresi i responsabili) (emanuele)
  - [ ] link che manda alla donazione (target="\_blank") (emanuele)
  - [ ] link che manda alla organizzazione (emanuele)
- [ ] contatti manda al footer (emanuele)

## Altri

- [ ] ricerca
- [ ] tutti i link tutto il sito (emanuele)
- [ ] newsletter (simone)
  - [ ] grafica (emanuele)
- [ ] tasto share (simone)
- [ ] SEO e opengraph e JSON-LD (boh)
  - [ ] hreflang (simone)
- [ ] editor articoli (emanuele)
- [ ] i18n (simone)
  - [ ] aggiungere colonna translations jsonb
  - [ ] creare funzione translationMapper()
- [ ] singola funzione per il parsing del markdown (simone)
- [ ] bug fix scraper (simone)
- [ ] feed rss jimtv (simone)

## Altri ancora

- [ ] filtri organizzazioni / eventi
