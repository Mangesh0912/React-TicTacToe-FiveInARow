import React from 'react';

export interface IPlayerState {
    player1: string;
    player2: string;
    showInputPlayerNamesTextBox?: boolean;
    startNewGame?: boolean;
    showCurrentInputPlayers?: boolean;
}

export interface IPlayerProps {
    playerInformation(data: IPlayerState): void;
    handleBoardRestart(): void;
    startNewGame?: boolean;
    showInputPlayerNamesTextBox?: boolean;
    showCurrentInputPlayers?: boolean;
}

class Player extends React.Component<IPlayerProps, IPlayerState> {

    constructor(props: IPlayerProps, state: IPlayerState){
          super(props);
          this.state = {
               player1: '',
               player2: '',
               showInputPlayerNamesTextBox: true,
               startNewGame: false,
               showCurrentInputPlayers: false,
          }

    }

    componentDidUpdate(prevProps: IPlayerProps) {
        if(prevProps !== this.props) {
          this.setState( {showInputPlayerNamesTextBox: this.props.showInputPlayerNamesTextBox, 
                        startNewGame: this.props.startNewGame,
                        showCurrentInputPlayers: this.props.showCurrentInputPlayers
                    })
        }           
    }

    handleSubmit = (evt: any) => {
        evt.preventDefault();
        var player1 = this.state.player1;
        var player2 = this.state.player2;

        if(! (player1 && player2)) {
            alert("Please enter Names before proceeding!");
            return;
        }
        this.setState({showInputPlayerNamesTextBox: false, showCurrentInputPlayers: true})
        this.props.playerInformation(this.state);       
    }

    handleChange = (evt: any) => {
           const name = evt.target.name;
           const value  = evt.target.value;
           this.setState({ [name]: value } as Pick<IPlayerState, keyof IPlayerState>);
    }

    handleStartNewGame = (evt: any) => {
         this.setState({
              showInputPlayerNamesTextBox: true,
              showCurrentInputPlayers: false,
              startNewGame: false
         });
         this.props.handleBoardRestart();
    }

    render() {

        return (
         <form onSubmit = {this.handleSubmit}>
            <fieldset> 
             {this.state.showInputPlayerNamesTextBox  === true &&
               <div className={"center"}>
                 <label>Player 1 Enter Your Name: 
                   <input  type="text" value={this.state.player1} name="player1" onChange={this.handleChange} ></input>
                 </label>
                 <br/>
                 <label>Player 2 Enter Your Name: 
                    <input type="text" value={this.state.player2} name="player2" onChange={this.handleChange}></input>
                </label>    
                <br/>
                <br/>
                <button type="submit">Start Game</button>
              </div> }

             {this.state.showCurrentInputPlayers === true &&
                <p className={"center"}>{this.state.player1} v/s {this.state.player2}</p>
              }
             
             {this.state.startNewGame === true &&
               <button  className={"center"} onClick={this.handleStartNewGame}>Start New Game</button>
              }

            </fieldset> 
         </form> 
        )
    }
}

export default Player;

