import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input({ required: false }) isPlaying: boolean = false;
  @Output() endGameEvent = new EventEmitter<void>();

  onEndGame() {
    this.endGameEvent.emit();
  }

}
