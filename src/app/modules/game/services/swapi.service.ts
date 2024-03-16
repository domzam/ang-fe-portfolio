import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonDetailsDto } from '../models/people/person-details-dto.model';
import { PeopleDto } from '../models/people/people-dto.model';
import { StarshipsDto } from '../models/starships/starships-dto.model';
import { StarshipDetailsDto } from '../models/starships/starship-details-dto.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private http = inject(HttpClient);
  private readonly url = 'https://www.swapi.tech/api';

  getPeople(): Observable<PeopleDto> {
    return this.http.get<PeopleDto>(`${this.url}/people?page=1&limit=0`);
  }

  getPerson(id: string): Observable<PersonDetailsDto> {
    return this.http.get<PersonDetailsDto>(`${this.url}/people/${id}`);
  }

  getStarships(): Observable<StarshipsDto> {
    return this.http.get<StarshipsDto>(`${this.url}/starships?page=1&limit=0`);
  }

  getStarship(id: string): Observable<StarshipDetailsDto> {
    return this.http.get<StarshipDetailsDto>(`${this.url}/starships/${id}`);
  }

}
