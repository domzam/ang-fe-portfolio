import { StarshipDetailsDto } from "../models/starships/starship-details-dto.model";
import { StarshipDetails } from "../models/starships/starship-details.model";

export class StarshipMapper {
  static map(person: StarshipDetailsDto): StarshipDetails {
    return {
      model: person.result.properties.model,
      starshipClass: person.result.properties.starship_class,
      manufacturer: person.result.properties.manufacturer,
      costInCredits: person.result.properties.cost_in_credits,
      length: person.result.properties.length,
      crew: person.result.properties.crew,
      passengers: person.result.properties.passengers,
      name: person.result.properties.name,
      maxAtmospheringSpeed: person.result.properties.max_atmosphering_speed,
      hyperdriveRating: person.result.properties.hyperdrive_rating,
      mglt: person.result.properties.MGLT,
      cargoCapacity: person.result.properties.cargo_capacity,
      consumables: person.result.properties.consumables,
      created: person.result.properties.created,
      edited: person.result.properties.edited,
      url: person.result.properties.url,
      description: person.result.description,
      uid: person.result.uid
    }
  }
}