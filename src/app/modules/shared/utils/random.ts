import { People } from "../../../modules/game/models/people/people.model";
import { Starships } from "../../../modules/game/models/starships/starships.model";

export class Random {
  /**
   * Returns random number from 1 to max (included)
   * @param max
   * @returns number
   */
  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  /**
   * Returns random person uid or '' (empty string).
   * @param people
   * @returns string
   */
  static getRandomId(array: People[] | Starships[]): string {
    const count = array?.length;
    if (count) {
      return array[this.getRandomInt(count)].uid;
    }
    return '';
  }
}