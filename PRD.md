# PRD: Anatomia Prostiei - Refactorizare și Extindere

## Viziune
Transformarea site-ului dintr-un singur HTML într-o platformă modulară cu explorare interactivă a fenomenului "diluării IQ" în diverse contexte sociale, profesionale și culturale.

## Schimbări Cheie

### 1. Design System
- **Eliminare roșu**: Înlocuire cu teal/cyan (#14b8a6) ca accent principal
- **Paletă nouă**: Teal, Orange, Purple, Blue, Green, Yellow
- **Dark theme**: Păstrare temă întunecată

### 2. Arhitectură Fișiere
```
/
├── index.html              # Homepage cu navigare
├── css/
│   └── styles.css          # Stiluri globale
├── js/
│   └── main.js             # Funcționalități comune
│   └── simulators.js       # Motoare simulatoare
├── pages/
│   ├── fundamentals/       # Teoria de bază
│   │   ├── dunning-kruger.html
│   │   ├── knowledge-levels.html
│   │   └── bonhoeffer.html
│   ├── scenarios/          # SCENARII IQ DILUTION
│   │   ├── workplace.html       # La muncă
│   │   ├── school.html          # La școală
│   │   ├── family.html          # În familie
│   │   ├── friends.html         # Între prieteni
│   │   ├── neighbors.html       # Între vecini
│   │   ├── social-media.html    # Online/Social media
│   │   ├── politics.html        # Contexte politice
│   │   ├── cultural.html        # Contexte culturale
│   │   ├── geographic.html      # Diferențe geografice
│   │   └── institutions.html    # Instituții (spitale, bănci, etc.)
│   └── tools/
│       ├── self-test.html
│       └── diagnostic.html
```

## Scenarii IQ Dilution - Detalii

### WORKPLACE (La muncă)
- Meeting-uri: "Cine vorbește primul câștigă"
- Ierarhie: "Șeful are dreptate prin definiție"
- Brainstorming: Paradoxul grupului vs. individ
- Code reviews: Argumentul autorității
- **Simulator**: Meeting virtual cu dinamică de grup

### SCHOOL (La școală)
- Presiunea peer-ului
- "Tocilarul" vs. "Cool kid"
- Profesorul ca autoritate absolută
- Grupurile de lucru ineficiente
- **Simulator**: Clasă virtuală cu conformism

### FAMILY (În familie)
- "Așa s-a făcut mereu"
- Tradiții vs. gândire critică
- Generațional gap
- Autoritatea părinților/bunicilor
- **Simulator**: Masă de familie cu decizie colectivă

### FRIENDS (Între prieteni)
- Echo chamber natural
- "Toți prietenii mei cred asta"
- Loialitate vs. adevăr
- FOMO și presiune socială
- **Simulator**: Group chat cu cascade de opinii

### NEIGHBORS (Între vecini)
- Bârfă și răspândirea zvonurilor
- "A zis vecinul care știe"
- Hotărâri de bloc
- Mobilizare pe grupuri WhatsApp
- **Simulator**: Grup de vecini cu dezinformare

### SOCIAL MEDIA (Online)
- Algorithm bubbles
- Viralitate vs. adevăr
- Influenceri ca autorități
- Comentarii și pile-on
- **Simulator**: Feed personalizat (există, de extins)

### POLITICS (Contexte politice)
- Tribalism partizan
- "Dacă spune partidul meu..."
- Propaganda și manipulare
- Votul de turmă
- **Simulator**: Dezbatere politică cu polarizare

### CULTURAL (Contexte culturale)
- Diferențe în acceptarea autorității
- Individualismul vs. colectivismul
- Superstiții acceptate cultural
- "La noi așa se face"
- **Simulator**: Comparație culturală

### GEOGRAPHIC (Diferențe geografice)
- Urban vs. Rural
- Țări dezvoltate vs. în dezvoltare
- Accesul la informație
- Bule regionale
- **Simulator**: Hartă cu bule de informație

### INSTITUTIONS (Instituții)
- Spitale: "Doctorul știe mai bine"
- Bănci: "Consultantul recomandă"
- Școli: Sistemul educațional
- Biserici: Autoritatea spirituală
- **Simulator**: Navigare instituțională

## Mecanisme de Prostie Colectivă (teorie comună)

1. **Cascade Informaționale** - Primii setează direcția
2. **Conformism Social** - Presiunea de a fi de acord
3. **Difuzia Responsabilității** - "Altcineva a verificat"
4. **Polarizare de Grup** - Extremizare colectivă
5. **Gândirea de Grup** - Suprimarea dizidențelor
6. **Efectul Bandwagon** - "Toată lumea face"
7. **Pluralistic Ignorance** - Nimeni nu crede, toți pretind
8. **Authority Bias** - Credința oarbă în autorități
9. **In-group Bias** - Tribul are dreptate
10. **Status Quo Bias** - "Așa s-a făcut mereu"

## Chunk-uri de Lucru

### Chunk 1: Infrastructură
- [ ] Creare structură foldere
- [ ] Extragere CSS în fișier separat
- [ ] Înlocuire roșu cu teal în toată paleta
- [ ] Creare template HTML de bază
- [ ] Extragere JS în fișiere separate

### Chunk 2: Homepage + Navigare
- [ ] Refactorizare index.html ca hub
- [ ] Sistem de navigare între pagini
- [ ] Cards preview pentru fiecare secțiune

### Chunk 3: Pagini Fundamentale
- [ ] dunning-kruger.html (migrare + îmbunătățire)
- [ ] knowledge-levels.html (migrare)
- [ ] bonhoeffer.html (migrare)

### Chunk 4: Scenarii Profesionale
- [ ] workplace.html cu simulator meeting
- [ ] school.html cu simulator clasă
- [ ] institutions.html cu simulator

### Chunk 5: Scenarii Sociale
- [ ] family.html cu simulator masă
- [ ] friends.html cu simulator chat
- [ ] neighbors.html cu simulator grup

### Chunk 6: Scenarii Media/Politice
- [ ] social-media.html (extindere simulator existent)
- [ ] politics.html cu simulator dezbatere

### Chunk 7: Scenarii Culturale/Geografice
- [ ] cultural.html cu comparații
- [ ] geographic.html cu hartă interactivă

### Chunk 8: Instrumente
- [ ] self-test.html (migrare + extindere)
- [ ] diagnostic.html (migrare + extindere)

### Chunk 9: Polish & Integration
- [ ] Testare cross-browser
- [ ] Responsiveness
- [ ] Optimizare performanță
- [ ] Documentație

## Priorități
1. **P0**: Infrastructură + Homepage (Chunk 1-2)
2. **P1**: Scenarii cele mai relevante (Chunk 4-5)
3. **P2**: Restul scenariilor (Chunk 6-7)
4. **P3**: Fundamentale + Tools (Chunk 3, 8)
5. **P4**: Polish (Chunk 9)
