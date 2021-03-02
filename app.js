var scores, roundscore, activePlayer, gamePlaying, dicePrevious, targetValue; 

initialValues();

// targetValue = document.getElementById("target1").value;

document.querySelector('.btn-roll').addEventListener('click', function() {

	if (gamePlaying) {
		// 1. ROll dice ie get a random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display the random number 
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

		// 3. update roundscore if rolled number is not 1
		if (dice === 6 && dicePrevious === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#current-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice !== 1) {
			// Add to Score
			roundscore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundscore;
		} else {
			// Next Player
			nextPlayer();
		}
		dicePrevious = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {

	if (gamePlaying) {
		scores[activePlayer] += roundscore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		var input = document.querySelector("#myInput").value;
		if(input) {
			var winningScore = input;
		} else {
			winningScore = 10;
		}
		if (scores[activePlayer] >= winningScore) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
			// document.querySelector('.btn-roll').disabled = true;
			// document.querySelector('.btn-hold').disabled = true;
		} else {
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundscore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initialValues);

function initialValues() {
	scores = [0,0];
	activePlayer = 0;
	roundscore = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById("myInput").textContent = 'FINAL SCORE';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
}