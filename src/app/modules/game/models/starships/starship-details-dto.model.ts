export interface StarshipDetailsDto {
  message: string;
  result: {
    properties: {
      model: string;
      starship_class: string;
      manufacturer: string;
      cost_in_credits: string;
      length: string;
      crew: string;
      passengers: string;
      name: string;
      max_atmosphering_speed: string;
      hyperdrive_rating: string;
      MGLT: string;
      cargo_capacity: string;
      consumables: string;
      created: string;
      edited: string;
      url: string;
    };
    description: string;
    uid: string;
  }
}