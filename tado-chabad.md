# Primo rilascio

## Database

- Articoli: a se stanti
  - [ ] immagini nel bucket (emanuele)
- News: a se stanti
  - [ ] immagini nel bucket (emanuele)
- Scraped: a se stanti
- Live e video:
  - sono solo dei link a youtube caricati su database
  - [ ] Può essere collegato a un responsible, (tabella live_responsibles) (emanuele)
- Responsibles
  - legato a una organizzazione (id_organizzazione)
- Organizzazione: a sé stante
- Eventi
  - legato a una organizzazione

## pagine del sito:

- [ ] Chabad (arriva da elia?)
- Tutti gli articoli (no filtri per rilascio)
  - [ ] paginazione (simone)
- Singolo articolo
  - [ ] altri articoli con link (emanuele)
  - [ ] vai a tutti gli articoli (emanuele)
- Tutte le news
  - [ ] paginazione (emanuele)
- Singola news
  - [ ] altre news con link (emanuele)
  - [ ] vai a tutte le news (emanuele)
  - [ ] markdown con mdx (simone)
- tutte le Live e video
  - [ ] paginazione (emanuele)
  - [ ] apri link in una nuova scheda (emanuele)
  - [ ] sezione JIMTv
    - [ ] funzionalità (simone)
    - [ ] design (emanuele)
- Tutte le organizzazioni
  - [ ] mostrare contatti : social con icone + telefono, mail, iban (simone con emanuele)
  - [ ] aggiunger link a singola organizzazione (emanuele)
- Singola organizzazione
  - [ ] collegare a db (compresi eventi e responsabili) (emanuele)
  - [ ] contatti deve scorrere ai contatti (simone con emanuele)
  - [ ] mostrare contatti : social con icone + telefono, mail, iban (emanuele)
  - [ ] markdown con mdx (simone)
- contribute
  - tutte le organizzazioni con un link di donazione
  - [ ] collegare al database (compresi i responsabili) (emanuele)
  - [ ] link che manda alla donazione (target=\_blank) (emanuele)
  - [ ] link che manda alla organizzazione (emanuele)
- [ ] contatti manda al footer (emanuele)

## Altri

- [ ] tutti i link tutto il sito (emanuele)
- [ ] newsletter (simone)
- [ ] tasto share (simone)
- [ ] SEO e opengraph e JSON-LD (boh)
  - [ ] hreflang (simone)
- [ ] editor articoli (simone)
- [ ] i18n (simone)
  - [ ] aggiungere colonna translations jsonb
  - [ ] creare funzione translationMapper()
- [ ] singola funzione per il parsing del markdown (simone)
- [ ] bug fix scraper (simone)
- [ ] feed rss jimtv (simone)
