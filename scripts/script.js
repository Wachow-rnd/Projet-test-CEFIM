/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du quiz. 
 * 
 *********************************************************************************/


// Afficher la question @param : question
function AfficherQuestion(question) {
    // récupération de la zone d'affichage de la question
    let questionAffiche = document.getElementById("question")
    console.log(question)
questionAffiche.innerText=`${question} ?`
}

// Afficher les réponses de la matrice listeReponses @param : numQuestion
function AfficherReponses (numQuestion) {
        // On parcours toutes les réponses de la question en cours
        for (let i=0; i<listeReponses[numQuestion].length; i++) {
        let inputRep= document.getElementById(`zoneReponse-${i+1}`);
        console.log(inputRep)
        // Décocher les inputs
        document.getElementById(`reponse-${i+1}`).checked=false;
        // Affichage de la réponse depuis la matrice
        inputRep.innerText=listeReponses[numQuestion][i]
        }
}

function AfficherTheme(numTheme) {
    let zoneTheme = document.getElementById("theme");
    zoneTheme.innerText = listeThemes[numTheme];
}

// Afficher le numéro de la question en cours
function AfficherNumQuestion(){
// Récupération du span où sera affiché le numéro
let zoneNumQuestion= document.getElementById("numQuestion")
// Affichage du numéro de la question en cours
zoneNumQuestion.innerText=` ${numQuestion+1}`
}

// Afficher le résultat à la fin du quiz @param:score
function AfficherResultat(score) {
    console.log(score);
    // récupération de la zone d'affichage du score
    let spanScore=document.getElementById("spanScore");
    // récupération de la zone d'affichage du message personnalisé 
    let spanMessagePerso= document.getElementById("spanMessagePerso");
    // récupération de la zone d'affichage du quiz
    let zoneQuiz= document.querySelector(".ZoneQuiz");
    // récupération de la zone d'affichage final du score    
    let zoneScoreFinal=document.querySelector(".zoneScoreFinal");
    // récupération de l'input pseudo
    let inputPseudo= document.getElementById("inputPseudo");
    console.log(inputPseudo);
    afficherScoreTableau();
    // vérification de l'evenement appui de la touche entrée sur l'inputPseudo
    inputPseudo.addEventListener("keydown",(event)=>{
        if(event.key === "Enter"){
            // empecher le comportement par défaut de l'appui de la touche entrée
            event.preventDefault();
            // sauvegarde du pseudo associé avec le score
            let nouveauScore = {pseudo : inputPseudo.value, score: score}
            tableNomScore.push(nouveauScore)
            // affichage du tableau des scores et récupérations de la liste ordonnée des scores et pseudos
            tableNomScore=afficherScoreTableau();
            // désactivation de l'entrée du pseudo
            inputPseudo.disabled="true";
            // sauvegarde dans le localstorage des données du tableau
            localStorage.setItem("tableNomOrdonnee", JSON.stringify(tableNomScore));
        };
        if(event.key === "Escape") {
            localStorage.clear();
            inputPseudo.disabled="true";  
        }
        
    });
    zoneQuiz.classList.add("cacher");
    // Définition du message perso par défaut
    let messagePerso="Excellent, on voit le connaisseur!"
    // En fonction du résultat mettre un message personnalisé
    // Si le score est 0 ou 1:
    if (score<2) {
        messagePerso="Dommage, le thème était assez difficile!"
    } else {
        // si le score est 2 ou 3:
        if(score<4){
            messagePerso="Pas mal du tout!"
        } else {
            if (score == 6){
                messagePerso = "Ouhlà! Carton plein!"
            }
        }
    }
    // zoneResultat.classList.add("zoneResultat");
    zoneScoreFinal.classList.add("afficher");
    // Vidage du contenu de la zone quiz pour afficher le résultat avec le message personnalisé
    // zoneResultat.innerHTML=`Votre score est de ${score} / ${listeQuestions.length}<br><br>
    // ${messagePerso}`
    spanScore.innerText=` ${score} / ${listeQuestions.length}`
    spanMessagePerso.innerText=`${messagePerso}`
  
}
// fonction pour afficher le pseudo saisi et son score dans le bon ordre
function afficherScoreTableau() {
    console.log(tableNomScore);
    // selection du corps du tableau
    let tableau= document.getElementById("tableauScore");
    // copie de la table des pseudo et scores
    tableNomOrdonnee=Array.from(tableNomScore);
    // classe par ordre décroissant en fonction des scores
    tableNomOrdonnee.sort((a,b) => b.score-a.score);
    // garde seulement les 5 premiers éléments
    tableNomOrdonnee = tableNomOrdonnee.slice(0,5);
    console.log(tableNomOrdonnee);
    // vider le corps du tableau des scores
    tableau.innerHTML="";
    // construction du corps du tableau avec les données
    for(let i = 0; i<tableNomOrdonnee.length; i++) {
        let score = tableNomOrdonnee[i];
        tableau.innerHTML+= `<tr>
        <td>${score.pseudo}</td>
        <td>${score.score}</td>
        </tr>`
    };
    return tableNomOrdonnee;
}

