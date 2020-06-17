import {boardConstants} from '../common/constants'

export let winnerFound = {status : false};

export function foundWinner() {
    return winnerFound.status;
}

export function areAllBoxesClicked(boxes: any[]) {
    let count = 0;
    boxes.forEach( item => {
         if(item != null) {
             count ++;
         }
    })
    return count === boxes.length? true : false;
}

export function findWinner(boxes: any[], index: number) {

    const rows = boardConstants.rows;
    const cols = boardConstants.cols;
    let arr = new Array(rows);

    console.log("index in findwinner is:",index);

    let row = (index / rows);
    row = Number.parseInt(row.toString());
    let col = (index % cols);
    col = Number.parseInt(col.toString());
    let boxIndex = 0;

    for(let i = 0; i < rows; i ++) {
        arr[i] = new Array(cols);
        for(let j = 0; j < cols; j++) {
            arr[i][j] = boxes[boxIndex ++];
        }
    }

    let currVal = arr[row][col];
    console.log("Curr val is:", currVal)
    let targetCount = boardConstants.targetCountForWinner;
    let count = 0;
    let i = row;
    let j = col;

    if(currVal != null) {

        count = 1;
        //scan the row( right and left)
        let rightStartIndex= j + 1;
        let currRow = i;
        let leftStartIndex = j - 1;
        while(rightStartIndex < cols) {
              if(arr[i][rightStartIndex] == currVal) {
                  count++;
              }
              else {
                  break;
              }
              if(count == targetCount) {
                  winnerFound.status = true;
                  return currVal;
              }
              rightStartIndex ++;
        }
        while(leftStartIndex >= 0) {
              if(arr[i][leftStartIndex] == currVal) {
                  count++;
              }
              else {
                  break;
              }
              if(count == targetCount) {
                  winnerFound.status = true;
                  return currVal;
              }
              leftStartIndex --;
        }

        //scan the top and bottom rows(vertical)
        count = 1;
        let topStartIndex = i - 1;
        let bottomStartIndex = i + 1;
        while(topStartIndex >= 0) {
            if(arr[topStartIndex][j] === currVal) {
                count ++;
            }
            else {
                break;
            }
            if(count === targetCount) {
                winnerFound.status = true;
                return currVal;
            }
            topStartIndex --;
        }
        while(bottomStartIndex < rows) {
            if(arr[bottomStartIndex][j] === currVal) {
               count ++;
            }
            else {
                break;
            }
            if(count === targetCount) {
                winnerFound.status = true;
                return currVal;
            }
            bottomStartIndex ++;
        }

        //scan the diagonal to left (top and bottom)
        count = 1;
        let diagStartIndexTopRowLeft = i - 1;
        let diagStartIndexTopColLeft = j - 1;
        let diagStartIndexBottomRowLeft = i + 1;
        let diagStartIndexBottomColLeft = j + 1;

        while(diagStartIndexTopRowLeft >=0 && diagStartIndexTopColLeft < cols) {
            if(arr[diagStartIndexTopRowLeft][diagStartIndexTopColLeft] === currVal) {
                count ++;
            }
            else {
                break;
            }
            if(count == targetCount) {
                winnerFound.status = true;
                return currVal;
            }
            diagStartIndexTopRowLeft --;
            diagStartIndexTopColLeft --;
        }

        while(diagStartIndexBottomRowLeft < rows && diagStartIndexBottomColLeft < cols) {
          if(arr[diagStartIndexBottomRowLeft][diagStartIndexBottomColLeft] === currVal) {
              count ++;
          }
          else {
              break;
          }
          if(count == targetCount) {
              winnerFound.status = true;
              return currVal;
          }
          diagStartIndexBottomRowLeft ++;
          diagStartIndexBottomColLeft ++;

      }

      //scan the diagonal to right (top and bottom)
      let diagStartIndexTopRowRight = i - 1;
      let diagStartIndexTopColRight = j + 1;
      let diagStartIndexBottomRowRight = i + 1;
      let diagStartIndexBottomColRight = j - 1;
      count = 1 ;

      while(diagStartIndexTopRowRight >= 0 &&  diagStartIndexTopColRight < cols) {
          if(arr[diagStartIndexTopRowRight][diagStartIndexTopColRight] === currVal) {
              count ++;
          }
          else {
              break;
          }
          if(count == targetCount) {
              winnerFound.status = true;
              return currVal;
          }
          diagStartIndexTopRowRight --;
          diagStartIndexTopColRight ++;
      }


    }

    return null;
}

