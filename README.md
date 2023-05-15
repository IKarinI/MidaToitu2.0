# MidaToitu2.0

Tegemist on enda varasemalt loodud projekti edasiarendusega õppimise eesmärkidel. Sellesse dokumenti on kirjutatud arendusprotsesside mõttekäik, nii nagu see juhtub. 
MidaToitu:
[Veebileht](https://ikarini.github.io/MidaToitu/ )
[Projekt](https://github.com/IKarinI/MidaToitu)

### Projektiplaan 1
Panen paika esmase projektiplaani, et saaks hakata samm-sammult funktsionaalsusi ühest projektist üle tooma teise peale.  
Kõigepealt tegelen projekti LK3 ja LK2

LK3
- Teha leht, mis võtab retsepide failist ühe konkreetset retsepti id alusel / getRecipeById. Tegelikult võiks retsepte kuvada nime järgi, et siis aadressiribale jääks pigem nimi, aga esialgu lihtsus mõttes teen kuvamise id kaudu.
- Tekitan aadressi /retseptid/:id, mis kuvab ühe retsepti, kasutab retsepti saamiseks getRecipeById
LK2
- Tekitan aadressi /retseptid, mis kuvab kõik retseptid, mis failis on. Loon funktsiooni getAllRecipes

- Tekitan aadressi /retseptid/tulemused, mis kuvab vastavalt kasutaja valitud toiduainetele (toiduainete id'dega array), kõik sobivad retseptid. Kasutan juba tehtud getRecipesById ja kõigi sobivate kuvamiseks käin toiduainete massiivi läbi.

NOTES FORE LATER: 
- getRecipeById võiks olla mitte id vaid retseptinime baasil. 
- Nav bar lisamine

Kõikide retspetide vaate loomine:  
Mul ei ole juhust, kus oleks vaja kuvada kõik retseptid täismahus korraga ekraanile, seega getAllRecipes võtab retseptide andmemasiivist ainult teatud objekti atribuudid. Vaja läheb pilti, nime ja koostiosade list. Koostisosad on selles retsepti objektis masiivina, mis siseldab numbreid. Koostisosa nimetuse saab koostisosade massiivi objektist selle numbri abil (id). 

Teise lehe kuvamisel on 3 võimalust, mis <p> elemendi sisse kuvatakse. 
"Nende retseptide jaoks on kõik koostisosad olemas:" - Kui kõik retseptis olevad toiduained on inimese poolt valitud.
"Sulle võivad huvi pakkuda järgmised retseptid:" - Kui mõned asjad on puudu, kuvab ka puuduvad toiduained nimekirjana
Ilma < p >, kui kuvab kõik retseptid, siis pealkirjaks jääb justkui lehel olev < h1 >.  

 Mul on lehele tulles kasutaja input massiiv, mis sisaldab kasutaja valikuid või on tühi. Mul on ligipääs retsptide nimekirjale, neid pean omavahel võrdlema, et sobivad leida. 

 Kasutajale kuvamiseks on mul vaja teada, et kas asi läheb retseptitabel1 või retseptitabel2 alla või jääb ilma pealkirjata niisama. Funktsioonis ära töödeldud info peaks sisaldama retsepti id, nimekirja asjadest, mis oli puudu (selle nimekirja pikkusest saab ka retsepti sobivuse, mida lühem nimekiri, seda sobivam - need kuvatakse eespool?).  

getSuitableRecipes - kontrollin iga retsepti [ recipes.length ] kohta, et kas selle koostisosade massiivi iga element[ recipes[ i ].koostisosad.length] sisaldub [  includes() ] tulemuste lists.

