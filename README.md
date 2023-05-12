# MidaToitu2.0

Tegemist on enda varasemalt loodud projekti edasiarendusega õppimise eesmärkidel. 
MidaToitu:
[Veebileht](https://ikarini.github.io/MidaToitu/ )
[Projekt](https://github.com/IKarinI/MidaToitu)

### Projektiplaan 1
Panen paika esmase projektiplaani, et saaks hakata samm-sammult funktsionaalsusi ühest projektist üle tooma teise peale.  
Kõigepealt tegelen projekti LK3 ja LK2

- Teha leht, mis võtab retsepide failist ühe konkreetset retsepti id alusel / getRecipeById. Tegelikult võiks retsepte kuvada nime järgi, et siis aadressiribale jääks pigem nimi, aga esialgu lihtsus mõttes teen kuvamise id kaudu.
- Tekitan aadressi /recipes/:id, mis kuvab ühe retsepti, kasutab retsepti saamiseks getRecipeById
- Tekitan aadress /recipes, mis kuvab kõik retseptid, mis failis on. Loon funktsiooni getAllRecipes
- Tekitan aadress /recipes/tulemused, mis kuvab vastavalt kasutaja valitud toiduainetele (toiduainete id'dega array), kõik sobivad retseptid. Kasutan juba tehtud getRecipesById ja kõigi sobivate kuvamiseks käin toiduainete massiivi läbi.

NOTES FORE LATER: 
- getRecipeById võiks olla mitte id vaid retseptinime baasil. 
- Nav bar lisamine