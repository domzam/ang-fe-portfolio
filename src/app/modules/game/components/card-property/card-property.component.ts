import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-property',
  templateUrl: `./card-property.component.html`,
  styleUrls: ['./card-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPropertyComponent {

  @Input() label: string  = '';
  @Input() value: string | undefined = '';

}
