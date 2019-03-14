"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Ethan Gruenemeier
   Date:  3.14.19 
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/
var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";

window.onload = init();

function init() {
    allLetters = document.querySelectorAll("table#crossword span");
    currentLetter = allLetters[0];
    var acrossID = currentLetter.getAttribute("data-clue-a");
    var downID = currentLetter.getAttribute("data-clue-d");
    acrossClue = document.getElementById("acrossID");
    downClue = document.getElementById("downID");
}

function formatPuzzle(puzzleLetter) {
    currentLetter = puzzleLetter;
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.backgroundColor = "";
    }
    acrossClue.style.color = "";
    downClue.style.color = "";
}









/*====================================================*/

function getChar(keyNum) {
    return String.fromCharCode(keyNum);
}