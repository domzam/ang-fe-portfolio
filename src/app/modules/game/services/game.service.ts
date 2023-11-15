import { Injectable } from "@angular/core";
import { Random } from "../../shared/utils/random";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly peopleImagesCount = 10;
  private readonly starshipsImagesCount = 5;

  playerImage: string = '';
  computerImage: string = '';

  shufflePeopleImages() {
    this.playerImage = `assets/img/game/people/${Random.getRandomInt(this.peopleImagesCount)}.jpg`;
    this.computerImage = `assets/img/game/people/${Random.getRandomInt(this.peopleImagesCount)}.jpg`;
  }

  shuffleShipsImages() {
    this.playerImage = `assets/img/game/starships/${Random.getRandomInt(this.starshipsImagesCount)}.jpg`;
    this.computerImage = `assets/img/game/starships/${Random.getRandomInt(this.starshipsImagesCount)}.jpg`;
  }

  resetImages() {
    this.playerImage = '';
    this.computerImage = '';
  }

}