import { PersonDetailsDto } from "../models/people/person-details-dto.model";
import { PersonDetails } from "../models/people/person-details.model";

export class PersonMapper {
  static map(person: PersonDetailsDto): PersonDetails {
    return {
      birthYear: person.result.properties.birth_year,
      created: person.result.properties.created,
      description: person.result.description,
      height: person.result.properties.height,
      mass: person.result.properties.mass,
      hairColor: person.result.properties.hair_color,
      skinColor: person.result.properties.skin_color,
      eyeColor: person.result.properties.eye_color,
      gender: person.result.properties.gender,
      name: person.result.properties.name,
      homeworld: person.result.properties.homeworld,
      uid: person.result.uid
    }
  }
}