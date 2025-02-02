/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du quiz. 
 * 
 *********************************************************************************/


// Afficher la question @param : question
function AfficherQuestion(question) {
    let questionAffiche = document.getElementById("question")
    console.log(question)
questionAffiche.innerText=`${question} ?`
}

// Afficher les réponses de la matrice listeReponses @param : numQuestion
function AfficherReponses (numQuestion) {
        // On parcours toutes les réponse de la question en cours
        for (let i=0; i<listeReponses[numQuestion].length; i++) {
        let inputRep= document.getElementById(`zoneReponse-${i+1}`);
        console.log(inputRep)
        // Décocher les inputs
        document.getElementById(`reponse-${i+1}`).checked=false;
        // Affichage de la réponse depuis la matrice
        inputRep.innerText=listeReponses[numQuestion][i]
        }
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
    let zoneResultat= document.querySelector(".ZoneQuiz");
    // Définition du message perso par défaut
    let messagePerso="Excellent, on voit le connaisseur!"
    // En fonction du résultat mettre un message personnalisé
    if (score<2) {
        messagePerso="Dommage, le thème était assez difficile!"
    } else {
        if(score<4){
            messagePerso="Pas mal du tout!"
        }
    }
    
    zoneResultat.classList.add("zoneResultat")
    // Vidage du contenu de la zone quiz pour afficher le résultat avec le message personnalisé
    zoneResultat.innerHTML=`Votre score est de ${score} / ${listeQuestions.length}<br><br>
    ${messagePerso}`
}

// Afficher tout le contenu de la zone des questions
function AfficherZoneQuestion(){
    // Vider le champ feedback
    AfficherResultatAttendu("")
    // Afficher uniquement s'il y a encore une question disponible 
    if(numQuestion<listeQuestions.length){
        AfficherNumQuestion(numQuestion+1);
        AfficherQuestion(listeQuestions[numQuestion])
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
    console.log(listeReponses[numQuestion][listeResultats[numQuestion]]);
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