export function findWinnerTest(boxes: any[])  {
     
    const rows = boardConstants.rows;
    const cols = boardConstants.cols;
    console.log("Current state of boxes in findWinnerTest is:", boxes);

    let arr = new Array(rows);
    let index = 0;


    for(let i = 0; i < rows; i ++) {
        arr[i] = new Array(cols);
        for(let j = 0; j < cols; j++) {
            arr[i][j] = boxes[index ++];
        }
    }

    let targetCount = boardConstants.targetCountForWinner;
    let count = 0;

    for(let i = 0; i < rows; i++) {

        for(let j = 0 ; j < cols; j ++) {
              let currVal = arr[i][j];

              if(currVal != null) {

                  count = 1;
                  //scan the row( right and left)
                  let rightStartIndex= j + 1;
                  let currRow = i;
                  let leftStartIndex = j - 1;
                  while(rightStartIndex < cols) {
                        if(arr[i][rightStartIndex] == currVal) {
                            count++;
                        }
                        else {
                            break;
                        }
                        if(count == targetCount) {
                            return currVal;
                        }
                        rightStartIndex ++;
                  }
                  while(leftStartIndex >= 0) {
                        if(arr[i][leftStartIndex] == currVal) {
                            count++;
                        }
                        else {
                            break;
                        }
                        if(count == targetCount) {
                            return currVal;
                        }
                        leftStartIndex --;
                  }

                  //scan the top and bottom rows(vertical)
                  count = 1;
                  let topStartIndex = i - 1;
                  let bottomStartIndex = i + 1;
                  while(topStartIndex >= 0) {
                      if(arr[topStartIndex][j] === currVal) {
                          count ++;
                      }
                      else {
                          break;
                      }
                      if(count === targetCount) {
                          return currVal;
                      }
                      topStartIndex --;
                  }
                  while(bottomStartIndex < rows) {
                      if(arr[bottomStartIndex][j] === currVal) {
                         count ++;
                      }
                      else {
                          break;
                      }
                      if(count === targetCount) {
                          return currVal;
                      }
                      bottomStartIndex ++;
                  }

                  //scan the diagonal to left (top and bottom)
                  count = 1;
                  let diagStartIndexTopRowLeft = i - 1;
                  let diagStartIndexTopColLeft = j - 1;
                  let diagStartIndexBottomRowLeft = i + 1;
                  let diagStartIndexBottomColLeft = j + 1;

                  while(diagStartIndexTopRowLeft >=0 && diagStartIndexTopColLeft < cols) {
                      if(arr[diagStartIndexTopRowLeft][diagStartIndexTopColLeft] === currVal) {
                          count ++;
                      }
                      else {
                          break;
                      }
                      if(count == targetCount) {
                          return currVal;
                      }
                      diagStartIndexTopRowLeft --;
                      diagStartIndexTopColLeft --;
                  }

                  while(diagStartIndexBottomRowLeft < rows && diagStartIndexBottomColLeft < cols) {
                    if(arr[diagStartIndexBottomRowLeft][diagStartIndexBottomColLeft] === currVal) {
                        count ++;
                    }
                    else {
                        break;
                    }
                    if(count == targetCount) {
                        return currVal;
                    }
                    diagStartIndexBottomRowLeft ++;
                    diagStartIndexBottomColLeft ++;

                }

                //scan the diagonal to right (top and bottom)
                let diagStartIndexTopRowRight = i - 1;
                let diagStartIndexTopColRight = j + 1;
                let diagStartIndexBottomRowRight = i + 1;
                let diagStartIndexBottomColRight = j - 1;
                count = 1 ;

                while(diagStartIndexTopRowRight >= 0 &&  diagStartIndexTopColRight < cols) {
                    if(arr[diagStartIndexTopRowRight][diagStartIndexTopColRight] === currVal) {
                        count ++;
                    }
                    else {
                        break;
                    }
                    if(count == targetCount) {
                        return currVal;
                    }
                    diagStartIndexTopRowRight --;
                    diagStartIndexTopColRight ++;
                }


              }
        }
    }


    return null;
}



function checkIfCountSuccedded(count: number): boolean {
     return (count == 3) ? true : false;
}