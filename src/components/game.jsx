import React, { useState } from "react";

function Game() {
  const ROWS = 5;
  const COLS = 5;
  const PLAYER = "😀";
  const BOX = "📦";
  const TARGET = "🎯";

  const initialGrid = [
    [TARGET, TARGET, TARGET, TARGET, TARGET],
    [TARGET, "", "", "", TARGET],
    [TARGET, "", BOX, "", TARGET],
    [TARGET, "", "", "", TARGET],
    [TARGET, TARGET, TARGET, TARGET, TARGET],
  ];
  const [grid, setGrid] = useState(initialGrid);
  const [playerPos, setPlayerPos] = useState({ row: 2, col: 1 });

  const movePlayer = (rowOffset, colOffset) => {
    const { row, col } = playerPos;
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    const nextCell = grid[newRow][newCol];

    if (nextCell === "") {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[row][col] = "";
        newGrid[newRow][newCol] = PLAYER;
        return newGrid;
      });
      setPlayerPos({ row: newRow, col: newCol });
    } else if (nextCell === BOX) {
      const nextRow = newRow + rowOffset;
      const nextCol = newCol + colOffset;
      const nextNextCell = grid[nextRow][nextCol];

      if (nextNextCell === "") {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[row][col] = "";
          newGrid[newRow][newCol] = PLAYER;
          newGrid[nextRow][nextCol] = BOX;
          return newGrid;
        });
        setPlayerPos({ row: newRow, col: newCol });
      }
    }
  };

  return (
    <div className="App">
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => {
                    if (
                      rowIndex === playerPos.row &&
                      colIndex === playerPos.col
                    ) {
                      return;
                    }

                    if (
                      rowIndex === playerPos.row &&
                      colIndex === playerPos.col - 1
                    ) {
                      movePlayer(0, -1);
                    } else if (
                      rowIndex === playerPos.row &&
                      colIndex === playerPos.col + 1
                    ) {
                      movePlayer(0, 1);
                    } else if (
                      rowIndex === playerPos.row - 1 &&
                      colIndex === playerPos.col
                    ) {
                      movePlayer(-1, 0);
                    } else if (
                      rowIndex === playerPos.row + 1 &&
                      colIndex === playerPos.col
                    ) {
                      movePlayer(1, 0);
                    }
                  }}
                >
                  {cell === PLAYER && PLAYER}
                  {cell === BOX && BOX}
                  {cell === TARGET && TARGET}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Game;