// Afficher tout le contenu de la zone des questions
function AfficherZoneQuestion(){
    // Vider le champ feedback
    AfficherResultatAttendu("")
    // Afficher uniquement s'il y a encore une question disponible 
    if(numQuestion<listeQuestions.length){
        AfficherTheme(0);
        AfficherNumQuestion(numQuestion+1);
        AfficherQuestion(listeQuestions[numQuestion]);
        AfficherReponses(numQuestion);
        AfficherTimer(nbSecondes);
    } else {
        // sinon afficher le résultat
        AfficherResultat(score)
    }
}
// Afficher la bonne réponse si le joueur a mal répondu
function AfficherResultatAttendu (bonneReponse){
    // Permet d'afficher la bonne réponse en feedback
    let zoneAlerte=document.getElementById("afficherResultat")
    zoneAlerte.innerText=bonneReponse
}

// Fontion pour arrêter le timer
function stopTimer(timer) {
  clearInterval(timer);
}
function basculerBoutonValider(){
    // fonction pour activer ou désactiver le bouton de validation
    btnValiderReponse.toggleAttribute("disabled")
  }  

let btnValiderReponse = document.getElementById("validerReponse");

function AfficherTimer(nbSecondes){
    
    let zoneAfficheTimer=document.getElementById("afficheTimer");
    console.log(zoneAfficheTimer);
    // Utilisation de la fonction setInterval avec comme parametre 1000ms
    let timer = setInterval(() => {
        zoneAfficheTimer.innerText = `${nbSecondes} s`;
        if(nbSecondes === 0){
            // Arrêter le timer arrivé à 0s
            stopTimer(timer);
            // passer à la question suivante
            numQuestion++
            AfficherResultatAttendu(`Le temps est écoulé!`);
            // désactiver le bouton pendant l'affichage du feedback
            basculerBoutonValider();
            // Attendre 2s pour voir l'affichage du feedback
            setTimeout(AfficherZoneQuestion,2000);
            // réactiver après l'affichage du feedback
            setTimeout(basculerBoutonValider,2000);
            
        }
        // Décrémenter d'une seconde
        nbSecondes--;
        
        // Au click du bouton arrêter le timer
        btnValiderReponse.addEventListener("click",()=>{
        stopTimer(timer);
        });
        // pas de 1s
    }, 1000);

}

let tableNomScore=window.localStorage.getItem("tableNomOrdonnee");
console.log(tableNomScore);

if (tableNomScore === null) {
    tableNomScore = [{pseudo: "Mario", score: 1},
        {pseudo: "Luigi", score: 0},
        {pseudo: "Peach", score: 2},
        {pseudo: "Toad", score: 1},
        {pseudo: "Bowser", score: 0},
    ];
} else {
    tableNomScore = JSON.parse(tableNomScore);
}
console.log(tableNomScore[0].length);
// Définition de la durée du timer
let nbSecondes = 15;
// Se positionner à la première question
let numQuestion = 0;
// Initialisation du score
let score=0;
// Affiche la première question avec ses réponses
AfficherZoneQuestion()
// Ecouter le bouton de validation de la réponse
let zoneQuiz = document.querySelector(".ZoneQuiz");
btnValiderReponse.addEventListener("click",() => {
    let reponse = document.getElementById(`reponse-${numQuestion+1}`);
    
    basculerBoutonValider();
    zoneQuiz.classList.remove("fadeIn");
   
    console.log(reponse)
    console.log(listeResultats[numQuestion])
    // Définition de la valeur cochée par défaut à 0
    let valeurCochee = 0
    console.log(listeReponses[numQuestion][listeResultats[numQuestion]-1]);
    for (let i=0;i<listeReponses[numQuestion].length;i++){
        let reponse = document.getElementById(`reponse-${i+1}`);
        
        if(reponse.checked){
            valeurCochee=reponse.value;
        }
        
    }
    
    if (valeurCochee == listeResultats[numQuestion]){
        score ++
        
        AfficherResultatAttendu(`Bonne réponse!`);
        
    } else {
        
        AfficherResultatAttendu(`Mauvaise réponse! La bonne réponse était ${listeReponses[numQuestion][listeResultats[numQuestion]-1]}`);
        
    }
    console.log(score)
    nbSecondes=15
    
    numQuestion++
    setTimeout(() => {
        
        if(numQuestion<listeQuestions.length){
            basculerBoutonValider();
            AfficherZoneQuestion();
            zoneQuiz.classList.add("fadeIn");
        } else {
            AfficherResultat(score)
        }
    }, 2000);
    
    // document.querySelector(".ZoneQuiz").classList.add("opacité");
    // setTimeout(()=>{
    //     document.querySelector(".ZoneQuiz").classList.remove("opacité");
    // },1000);
    

})

