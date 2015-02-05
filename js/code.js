/*
CODE JS
*/

//Permet de lancer la fontion Init quand la page HTML est terminé de charger
$(function(){
    init();
});

function init(){
    
   
    //definition DONNEES
    var listeNiveaux = new Array();
    var listeBalles = new Array();
    var listeCouleurs = new Array();
    var listeTailles = new Array();
    
  
    listeTailles[0] = [5,"small"];
    listeTailles[1] = [10,"medium"];
    listeTailles[2] = [20,"big"];

    listeCouleurs[0] = ["red", "#FF0000"];
    listeCouleurs[1] = ["green", "#00FF00"];
    listeCouleurs[2] = ["blue", "#0000FF"];
    
    //liste niveaux reprenant les index des tableaux couleur et taille
    listeNiveaux[0]=[0,0];
    listeNiveaux[1]=[1,0];
    listeNiveaux[2]=[1,2];    
    
    //tableux des balles qui reprend les index des tableaux couleur et taille
    listeBalles[0] = [0,0,0,150,3,0]; //IdNiv, Couleur, Taille, posX, Vit, posY
    listeBalles[1] = [0,1,1,250,4,0];
    listeBalles[2] = [1,1,0,300,3,0];
    listeBalles[3] = [1,0,2,50,4,0];   
    listeBalles[4] = [2,1,2,100,3,0];   
    listeBalles[5] = [2,2,1,175,5,0];
    
    //initialisation VARIABLES
    var monCanvas ; 
    var tempsmax = 10;
    var tempsJeu=tempsmax;    
    var niveauCourant=0;
    var ecranCourant = "accueil";
    var ctx;
    var i=0;
    var nbBallesDessinees=0;
    var index;
    var fps = 0;
    var Score = 0;
    
    // creation STRUCTURE html
    creeAccueil();
    creeJeu();
    creeBilan();
    
    
   
    
    //GESTIONAIRES
    $("#boutonJeu").click(afficheJeu);
    $("#boutonQuitter").click(afficheBilan);
    $("#boutonRejouer").click(afficheJeu);
    $("#boutonAccueil").click(afficheAccueil);
    monCanvas.addEventListener("click",clicCanvas, false);
    
    //moteur REGLES
    setInterval(regles, 75);
    
    //LANCEMENT
    afficheAccueil();


    //FONCTIONS
    function dessineBalle(index){
        
        i++;
    
        //console.log("je suis dans la fonction dessineBalle et I vaut"+i);
        //ctx.translate(0,i*listeBalles[index][4]);
        ctx.beginPath();
        //console.log("position x = "+listeBalles[index][3]+"position y = "+listeBalles[index][5]);
        ctx.arc(listeBalles[index][3],i*listeBalles[index][4],listeTailles[listeBalles[index][2]][0],0,2* Math.PI,false);
        ctx.fillStyle = listeCouleurs[listeBalles[index][1]][1];
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        listeBalles[index][5] = i*listeBalles[index][4];
        
        
    }
    
    function clicCanvas(e){
   
        // position de la souris / document
		var xSourisPage = e.pageX; 
	    var ySourisPage = e.pageY;
        
		// position du canvas / document
        var xCanvas = monCanvas.offsetLeft;
		var yCanvas = monCanvas.offsetTop;
        
        // position du clic / canvas
		xSouris = xSourisPage - xCanvas;
		ySouris = ySourisPage - yCanvas;
        
        
        
		for (var c=0; c<=listeBalles.length-1; c++){
			
            var Rayon = listeTailles[listeBalles[c][2]][0];
                        
            if (listeBalles[c][0] == niveauCourant){
                                
            if(Math.abs(listeBalles[c][3]-xSouris) <= Rayon
				&& Math.abs(listeBalles[c][5]-ySouris) < Rayon){
                listeBalles[c][5] = 400;
				
                if(listeCouleurs[listeBalles[c][1]][0] == listeCouleurs[listeNiveaux[(niveauCourant)][0]][0])
                {
                    if(listeTailles[listeBalles[c][2]][1] == listeTailles[listeNiveaux[(niveauCourant)][1]][1])
                    {
                    Score++;
                    console.log("Good couleur en taille score = "+Score);
                    }
                                 
                }else{
                
                    Score--;
                    console.log("BAD score = "+Score);
                } 
                
			}
		  }
        }
    
}
    
    function regles(){
        //console.log("L'ecran courant est "+ecranCourant);
        if (ecranCourant=="jeu"){
            animer();
        }

    }

    function animer() {
        
        //mise en place d'un systéme bricolage pour dissocier le temps en seconde et la frequence d'affichage
        fps++;
        if (fps == 10){
        tempsJeu--;
        fps=0;
        }
        //console.log("fps = "+fps);
        
        if (tempsJeu<=0){

            ctx.clearRect(0,0,monCanvas.width,monCanvas.height);
            afficheBilan();

        } else {
        
        nbBallesDessinees = 0;
        ctx.clearRect(0,0,monCanvas.width,monCanvas.height);
            
                    for (var index=0; index<=listeBalles.length-1 ; index++){
                        if (listeBalles[index][0] == niveauCourant){

                        //Teste si la balles est sorti ou pas du canvas pris en compte du rayon
                        if (listeBalles[index][5]<=400-listeTailles[listeBalles[index][2]][0]){
                            afficheConsigne();
                            dessineBalle(index);
                            nbBallesDessinees++;
                        }
                    }
                }     
                    
                    if (nbBallesDessinees == 0){
                        if (niveauCourant > listeNiveaux.length-1)
                        {
                            i=0;
                            afficheBilan();
                            
                        } else {
                            i=0;
                            tempsJeu=tempsmax;
                            niveauCourant++;
                            
                        }
                    }
               
        }
        
    }


    //Affichage d'accueil et masquage de jeu et bilan 
    function afficheAccueil(){
        
        //Reinit du jeu  
        niveauCourant = 0;
        tempsJeu = tempsmax;
        i=0;
        index =0;
         
        //Reset des position y du tableau listeBalles
         for (var index=0; index<=listeBalles.length-1 ; index++){
             
             listeBalles[index][5] = 0;
             
         }     
        
        ecranCourant = "accueil";
        $("#accueil").show();
        $("#jeu").hide();
        $("#bilan").hide();
    }
    
    //Affichage de jeu et masquage d'accueil et bilan 
    function afficheJeu(){
        
        //On nettoie le contexte avant de commencer
        ctx.clearRect(0,0,monCanvas.width,monCanvas.height);
        
                
        ecranCourant = "jeu";
        $("#accueil").hide();
        $("#jeu").show();
        $("#bilan").hide();
    }
    
    //Affichage de Bilan et masquage d'accueil et jeu 
    function afficheBilan(){
       
        ecranCourant = "bilan";
       
        //Reinit du jeu  
       
        i=0;
        index =0;
        
        //Reset des position y du tableau listeBalles
         for (var index=0; index<=listeBalles.length-1 ; index++){
             
             listeBalles[index][5] = 0;
             
         } 
         
        afficheRecap();
         
        $("#accueil").hide();
        $("#jeu").hide();
        $("#bilan").show();
    }
    
    
    function creeAccueil(){
    $("#titre").html('Clic sur les balles');
    $("#image").html('<img id="img" src="./img/balles.jpg" width="450" height="300">');
    $("#texte").html("Dans chacun des niveaux de jeu, cliquer sur les balles correspondant à la consigne affichée avant qu'elles touchent le bas du cadre !");
    $("#boutonJeu").html('<input type="submit" name="boutonJeu" id="boutonJeu" value="JOUER"/>');
        
    }
    
    function creeJeu(){
        $("#animation").html('<canvas id="canvas" width="500" height="400"> Texte si le navigateur ne supporte pas </canvas>');
        
        //Test si le navigateur supporte ou pas le canvas et on recupére le ctx au passage
        monCanvas= document.getElementById('canvas');
        if(monCanvas.getContext){
            ctx=monCanvas.getContext('2d');
        } else {
            alert('Canvas non supporté par ce navigateur');
        }
        
        $("#boutonQuitter").html('<input type="submit" name="boutonQuitter" id="Quitter" value="QUITTER" />');
    }
    
    function creeBilan(){
        $("#boutonAccueil").html('<input type="submit" name="boutonAccueil" id="Accueil" value="ACCUEIL" />');
        $("#boutonRejouer").html('<input type="submit" name="boutonRejouer" id="Rejouer" value="REJOUER" />');
    }
    
    function afficheConsigne(){
        
         $("#consigne").html('Cliquez sur les ronds '+listeCouleurs[listeNiveaux[niveauCourant][0]][0]+' de taille '+listeTailles[listeNiveaux[niveauCourant][1]][1]+'<br> Niveau en cours : '+ (niveauCourant+1)+'<br> Temps disponible = '+tempsJeu+'<br>SCORE actuel : '+Score);
        
    }
    
    function afficheRecap(){
        //console.log(niveauCourant);
        if (tempsJeu == 0){
           $("#recap").html('Perdu ! plus de temps disponible');
            tempsJeu=tempsmax;
        } else if (niveauCourant == 3) {
        
            $("#recap").html('Le jeu est terminé <br> vous avez accumulé ' + Score + 'Pts sur 3Pts possible');
            tempsJeu=tempsmax;
            niveauCourant = 0;
            Score = 0;
         
        } else {
            $("#recap").html('Perdu ! vous avez quitter le jeu');
            tempsJeu=tempsmax;
             niveauCourant = 0;
        }
        
    }
    
}

