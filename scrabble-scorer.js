// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const scoringAlgorithmSimple = {
  name: 'Simple Scoring',
  description: 'This function counts all the letters and gives a score of +1 to each letter in the given word.',
  scoringFunction: simpleScore
};
const scoringAlgorithmsVowelBonus = {
  name: 'Vowel Bonus Scoring',
  description: 'Scores vowels at +3 points, and constanants at +1.',
  scoringFunction: vowelBonusScore
};
const scoringAlgorithmsScrabble = {
  name: 'Scrabble Point Scoring',
  description: 'Scores each word by individual letter point value based upon original Scrabble point values.',
  scoringFunction: scrabbleScorer
};

const scoringAlgorithms = [scoringAlgorithmSimple, scoringAlgorithmsVowelBonus, scoringAlgorithmsScrabble]

const oldPointStructure = {
  0: [' '],
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);



function initialPrompt() {
   console.clear();
   console.log("Let's play some scrabble!\n");
   word = input.question('Enter a word to score: ').toLowerCase();
      while (!word.match(/^[a-zA-Z_ ]+$/ || !word === isNaN)) {
          console.clear();
          word = input.question('INVAILD WORD\n\nPlease, this time, enter a real word to score:  \n');
    }
   console.clear();
};

function oldScrabbleScorer(word) {
	let letterPoints = '';
 let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      totalPoints += Number(pointValue);
		 }
	  }
	}
	console.log(`Scrabble Point Scoring\nYour word contained ${word.length} letters, therefore scored:\n${letterPoints}\nYour total for this word is: ${totalPoints}!`);
};

function scrabbleScorer(word) {
  let letterPoints = '';
  let totalPoints = 0;
	  for (let i = 0; i < word.length; i++) {
          letterPoints += `Points for '${word[i]}': ${newPointStructure[word[i]]}\n`;
          totalPoints += Number(newPointStructure[word[i]]);
    }
	console.log(`Scrabble Point Scoring\nYour word contained ${word.length} letters, therefore scored:\n${letterPoints}\nYour total for this word is: ${totalPoints}!`);
};

function simpleScore(word) {
  let score = '';
    for (let i = 0; i < word.length; i++) {
      score++;
	  }
    console.log(`Simple Scrabble Scoring\nYour word contained ${word.length} letters, therefore scored: ${score}!`);
};

function vowelBonusScore(word) {
  let score = 0;
  let vowelScore = 0;
  let wordVowel = word.toUpperCase();
  let vowels = ['A', 'E', 'I', 'O', 'U']
    for (let i = 0; i < word.length; i++){
      if (vowels.includes(wordVowel[i])){
        vowelScore++
      } else {
        score++;
	    }
    }
  console.log(`Vowel Bonus Scrabble Scoring\nYour word: ${word}, contained ${vowelScore} vowels, and ${score} consonants\n\nTherefore you scored: ${(vowelScore * 3 + score)}!\n`);
};

function scorerPrompt() {
  console.log("How would you like to score this word?\n")
    for (i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${[i + 1]}.) ${scoringAlgorithms[i].name}\n${scoringAlgorithms[i].description}\n`)
    }
    selection = input.question('Select a choice from above: \n');

    while ((selection - 1) >= scoringAlgorithms.length || isNaN(selection)) {
      console.clear();
      console.log("That is not number or a valid choice from above. Select again:\n")
        for (i = 0; i < scoringAlgorithms.length; i++) {
          console.log(`${[i + 1]}.) ${scoringAlgorithms[i].name}\n`)
          }
        selection = input.question('Select a choice from above: \n');
    }
console.clear();
return scoringAlgorithms[selection - 1].scoringFunction(word);
};

function transform(lettersByScore){
  const scoresByLetter = {};
  for (let score in lettersByScore) {
      let letters = lettersByScore[score];
      for (let i=0; i < letters.length; i++) {
        scoresByLetter[letters[i].toLowerCase()] = Number(score)
      }
  }
  return scoresByLetter;
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
  //  transform: transform,
  //  oldPointStructure: oldPointStructure,
  // //  oldScrabbleScorer: oldScrabbleScorer,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	// scorerPrompt: scorerPrompt
};