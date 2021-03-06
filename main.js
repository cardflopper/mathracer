function generateInteger(digits = 2){
	if (digits < 1){
		throw "can't generate integer, bad parameter";
	}
	var shift = Math.pow(10, (digits-1));
	return Math.floor(Math.random()*9*shift + shift);
}

function generateNextProblem(digits = 2){

	try{
		a = generateInteger(digits);
		b = generateInteger(digits);
	}catch(e){
		console.error(e);
	}
}

function displayNextProblem(){
	document.getElementById('a').innerHTML = '&nbsp' + a;
	document.getElementById('b').innerHTML = '+' + b;
}

function checkAnswer(answerString){
	var myAnswer = parseInt(answerString);
	var correctAnswer = a + b;

	var digitsEntered = Math.log(correctAnswer) * Math.LOG10E + 1 | 0;

	if(answerString.length >= digitsEntered){
		var historyClass = 'incorrect';
		if(myAnswer == correctAnswer){
			changeEnergy(ENERGY_CHANGE_CORRECT);
			historyClass = 'correct';
		}
		else
			changeEnergy(ENERGY_CHANGE_INCORRECT);

		document.getElementById('myAnswer').value ="";

		//append problem to history
		var historyElement = document.createElement('div');
		historyElement.innerHTML = '[' + problemCounter + '] ' + a + "+" + b + "=" + myAnswer;
		historyElement.classList.add(historyClass);
		document.getElementById('history').prepend(historyElement);
		currentProblemCounter++;

		generateNextProblem();
		displayNextProblem();
	}
}

function go(){
	document.getElementById('history').innerHTML='';
	currentProblemCounter = 1;
	clearInterval(myInterval);
	energy = ENERGY_START;
	displayNextProblem(2);
	document.getElementById('container').classList.remove('hidden');
	document.getElementsByTagName('button')[0].classList.add('hidden');

	document.getElementById('myAnswer').focus();
	updateEnergyDisplay();
	myInterval = setInterval(() => changeEnergy(-1), ENERGY_DEPLETE_SPEED);
}


function changeEnergy(amount = 1){
	energy += amount;
	updateEnergyDisplay();
	if(energy <= 0)
		gameOver();
}

function updateEnergyDisplay(){
	var width = energy/100;
	if(width > 1)
		width = '1';
	width *= 100
	document.getElementById('energyBar').style.width = width.toString()+'%';
	var status;
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
var energy = 100;
var currentProblemCounter = 1;
var myInterval; // keeps track of countdown
var ENERGY_DEPLETE_SPEED = 400; //millisec, interval between depletions
var ENERGY_CHANGE_CORRECT = 10;
var ENERGY_CHANGE_INCORRECT = -5;
var ENERGY_START = 100;



