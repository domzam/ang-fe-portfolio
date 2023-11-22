import { People } from "./people.model";

export interface PeopleDto {
  message: string;
  results: People[];
}