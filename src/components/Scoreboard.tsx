import React from 'react';
import LeaderBoardStorage from '../storage/LeaderBoardStorage';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export interface IScoreboardProps extends IScoreBoard {
  
}

export interface IScoreBoard {
    player1: string;
    player2: string;
    wonBy: String;
    loser: String;
    isDrawn: boolean;
}

export interface IColumnParameters {
    headerName: string;
    field: string;
}

export interface IRowParameters extends IScoreBoard {
    round: number;
}

export interface IScoreboardState {
     columnDefs: IColumnParameters[];
     rowData: IRowParameters[];
}

class ScoreBoard extends React.Component<IScoreboardProps, IScoreboardState> {

      constructor(props: IScoreboardProps, state: IScoreboardState) {
           super(props);

           this.state = {
               columnDefs: [
                   {headerName: "Round#", field: "round"},
                   {headerName: "Winner", field: "wonBy"},
                   {headerName: "Player1", field: "player1"},
                   {headerName: "Player2", field: "player2"},
                   {headerName: "Drawn", field: "isDrawn"}
               ],
               rowData: []
           }          
      }

      componentDidUpdate(prevProps: IScoreboardProps) {
          let storage = new LeaderBoardStorage();

          if(prevProps !== this.props) {
              const {wonBy, loser, isDrawn} = this.props;
              if(!wonBy && !loser && !isDrawn) {
                  return;
              }
              storage.updateData(this.props);
              let data: IScoreBoard[] = storage.getData() || [];
              let rowData = [];
              for(let i=0; i < data.length; i++) {
                  let obj = {...data[i], round: data.length - i};
                  rowData.push(obj);
              }
              this.setState({rowData: rowData});
          }     

      }


      render() {

         return (
              <div className="ag-theme-alpine" style= { {height:'300px', width:'800px'}}>
                  <p>LeaderBoard</p>
                  <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                  ></AgGridReact>
              </div>

            
          )
      }
}

export default ScoreBoard;