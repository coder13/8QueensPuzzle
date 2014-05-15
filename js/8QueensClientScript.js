var mainBoard;

document.addEventListener('DOMContentLoaded', function() {
            $.getJSON("/solutions", function(data) {
                solutions = data;
                mainBoard = new ChessBoard("chessBoard", {draggable: true, position: solutions[0][2]});
            });

            $('#postButton').on('click', postBoard);
        });

function postBoard(event) {
    $.post('/sendSolution', {item: mainBoard.fen()}, function (data) {
        console.log(data);
    });
}