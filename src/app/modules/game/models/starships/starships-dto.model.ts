import { Starships } from "./starships.model";

export interface StarshipsDto {
  message: string;
  total_records: number;
  total_pages: number;
  results: Starships[];
}