function generateInteger(digits=1){
	if (digits<1){
		throw "can't generate integer, bad parameter";
	}
	var shift = Math.pow(10,(digits-1));
	return Math.floor(Math.random()*9*shift+shift);
}

function displayNextProblem(digits = 2){

	try{
		a = generateInteger(digits);
		b = generateInteger(digits);
	}catch(e){
		console.error(e);
	}
	document.getElementById('a').innerHTML = '&nbsp'+a;
	document.getElementById('b').innerHTML = '+'+b;
}

function checkAnswer(answerString){
	var myAnswer = parseInt(answerString);
	var correctAnswer = a+b;
	
	var digits = Math.log(correctAnswer) * Math.LOG10E + 1 | 0;

	if(answerString.length >= digits){
		if(myAnswer == correctAnswer)
			changeEnergy(10);
		else
			changeEnergy(-5);	
		document.getElementById('myAnswer').value ="";
		displayNextProblem(2);
	}
	
}

function go(){
clearInterval(myInterval);
energy=100;
displayNextProblem(2);
document.getElementById('container').classList.remove('hidden');
document.getElementsByTagName('button')[0].classList.add('hidden');

document.getElementById('myAnswer').focus();
updateEnergyDisplay();
myInterval = setInterval(() => changeEnergy(-1), 450);
}


function changeEnergy(amount = 1){
	energy += amount;
	updateEnergyDisplay();
	if(energy <= 0){
		gameOver();
	}
}

function updateEnergyDisplay(){
	var width = energy/100;
	if(width>1)
		width='1';
	width *=100
	document.getElementById('energyBar').style.width=width.toString()+'%';
	/*var status;
	if(energy<25)
		status = 'critical';
	else if (energy<50)
		status = 'low';
	else if (energy<75)
		status = 'medium';
	else if (energy<100)
		status = 'stable';
	else if (energy>=100)
		status = 'full';

document.getElementById('energyStatus').innerHTML = status + '('+energy+')';
*/
	document.getElementById('energyBar').setAttribute('class','');
	document.getElementById('energyBar').classList.add(status);
document.getElementById('energyBar').innerHTML = "&nbsp;";
	
		
}

function gameOver(){
clearInterval(myInterval);
document.getElementById('container').classList.add('hidden');
document.getElementsByTagName('button')[0].classList.remove('hidden');
document.getElementById('myAnswer').value = '';
}
var a;
var b;
var energy = 0;
var myInterval;



