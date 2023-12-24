- [ ] tutte le pagine not found danno invece something went wrong
- [x] header: tendine ricambi e modelli
- [x] header: contatti mandare a contacts section
- [x] hero: bottone contattaci manda alla sezione contatti
- [x] prodotti recenti: vai ai prodotti (sopra e sotto) -> pagina dei prodotti
- [ ] contacts section: chiama scrivi e chatta
- [x] contacts section: striscia pagamenti sotto loghi auto
- [x] footer: mancano tutti i link
- [x] footer: traduzione login
- [x] footer: non compare la navbar
- [x] footer: doppi :: orari
- [ ] cambio lingua non funziona / i link non mandano alla lingua corrente
- [x] prodotto: search modal non compare
- [x] prodotto: non tradotta
- [x] prodotto: rimuovere condividi
- [x] prodotto: aggiungi al carrello
- [x] prodotto: aggiungi ai preferiti
- [ ] prodotto: foto zoomabili
- [x] modal ricerca: non tradotto
- [x] sezione contatti: sempre più padding
- [ ] testare tutta la login
- [ ] checkout: finire di testare (i prodotti devono essere disabilitati dopo l'aquisto)
- [ ] checkout: manca il design della mail di errore x 2m2
- [ ] checkout: suggerire dati registrazione
- [ ] checkout: se azienda permettere dati ffattura elettronica
- [x] pagine bianche di cookie, privacy

### VECCHI

- [ ] finire di testare la gesione del pagamento
- [x/2] i18n
- [ ] area riservata
- [x] preferiti salvabili
- [x?] sottolineatura a tutti gli elementi clickabili
- [x/2] tradurre le categorie / tipologie / tutte le cose note del database
- [x] breadcrumbs pagina prodotto, l'intem del prodotto stesso non è clickabile
- [x] prodotto condivisibile

# header

- [x] rimuovere lingue inutili
- [ ] link a google maps nell'indirizzo
- [ ] link email e telefono
- [x] header modals ricambi e modelli

# footer

- [x] forgot password più chiaro

# homepage

- [x] tasto contattaci (scroll)
- [x] featured products bottone non funziona
- [x] featured products bottone sotto non funziona
- [x] sezione dei brand sopra quella dei pagamenti

## sezione contatti

- [ ] i bottoni non fanno nulla

# checkout

- [ ] sezione login prima del checkout
      (usare login modal? manca x per chiudere e onSuccess configurabile)

# login / signup

- [x] password dimenticata
- [x] registrazione
- [x] pagina area riservata (carrello, preferiti, anagrafica)
- [ ] ordini effettuati (serve una tabella o basta stripe?)
      const paymentIntents = await stripe.paymentIntents.list({ limit: 3 });

# ricerca

- [x] pagina tutti i prodotti con filtri
- [ ] visualizzare filtri attivi
- [x] ogni pagina con prodotti abilitare i filtri di ricerca

# IMPORTANtI

- [ ] pagamento azienda (fattura elettronica)
- [x] rendere non disponibili i prodotti sul gestionale
- [x] svuotare il carrello (basandosi sui non disponibili)
- [x] email login con codice inutile

- [ ] prodotti correlati nelle pagine di ricerca

- [ ] usare memo per cacheare tutte le millimila chiamate a ecodat
      (già nextjs dovrebbe cacheare qualcosa?)

- [ ] categorie not found danno pagina 500 anzichè 404

# ALTRI

- [ ] Pagina modelli / categorie
- [ ] Pagina con form contatti
- [ ] filtri attivi nella pagina dei prodotti
- [x] ecodat filters cambiare funzione in promise
- [ ] gearchie di z-index: idealmente in tailwind.config (z-modal-login, z-header, ecc..) così da tenere controllate. questo per tutte quelle sopra il 50

- [ ] Collegare il customer stripe in fase di pagamento
      Ha senso avere un customer anon? penso di no

- [ ] mettere il nuovo componente Link ovunque (da testare)

- [ ] design mail per il cliente di notifica ordine avvenuto
