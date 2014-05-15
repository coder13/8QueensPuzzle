var mainBoard;

document.addEventListener('DOMContentLoaded', function() {
            $.getJSON("/solution", function(data) {
                var solution = data;
                mainBoard = new ChessBoard("chessBoard", {draggable: true, position: solution.fen});
            });

            $('#postButton').on('click', postBoard);
        });

function postBoard(event) {
    $.post('/sendSolution', {item: mainBoard.fen()}, function (data) {
        console.log(data);
    });
}