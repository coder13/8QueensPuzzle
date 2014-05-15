var solutions = [];
var boards = [];
var mainBoard;

var solCfg = {
	'showNotation': false
}

document.addEventListener('DOMContentLoaded', function() {
	// genAllSolutions();

	// mainBoard = new ChessBoard("chessBoard", {});
	// console.log(solutions[0][0]);
	// mainBoard.position(toFen(solutions[0][0]));

	// for (var i = 0; i < solutions.length; i++) {
	// 	addSolution(solutions[i]);
	// }
});

function genAllSolutionsOld() {
	for (var i = 0; i < 23; i++) {
		var grid = perm();
  		while (true) {
  			if (val(grid[0]) && !existsInSolutions(grid))
  				break;
  			grid = perm();
  		}
  		solutions.push(grid);
		console.log(i);
	}
	console.log(solutions.length);
}

function genAllSolutions() {
    permutate([0,1,2,3,4,5,6,7], 
    	function (grid) {
    		var g = [grid.slice(), parseInt(grid.join(''))];
    		if (val(grid) && !existsInSolutions(g)) {
    			solutions.push(g);
    		}
    	});

	console.log('found ' + solutions.length.toString() + " solutions");
}

function permutate(array, callback) {
    // Do the actual permuation work on array[], starting at index
    function p(array, index, callback) {
        // Swap elements i1 and i2 in array a[]
        function swap(a, i1, i2) {
        	var t = a[i1];
        	a[i1] = a[i2];
        	a[i2] = t;
        }

	        if (index == array.length - 1) {
	        	callback(array);
	        	return 1;
	        } else {
	            var count = p(array, index + 1, callback);
	            for (var i = index + 1; i < array.length; i++) {
	            	swap(array, i, index);
	            	count += p(array, index + 1, callback);
	            	swap(array, i, index);
	            }
	          return count;
        }
    }

	if (!array || array.length == 0) {
		return 0;
	}
	return p(array, 0, callback);
}

function toFen(g) {
	var fen = '';
	for (var i = 0; i < g.length; i++) {
		fen += (g[i]?g[i].toString():'') + 'Q' + (i!=g.length-1?'/':'');
	}
	return fen;
}

function fromFen(fen) {
	var g = [];
	var f = fen.split('/');
	for (var i = 0; i < f.length; i++)
		g.push(parseInt(f[i]));
	return g;
}

function log2(val) {
		return Math.log(val) / Math.LN2;
}

function rnd(min, max) {
	return Math.floor(Math.random()*(max-min)-min);
}

function val(g) {
	if (g == null)
		return false;
 	for (var i = 0; i < (g.length-1); i++) {
 		for (j = i+1; j < (g.length); j++) {
 			if (Math.abs(g[j]-g[i]) == Math.abs(j-i)) {
 				return false;
 			}
 		}
 	}
 	return true;
}

function combine(a,b) {
	var c = 0;
	for (var i = a.length-1; i > -1; i--)
		c |= a[i] << (b*i);
	return c;
}

function perm() { 
	var g = [];
	var b = 0;
	while (g.length < 8) {
		var r = rnd(0,8);
		while (g.indexOf(r) != -1)
			r = rnd(0,8);
		g.push(r);
	}
	// b = combine(a, Math.ceil(log2(n)));
	b = parseInt(g.join(''));
	return [g,b];
}

function addSolution(grid) {
	if (!grid) {
    	grid = solutions[rnd(0,solutions.length)];
  	}

	var solList = document.getElementById("solutionsList");

	var solLi = document.createElement('li');
		solLi.onclick = function(e) {
			var id = grid[0];
			mainBoard.position(toFen(id), false);
		}    


	var solP = document.createElement('p');
		solP.innerHTML = (grid[1].length < 0 ? '0' : '') + grid[1];
	var solBoard = document.createElement('div');
    	solBoard.id = 'solBoard' + boards.length.toString();
    	solBoard.class = 'solutionsBoard';

    solLi.appendChild(solP);
    solLi.appendChild(solBoard);
	solList.appendChild(solLi);

	board = new ChessBoard("solBoard" + boards.length.toString(), solCfg);
		board.position(toFen(grid[0]));
	boards.push([board, grid[0]]);

	var solCount = document.getElementById("solutionCount");
	solCount.innerHTML = boards.length.toString() + " solutions";
}

function existsInSolutions(g) {
	function r(x) {
		return parseInt(x.toString().split("").reverse().join('')) * (x.toString()<8?10:1);	
	}
	for (var i = 0; i < solutions.length; i++) {
		if (solutions[i][1] == g[1] || r(solutions[i][1]) == g[1] ||
			99999999-solutions[i][1] == g[1] || 99999999-r(solutions[i][1]) == g[1] ||
			r(99999999-r(solutions[i][1])) == g[1] || 99999999 - r(99999999-r(solutions[i][1])) == g[1])
			return true;
	}
	return false;
} 