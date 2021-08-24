import Controller from "./controller";

const AIController = (() => {
  let humanPlayerSign = 'X';
  let aiPlayerSign = 'O';

  const setCurrentPlayerSign = (sign) => {
    humanPlayerSign = Controller.getHumanPlayer(sign);
    aiPlayerSign = Controller.getAIPlayer(sign);
  };

  const minimax = (squares, playerSign) => {
    
    const availableMove = squares.filter(cell => !isNaN(cell));

    if (Controller.checkWin(squares)) {

      if (playerSign === humanPlayerSign) {
        return {score: 10};
      } else if (playerSign === aiPlayerSign) {
        return {score: -10}; 
      };

    } else if (availableMove.length === 0) {

      return {score: 0};

    };

    let moves = [];
    availableMove.forEach((spot) => {
      let move = {};
      move.index = spot;

      squares[spot] = playerSign;

      if (playerSign === aiPlayerSign) {
        const result = minimax(squares, humanPlayerSign);
        move.score = result.score;
      } else {
        const result = minimax(squares, aiPlayerSign);
        move.score = result.score;
      };

      squares[spot] = move.index;
      moves.push(move);
    });

    let bestMove;
    if (playerSign === aiPlayerSign) {
      let bestScore = -10000;
      moves.forEach((move, index) => {
        if (move.score > bestScore) {
            bestScore = move.score;
            bestMove = index;
        };
      });
    } else {
      let bestScore = 10000;
      moves.forEach((move, index) => {
        if (move.score < bestScore) {
            bestScore = move.score;
            bestMove = index;
        };
      });
    };

    return moves[bestMove];
  };

  return {
    setCurrentPlayerSign,
    minimax,
  };

})();

export default AIController;