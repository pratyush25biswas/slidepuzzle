var startime;
var endtime;
var time;
var key;
var move;
move=0;
localStorage.setItem(key, 0);

function score(time){
	highscore = localStorage.getItem(key);
	
	if (((highscore==0)||(highscore>time))&&(time!==0)) {highscore=time; }
return highscore;
}

function isSolved() {
 	for (var row=1;row<=4;row++){
		for (var column=1;column<=4;column++) {
			var tno = (row-1)*4+column;
			if(document.getElementById("cell"+row+column).className !== "tile"+tno){return false;}
		}
	}
	return true;
}


function update(){
	if (isSolved()==true){
		document.getElementById("status").innerHTML="puzzle is solved!";
		endtime=Date.now();
		time=endtime-startime;
		
		localStorage.setItem(key, score(time));
		scores = localStorage.getItem(key);
		if (scores==0){document.getElementById("leaderboard").innerHTML="Highest score : ";}
		else{document.getElementById("leaderboard").innerHTML="Highest score : "+scores;}
	}else{
		document.getElementById("status").innerHTML="puzzle is not solved";
	}
	return;
}


function swapTiles(cell1,cell2) {
  var temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;
  update();
}

function shuffle() {
move=0;
document.getElementById("moves").innerHTML="moves : ";
startime=Date.now();

for (var row=1;row<=4;row++) { 
   for (var column=1;column<=4;column++) { 
  
    var row2=Math.floor(Math.random()*4 + 1); 
    var column2=Math.floor(Math.random()*4 + 1); 
     
    swapTiles("cell"+row+column,"cell"+row2+column2); 
  } 
} 



}

function clickTile(row,column) {
  var cell = document.getElementById("cell"+row+column);
  var tile = cell.className;
  if (tile!="tile16") { 
       
       if (column<4) {
         if ( document.getElementById("cell"+row+(column+1)).className=="tile16") {
           swapTiles("cell"+row+column,"cell"+row+(column+1));
	   move++;
	   document.getElementById("moves").innerHTML="moves : "+move;

	   return;
         }
       }
       
       if (column>1) {
         if ( document.getElementById("cell"+row+(column-1)).className=="tile16") {
           swapTiles("cell"+row+column,"cell"+row+(column-1));
	   move++;
	   document.getElementById("moves").innerHTML="moves : "+move;

      	   return;
         }
       }
       
       if (row>1) {
         if ( document.getElementById("cell"+(row-1)+column).className=="tile16") {
           swapTiles("cell"+row+column,"cell"+(row-1)+column);
	   move++;
	   document.getElementById("moves").innerHTML="moves : "+move;

           return;
         }
       }
       
       if (row<4) {
         if ( document.getElementById("cell"+(row+1)+column).className=="tile16") {
           swapTiles("cell"+row+column,"cell"+(row+1)+column);
	   move++;
	   document.getElementById("moves").innerHTML="moves : "+move;
           return;
         }
       } 
  }
  
}



shuffle();
startime=Date.now();
document.getElementById("moves").innerHTML="moves : ";
document.getElementById("leaderboard").innerHTML="Highest score : ";


