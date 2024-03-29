/**
 * Olivia Croteau
 * Wrestling Tournament | Sandbox Union
 * Started 02/24/2024
 * Last Updated: 03/28/2024
 * 
 * This program is designed to take 0-4 wrestler objects and put them through a wrestling tournament.
 * In it's present state it will take 4 'Avatar: The Last Airbender' benders from the benders array
 * for a full tournament. However, it is optimized to deal with an array containing less than 4 benders,
 * or any other array within the length constraint and of the same structure (simply add an array
 * to this file and call runTournament() with that array as the parameter).
 */

"use strict";



/*GLOBAL VARIABLES */
const benders = [
    {
        name: "Katara",
        health: 100,
        moves: [
            { name: "Ice Spear", damage: 45, type: "signature" },
            { name: "Giant Wave", damage: 20, type: "signature" },
            { name: "Blood Bending", damage: 100, type: "finisher"}
        ]
    },

    {
        name: "Aang",
        health: 100,
        moves: [
            { name: "Air Bomb", damage: 60, type: "signature" },
            { name: "Air Blast", damage: 15, type: "signature" },
            { name: "Energy Bending", damage: 100, type: "finisher"}
        ]
    },

    {
        name: "Zuko",
        health: 100,
        moves: [
            { name: "Fire Punch", damage: 35, type: "signature" },
            { name: "Swords o' Fire", damage: 55, type: "signature" },
            { name: "Fire Whip", damage: 100, type: "finisher"}
        ]
    },
 
    {
        name: "Toph",
        health: 100,
        moves: [
            { name: "Boulder Hurl", damage: 45, type: "signature" },
            { name: "Crashing Earth Wave", damage: 25, type: "signature" },
            { name: "Metal Bending", damage: 100, type: "finisher"}
        ]
    }
]

/**
 * matchUp: take all benders from benders array and randomly seperate them into 2 matchUp arrays.
 * This function will only be called if there are more than 2 benders in the benders array.
 * @param {array} benders 
 * @returns {array} [matchUp1, matchUp2]
 */
function matchUp(benders) {
    //initialize copy of benders array and second matchup array
    let matchUp1 = [...benders];
    let matchUp2 = [];

    //select 2 random benders from matchUp1
    while (matchUp2.length < 2) {
        let randBender = Math.floor(Math.random() * matchUp1.length);
        let benderSelected = matchUp1[randBender];

        //add selected benders to matchUp2 and remove from matchUp1
        matchUp2.push(benderSelected);
        matchUp1.splice(randBender, 1);
    }

    return [matchUp1, matchUp2];
}

/**
 * moveSelect: randomly select one move from a bender's moves array and return the object.
 * @param {object} bender 
 * @returns {object} moveSelected
 */
function moveSelect(bender) {
    let moveSelected = bender.moves[
        Math.floor(Math.random() * bender.moves.length)];
    
    return moveSelected;
}

/**
 * benadersAlive: return true if both benders have health greater than 0, else return false
 * @param {object} bender1 
 * @param {object} bender2 
 * @returns {boolean}
 */
function bendersAlive(bender1, bender2) {
    return bender1.health > 0 & bender2.health > 0;
}

/**
 * doDamage: subtract damage done by attacker's selected move from defenders health.
 * Successful finishing moves automatically bring defender's health to 0, ending the round.
 * Finishing moves have a 50% failure rate if the defender's health is above 45, and a 0% failure
 * rate if 45 or below.
 * Logs moves and associated health scores.
 * @param {object} attacker 
 * @param {object} defender 
 * @param {object} attackerMove 
 */
function doDamage(attacker, defender, attackerMove) {
    //deal damage for standard signature moves
    if (attackerMove.type == "signature") {
        //deal damage
        defender.health -= attackerMove.damage;
        //set any negative health scores to 0
        if (defender.health < 0) {
            defender.health = 0;
        }
        //log move and damage
        console.log("  ", attacker.name, "performs", attackerMove.name, "on", defender.name+".", 
            defender.name+"'s health:", defender.health);

    //deal damage for finisher moves with chance of failure
    } else {
        //get random 0 or 1. 0-> move proceeds, 1-> move fails
        let randFail = Math.floor(Math.random() * 2);
        //if defender is above 45 health and randFail, move fails
        if (defender.health > 45 & randFail == 1) {
            console.log("  ", attacker.name+"'s finishing move fails!",
                    defender.name+"'s health:", defender.health);
        // if defender health is below 45, or above 45 and !randFail, then finishing move proceeds
        } else {
            defender.health = 0;
            //log finishing move and damage
            console.log("  ", attacker.name, "performs their finishing move", attackerMove.name, "on", defender.name+".", 
            defender.name+"'s health:", defender.health);
        }
    }
}


