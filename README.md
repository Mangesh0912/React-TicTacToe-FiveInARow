This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### 'npm install'
Installs the libraries specified in package.json file.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### 'Components'
Following components are used in the Application.
Board -> This is a stateful component has the logic to draw the matrix(Game Board) depending on input rows and columns and has state.
Box -> This component is a presentation functional component which is used to display the boxes in the board.
Player -> This is a stateful container component which allows the user to input their names before starting the game and also
controls restarting/starting the game.
Scoreboard -> This component displays the leaderboards with most recent game displayed on the top.

### 'Utilities'
This has a function which has logic to determine if the user has won or the game has tied i.e. all the boxes are filled but there's no winner.

### 'React and Typescript have bene used for defining state and props wherever applicable to make our application strongly typed as vanilla js is loosely typed'



