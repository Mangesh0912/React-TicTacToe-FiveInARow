import React from 'react';
import {Box} from './Box';
import Scoreboard from './Scoreboard';
import * as utils from '../utils/functions';
import Player, {IPlayerState} from './Player'
import {boardConstants} from '../common/constants'


export interface IBoardProps {

}

export interface IBoardState extends IPlayerState {
    boxes: any[];
    xIsNext: boolean;
    showBoard: boolean;
    players: Map<String, String>;
    showScoreBoard: boolean;
    currentIndex: number;
}

class Board extends React.Component<IBoardProps, IBoardState> {

      private rows: number = boardConstants.rows;
      private cols: number = boardConstants.cols;
      private boardSize: number = this.rows * this.cols;

      constructor(props: IBoardProps, state: IBoardState) {
          super(props);
           this.state = {
              boxes: Array(this.boardSize).fill(null),
              xIsNext: true,
              showBoard: false,
              player1: '',
              player2: '',
              players: new Map(),
              startNewGame: false,
              showInputPlayerNamesTextBox: true,
              showCurrentInputPlayers: false,
              showScoreBoard: true,
              currentIndex: 0
          }

      }    

      
      handleBoxClick(index: number): void {
  
           const boxes: any[] = this.state.boxes.slice();
           utils.findWinner(boxes, index);
           //stop the game if board contains winning combination
           if(utils.foundWinner() || boxes[index]) {
               return;
           }
           //Stop the game if all boxes are filled or clicked
           if(utils.areAllBoxesClicked(boxes)) {
               return;
           }
           //Mark the box as 'x' or 'o'
            boxes[index] = this.state.xIsNext ? 'x' : 'o'; 
            this.setState({
                boxes: boxes,
                xIsNext: !this.state.xIsNext,
                currentIndex: index
            })

      }

      //handle board restart
      handleBoardRestart = (): void => {
            this.setState({
                boxes: Array(this.boardSize).fill(null),
                xIsNext: true,
                showBoard: false,
                showCurrentInputPlayers: false,
                showInputPlayerNamesTextBox: true,
                showScoreBoard: true
            });
            utils.setWinnerFoundStatus(false);
      }

      playerInformation = (data: IPlayerState)  => {
           var playerMap = new Map();
           playerMap.set('x',data.player1);
           playerMap.set('o',data.player2)

           this.setState({
                player1: data.player1,
                player2: data.player2,
                showBoard: true,
                players: playerMap,
                showCurrentInputPlayers: true,
                showInputPlayerNamesTextBox: false
           });
         
      }


      render() {


        //Get wiiner if any
        const winner: String = this.state.players.get(utils.findWinner(this.state.boxes, this.state.currentIndex)) || "";

        //Are all boxes checked?
        const isFilled = utils.areAllBoxesClicked(this.state.boxes);

        //Status message
        let status;
        let startNewGame = false;

        if(winner) {
            status = `The winner is: ${winner}!`;
            startNewGame = true;
        }
        else if(!winner && isFilled) {
            status = 'Game drawn!';
            startNewGame = true;
        }
        else {
            // If there is no winner and game is not drawn, ask the next player to make a move
            status = `It is ${(this.state.xIsNext ? this.state.players.get('x') : this.state.players.get('o'))}'s turn.`
        }

        let {showBoard, boxes, showCurrentInputPlayers, showInputPlayerNamesTextBox, player1, player2, showScoreBoard} = this.state;
    
         return (
             
               <div>
                 <Player playerInformation = {this.playerInformation} 
                          handleBoardRestart={this.handleBoardRestart}
                          showInputPlayerNamesTextBox={showInputPlayerNamesTextBox}
                          startNewGame={startNewGame}
                          showCurrentInputPlayers={startNewGame ? false : showCurrentInputPlayers}
                  ></Player>
                 <div className = "board-wrapper">
                   <div className = {showBoard ? "board" : "hidden"}>
                       <h2 className="board-heading">{status}</h2>
                        {boxes.map( (v, index) => {
                                var currIndex = index;
                                if(index % this.rows === 0) {
                                    return <div className = "board-row">
                                            { boxes.slice(currIndex,currIndex + this.rows).map( (v, index) => {
                                                let computedIndex = currIndex + index;
                                                return <Box value = {boxes[computedIndex]} onClick = { () => this.handleBoxClick(computedIndex)}/>
                                            })}
                                           </div>
                                }
                        })}
                   </div> 

                 { (winner || isFilled || showScoreBoard) &&
                 <div className="scoreboard">
                   <Scoreboard
                          player1={player1}
                          player2={player2}
                          wonBy={winner}
                          loser={winner === player1 ? player2 : winner ? player1 : ""}
                          isDrawn= {isFilled ? true : false}
                   ></Scoreboard>
                 </div>

                 }
                                 
               </div>
               </div>

               
         )
      }

      
      
}


export default Board;
