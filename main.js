/* 
Battleships is a game played on a rectangular board. You are given an representation of such a board of size N(height) x M (width) with information about about the locations of the ships. 
The board is given as an array of B, whose every element is a string that corresponds to one row of the game board. Each character of each string represents a cell of the board and is either.
		. a '#' character, marking the part of ship; or
		. a '.' character, representing an empty cell.

Two cells that share a side and have a value of '#' are parts of the same ship. Cell(X, Y) shares a side with cells (X, Y-1), (X, Y+1), (X-1, Y) and (X+1, Y)

In the BattleShips game there are three types of ships:
Patrol Boats of size 1
[]

Submarines of size 2, which comes in two shapes:

[][]    []
		[]

Destroyers of size 3, which comes in six shapes:
[]     [][][]		[][]   [][]		[]		  []
[]					[]		 []		[][]    [][]
[]


Your task is to find the number of ships of each type occuring on each board.
For example, on the board represented by B = [".##.#","#.#..","#...#","#.##."]; there are two patrol boats, one submarine, and two destroyers

[ ] [D] [D]  [ ]  [P]
[D] [ ] [D]  [ ]  [ ]
[D] [ ] [ ]  [ ]  [P]
[D] [ ] [S]  [S]  [ ]

Write a function that, given an array B consisting of N string of length M each. returns an array R of the three intergers, such that:
		. R[0] represents the number of Patrol Boats
		. R[1] represents the number of Submarines
		. R[2] represents the number of Destroyers
*/


// Since a character present in string cannot be modified in javascript
function setCharAt(str, index, char) {
	if (index > str.length - 1)
		return str;
	return str.substring(0, index) + char + str.substring(index + 1);
}

function countShipPart(length, innerLength, arr, i, j, obj) {

	if (i < 0 || j < 0 || i >= length || j >= innerLength || arr[i][j] != "#")
		return;

	// Remove '#' to count each part only once
	arr[i] = setCharAt(arr[i], j, '.');
	obj.count += 1;

	countShipPart(length, innerLength, arr, i + 1, j, obj);
	countShipPart(length, innerLength, arr, i, j + 1, obj);
	countShipPart(length, innerLength, arr, i - 1, j, obj);
	countShipPart(length, innerLength, arr, i, j - 1, obj);

}

const countBattleShips = () => {

	const inputData = document.getElementById('inputData').value;

	let result = [0, 0, 0];

	let B = JSON.parse(inputData);

	const length = B.length;
	const innerLength = B[0].length;

	for (let i = 0; i < length; i++) {

		for (let j = 0; j < innerLength; j++) {

			let obj = { count: 0 };	// To save the count reference

			if (B[i][j] != "#")
				continue;

			countShipPart(length, innerLength, B, i, j, obj);

			if (obj.count == 1)
				result[0] += 1;
			else if (obj.count == 2)
				result[1] += 1;
			else
				result[2] += 1;

		}
	}

	console.log(`Result: ${result[0]} ${result[1]} ${result[2]}`);

	const patrol = document.getElementById('patrol');
	patrol.innerText = "The number of Patrol Ships: " + result[0];
	document.body.appendChild(patrol);

	const subs = document.getElementById('subs');
	subs.innerText = "The number of Submarines: " + result[1];
	document.body.appendChild(subs);

	const dest = document.getElementById('dest');
	dest.innerText = "The number of Detroyers: " + result[2];
	document.body.appendChild(dest);

}

