document.addEventListener('DOMContentLoaded', function() {
            var solutions = "";
            var boards = [];
            $.getJSON("/solutions", function(data) {
                solutions = data;
                var mainBoard = new ChessBoard("chessBoard", {position: solutions[0][2]});

                for (var i = 0; i < solutions.length; i++) {
                    boards.push(new ChessBoard('solBoard' + i, {showNotation: false, position: solutions[i][2]}));
                }
            });

        });