import { Component, Input } from '@angular/core';
import { BattleResult } from '../../../../modules/game/models/battle-result.enum';
import { StarshipDetails } from '../../../../modules/game/models/starships/starship-details.model';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent {

  @Input({ required: false }) imagePath: string = '';
  @Input({ required: false }) isLoading: boolean = false;
  @Input({ required: false }) starship: StarshipDetails | null = null;
  @Input({ required: false }) battleResult: BattleResult | null = BattleResult.None;

  get image() { return this.imagePath || 'assets/img/game/starships/none.jpg'; }
  get name() { return this.starship?.properties.name || '#####'; }
  get description() { return this.starship?.description || '#####'; }
  get model() { return this.starship?.properties.model || '#'; }
  get starshipClass() { return this.starship?.properties.starship_class || '#'; }
  get manufacturer() { return this.starship?.properties.manufacturer || '#'; }
  get costInCredits() { return this.starship?.properties.cost_in_credits || '#'; }
  get length() { return this.starship?.properties.length || '#'; }
  get crew() { return this.starship?.properties.crew || '#'; }
  get passengers() { return this.starship?.properties.passengers || '#'; }
  get maxAtmospheringSpeed() { return this.starship?.properties.max_atmosphering_speed || '#'; }
  get hyperdriveRating() { return this.starship?.properties.hyperdrive_rating || '#'; }
  get mglt() { return this.starship?.properties.MGLT || '#'; }
  get cargoCapacity() { return this.starship?.properties.cargo_capacity || '#'; }
  get consumables() { return this.starship?.properties.consumables || '#'; }

}
