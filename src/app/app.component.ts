import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'ticTacToe';
  myArray = [0, 1, 2];
  turn: number = 1;
  currentplayer: string = 'X'
  disabled: boolean = false;
  message: string = "It's " + this.currentplayer + " turn"
  board: string[][] =
    [
      ['TWD', 'TWD', 'TWD'],
      ['TWD', 'TWD', 'TWD'],
      ['TWD', 'TWD', 'TWD'],
    ];

  onClick(row: number, col: number, event: Event) {
    //You cannot click the same button twice
    if (this.board[row][col] != 'TWD') {
      return
    }
    //Mark with X or O
    this.board[row][col] = this.currentplayer;

    //Board full but no winner
    if (this.turn == 9 && !this.winnerCheck()) {
      this.message = "It's a Tie";
      this.disabled = true;
      return
    } else
      //Not enough turns to win or no winner yet 
      if (this.turn < 5 || !this.winnerCheck()) {
        console.log("No winner yet");
        if (this.currentplayer == 'X') {
          this.currentplayer = 'O';
          this.message = "It's " + this.currentplayer + " turn"
        } else {
          this.currentplayer = 'X'
          this.message = "It's " + this.currentplayer + " turn"
        }
      } else

        if (this.turn > 4 && this.winnerCheck()) {
          this.message = "We have a Winner! It's " + this.currentplayer
          this.disabled = true;
        }

    this.turn++;

  }

  winnerCheck() {

    for (let index = 0; index < this.myArray.length; index++) {
      //Vertical Winner
      if (this.board[0][index] != 'TWD' && this.board[0][index] == this.board[1][index] && this.board[0][index] == this.board[2][index]) {
        return true
      } else
        //Horizontal Winner 
        if (this.board[index][0] != 'TWD' && this.board[index][0] == this.board[index][1] && this.board[index][0] == this.board[index][2]) {
          return true
        }
    }
    //Left to Right Diagonal Winner
    if (this.board[0][0] == this.board[1][1] && this.board[0][0] != 'TWD' && this.board[0][0] == this.board[2][2]) {
      return true
    }
    else
      //Right to Left Diagonal Winner
      if (this.board[0][2] == this.board[1][1] && this.board[0][2] != 'TWD' && this.board[0][2] == this.board[2][0]) {
        return true
      }
    return false
  }

  refresh() {
    location.reload()
  }
}
