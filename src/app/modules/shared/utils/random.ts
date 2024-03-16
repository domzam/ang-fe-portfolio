export class Random {
  /**
   * Returns random number from 1 to max (included)
   * @param max
   * @returns number
   */
  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static getRandomIds(array: string[]): [string, string ] {
    const count = array.length;
    return [
      array[this.getRandomInt(count)],
      array[this.getRandomInt(count)],
    ]
  }
}