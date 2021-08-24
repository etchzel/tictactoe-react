import Player from "./player";
import AIController from "./aiController";

const Controller = (() => {
  let _playerA = new Player('X');
  let _playerB = new Player('O');

  const _currentTurn = (gameState) => {
    return gameState ? _playerA.getSign : _playerB.getSign;
  };

  const getHumanPlayer = (playerSign) => {
    return (playerSign === 'X' ? _playerA.getSign : _playerB.getSign);
  };

  const getAIPlayer = (playerSign) => {
    return (playerSign === 'X' ? _playerB.getSign : _playerA.getSign);
  };

  const checkWin = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    let winner = null;
    lines.some((line) => {
        const winCond = (
          line.every(i => squares[i] === 'X') ||
          line.every(i => squares[i] === 'O')
        );
  
        if (winCond) winner = line;
        return winCond;
    });
    return winner;
  };

  const checkDraw = (squares) => {
    if (squares.some(cell => cell === null)) return false;
    return true;
  };

  const moveStep = (state, idx) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (checkWin(squares) || squares[idx]) return false;
    if (checkDraw(squares)) return false;

    squares[idx] = _currentTurn(state.xIsNext);
    const newState = {
      history: history.concat([{
        squares: squares,
        moveIndex: idx,
      }]),
      stepNumber: history.length,
      gameMode: state.gameMode,
      playerSign: state.playerSign,
      xIsNext: !state.xIsNext,
    };

    return newState;
  };

  const aiStep = (state) => {
    if (state.xIsNext && state.playerSign === 'X') return;
    const squares = state.history[state.history.length - 1].squares.slice();
    const indexedSquares = squares.map((s, i) => {
      if (s === null) s = i;
      return s;
    });

    AIController.setCurrentPlayerSign(state.playerSign);
    const moveIndex = AIController.minimax(
      indexedSquares, getAIPlayer(state.playerSign)
    ).index;

    if (moveIndex === undefined) return;
    const move = moveStep(state, moveIndex);
    return move;
  };

  const getEmptySquares = (squares) => {
    return squares.filter(s => s === null);
  };

  return {
    checkWin,
    checkDraw,
    moveStep,
    aiStep,
    getEmptySquares,
    getHumanPlayer,
    getAIPlayer,
  };

})();

export default Controller;