const startingRoundNum = 1; //recursion counter for wrestle()
let loser;
let winner;
/**
 * wrestle: benders alternate selecting moves and dealing damage until one's health drops to 0.
 * wrestle() is called recurively for each bender's move, alternating which object is bender1 and bender2.
 * Each call of wrestle() is half of a completed round.
 * @param {object} bender1 
 * @param {object} bender2
 * @param {int} roundNum 
 * @return {object} winner
 */
function wrestle(bender1, bender2, roundNum) {
    //log round number every time a full round is completed
    if (Number.isInteger(roundNum)) {
        console.log("Round", roundNum);
    }
    //if both benders are alive, bender1 selects move and deals damage
    if (bendersAlive(bender1, bender2)) {
        let benderMove = moveSelect(bender1);
        doDamage(bender1, bender2, benderMove);
        //if both benders alive, wrestle() is called recursively; bender2 selects move and deal damage
        if (bendersAlive(bender1, bender2)) {
            //every call of wrestle() is half of a completed round
            roundNum += 0.5;
            wrestle(bender2, bender1, roundNum);
        //else if one bender dies they are declared the loser, other bender is the winner. log victory
        } else {
            if (bender1.health <= 0) {
                winner = bender2;
                loser = bender1;
            } else {
                winner = bender1;
                loser = bender2;
            }
            console.log("  ", loser.name+"'s health is below 0.", winner.name, "wins!");
        }
    }
    return winner;
}

/**
 * runTournament: program control. Takes an array of 0-4 benders 
 * @param {array} benders
 */
function runTournament(benders) {
    let finalist1;
    let finalist2;
    let victor = {name: "Nobody"}; //initial value of Nobody in case of empty array

    //intro statements
    console.log();
    console.log("LET'S GET READY TO RUMBLEEEEE!");
    console.log("Introducing your Benders!");
    for (let bender of benders) {
        console.log("  ", bender.name);
    }
    console.log();

    //if empty array, log no tournament
    if (benders.length == 0) {
        console.log("Oops...looks like there's no tournament today, check back next time.");
    //else if one bender is unopposed, declare them the victor and log
    } else if (benders.length == 1 ) {
        victor = benders[0];
        console.log("Looks like nobody else showed up :(");
    // else if array contains 2-4 benders, run full tournament
    } else {
        //get matchUp arrays. match2 will always have 2 benders. match1 will have 0-2
        let [match1, match2] = matchUp(benders);
        //if only 2 benders total (match1 is empty), benders from match2 automatically advance to finals.
        if (match1.length == 0) {
            finalist1 = match2[0];
            console.log("finalist1", finalist1.name);
            finalist2 = match2[1];
            console.log("finalist2", finalist2.name);
        //else if 3-4 benders total, run two matches
        } else if (match1.length >= 1) {
            //if 3 benders total, unmatched bender in match1 bypasses to finalist 1. log
            if (match1.length == 1) {
                finalist1 = match1[0];
                console.log("finalist1", finalist1.name);
                console.log(finalist1.name, "bypasses Match 1.");
                console.log();
            //if 4 benders total (full match1 array), run match1 and log. winner becomes finalist1.
            } else if (match1.length > 1) {
                console.log("Match 1:", match1[0].name, "vs.", match1[1].name);
                finalist1 = wrestle(match1[0], match1[1], startingRoundNum);
                console.log();
            }
            //run match2 and log. winner becomes finalist2.
            console.log("Match 2:", match2[0].name, "vs.", match2[1].name);
            finalist2 = wrestle(match2[0], match2[1], startingRoundNum);
            console.log();
        }
        //run finals match with 2 finalists and declare victor.
        console.log("Finals:", finalist1.name, "vs.", finalist2.name);
        victor = wrestle(finalist1, finalist2, startingRoundNum);    
    }
    //log victor (independent of how many matches, if any, took place)
    console.log();
    console.log(victor.name, "is the final victor!");

}

runTournament(benders);