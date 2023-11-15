import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-battlefield-header',
  templateUrl: './battlefield-header.component.html',
  styleUrls: ['./battlefield-header.component.scss']
})
export class BattlefieldHeaderComponent {

  @Input({ required: true }) label: string | null = '';
  @Input({ required: false }) playerName: string | null = '';
  @Input({ required: true }) playerWinCount: number = 0;
  @Input({ required: false }) reverse: boolean = false;

  get progress() { return this.playerWinCount * 20; }
  get isWinner() { return this.playerWinCount === 5; }

}