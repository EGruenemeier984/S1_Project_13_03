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
// establishes all the global varaibles
var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";
// runs the init function on load
window.onload = init;
// This function intializes the all the puzzles attributes and handles the events of mouse clicking.
function init() {
    allLetters = document.querySelectorAll("table#crossword span");
    currentLetter = allLetters[0];
    var acrossID = currentLetter.getAttribute("data-clue-a");
    var downID = currentLetter.getAttribute("data-clue-d");
    acrossClue = document.getElementById(acrossID);
    downClue = document.getElementById(downID);
    console.log(acrossClue);
    formatPuzzle(currentLetter);
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.cursor = "pointer";
        allLetters[i].addEventListener("onmousedown",
            function (event) {
                formatPuzzle(event.target);
            });
    }
    // This adds and event listener that specifies if a key is down and chnges the mouse cursor
    document.addEventListener("keydown", selectLetter)
    var typeImage = document.getElementById("directionImg");
    typeImage.style.cursor = "pointer";
    // Changes the direction the user types on the crossword using the event listener of click
    typeImage.addEventListener("click", switchTypeDirection);
    document.getElementById("showErrors").onclick = function () {
        for (var i = 0; i < allLetters.length; i++) {
            if (allLetters[i].textContent != allLetters[i].dataset.letter) {
                allLetters[i].style.color = "red";
            }
        }
        // this sets a timeout for the letter that the user types
        setTimeout(
            function () {
                for (var i = 0; i < allLetters.length; i++) {
                    allLetters[i].style.color = "";
                }
            }, 3000
        );
    }
    // this gets the solution button and displays the correct dataset to the user on click.
    document.getElementById("showSolution").onclick = function () {
        for (var i = 0; i < allLetters.length; i++) {
            if (allLetters[i].textContent != allLetters[i].dataset.letter) {
                allLetters[i].textContent = allLetters[i].dataset.letter;
            }
        }
    }
}
// This function formats the puzzle by giving the clue a color to emphasize it along with setting all the colors on the actual crossword.
function formatPuzzle(puzzleLetter) {
    currentLetter = puzzleLetter;
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.backgroundColor = "";
    }
    acrossClue.style.color = "rgb(96, 96, 28)";
    downClue.style.color = "rgb(96, 96, 28)";
    if (currentLetter.dataset.clueA != undefined) {
        acrossClue = document.getElementById(currentLetter.dataset.clueA);
        acrossClue.style.color = "blue";
        wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.getAttribute("data-clue-a") + "]");
        for (var i = 0; i < wordLetters.length; i++) {
            wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
        }
    }
    if (currentLetter.dataset.clueD != undefined) {
        downClue = document.getElementById(currentLetter.dataset.clueD);
        downClue.style.color = "red";
        wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.getAttribute("data-clue-d") + "]")
        for (var i = 0; i < wordLetters.length; i++) {
            wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
        }
    }
    if (typeDirection === "right") {
        currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
    } else {
        currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
    }
}
// This function selects a letter that the user presses and responds appropiatley.
function selectLetter() {
    var leftLetter = document.getElementById(currentLetter.dataset.left);
    var upLetter = document.getElementById(currentLetter.dataset.up);
    var rightLetter = document.getElementById(currentLetter.dataset.right);
    var downLetter = document.getElementById(currentLetter.dataset.down);
    var userKey = event.keyCode;
    if (userKey === 37) {
        formatPuzzle(leftLetter);
    } else if (userKey === 38) {
        formatPuzzle(upLetter);
    } else if ((userKey === 39) || (userKey === 9)) {
        formatPuzzle(rightLetter);
    } else if ((userKey === 40) || (userKey === 13)) {
        formatPuzzle(downLetter);
    } else if ((userKey === 8) || (userKey === 46)) {
        currentLetter.textContent = "";
    } else if (userKey === 32) {
        switchTypeDirection();
    } else if ((userKey >= 65) && (userKey <= 90)) {
        currentLetter.textContent = getChar(userKey);
        if (typeDirection === "right") {
            formatPuzzle(rightLetter);
        } else {
            formatPuzzle(downLetter);
        }
    }
    // This prevents the default key shortcuts from being used such as the refresh shortcut.
    event.preventDefault();
}
// This function changes the direction the user is typing when the direction img is pressed.
function switchTypeDirection() {
    var typeImage = document.getElementById("directionImg");
    if (typeDirection === "right") {
        typeDirection = "down";
        typeImage.src = "pc_right.png";
        currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
    } else {
        typeDirection = "right";
        typeImage.src = "pc_down.png";
        currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
    }
}

/*====================================================*/

function getChar(keyNum) {
    return String.fromCharCode(keyNum);
}