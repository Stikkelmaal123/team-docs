# Git Branching Strategy

## Vi har i gruppen brugt en variant af Gitflow som branching strategi.
- At det blev en variant skyldes en misforståelse/sammenblanding af branchingstrategierne, der er redegjort nedenfor hvordan Gitflow er blevet brugt og hvordan det skulle ha været brugt.

### Gitflow er blevet brugt med følgende opsætning:

- **Main branch**: Bliver brugt til version 1.0
- **Developer branch**: Indeholder produktionsklar kode.

Al udvikling har forgået på developer branchen. Dette har gjort det markant nemmere at følge med i hvad hinanden lavede, men har også krævet langt mere kommunikation end hvis rigtig gitflow var blevet benyttet. 

### Hvordan Gitflow skulle ha været brugt: 

- **Main branch**: Bliver brugt til version 1.0
- **Developer branch**: Indeholder produktionsklar kode.
- **Feature branches**: Bliver brugt til udvikling af features.
- **Hotfix branches**: Bliver brugt til akutte fixes.

Hvis de to ekstra branches havde været med under udviklingen af produktet, havde det været væsentligt nemmere at holde overblik over hvad folk manglede og var igang med. Det havde også afhjulpet den kommunikation der skulle være omkring hver gang et gruppemedlem pushede.