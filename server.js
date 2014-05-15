var Hapi = require('hapi');
port = 8000;

solutions = []

genAllSolutions();

var server = new Hapi.Server('localhost', port);

function route(request, reply) {
	context = {
        solutions: solutions, 
        mainSol: {
            id: solutions[0][1], 
            grid: solutions[0][0], 
            fen: toFen(solutions[0][0])
        }
    }
	reply.view('index', context);
}

function getSolution(request, reply) {
  // var randomSolution = solutions[rnd(0,solutions.length)];
  // console.log(randomSolution);
  // reply(JSON.stringify(randomSolution));
  reply(JSON.stringify({fen: 'Q/Q/Q/Q/Q/Q/Q/Q'}));
}

function sendSolution(request, reply) {
  var data = request.payload.item;
  reply(val(fromFen(data)));
}

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: './',
      listing: false,
      index: true
    }
  }
});

server.route({ method: 'GET', path: '/solution', handler:getSolution});
server.route({ method: 'POST', path: '/sendSolution', handler:sendSolution});
server.route({ method: 'GET', path: '/', handler:route});

server.views({
    engines: {
        jade: 'jade'
    },
    path: './templates'
});

server.start(function () {
    console.log("server running on port " + port.toString());
});


// Helper functions

function genAllSolutions() {
    permutate([0,1,2,3,4,5,6,7], 
    	function (grid) {
    		var g = [grid.slice(), parseInt(grid.join('')), toFen(grid.slice())];
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

function rnd(min, max) {
  return Math.floor(Math.random()*(max-min)-min);
}