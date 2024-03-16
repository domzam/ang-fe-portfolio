import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, combineLatestWith, map, tap } from "rxjs";
import { SwapiService } from "../services/swapi.service";
import { GameStateModel } from "./game.model";
import { Random } from "../../../modules/shared/utils/random";
import { GameOption } from "../enums/game-option.enum";
import { Game } from "./game.actions";
import { PersonMapper } from "../mappers/person.mapper";
import { Winner } from "../enums/winner.enum";
import { PersonDetails } from "../models/people/person-details.model";
import { StarshipDetails } from "../models/starships/starship-details.model";
import { StarshipMapper } from "../mappers/starship.mapper";
import { SnackbarService } from "../../shared/services/snackbar.service";

@State<GameStateModel>({
  name: 'game',
  defaults: {
    isPlaying: false,
    isCharactersLoading: false,
    isCharacterDetailsLoading: false,

    ids: [],
    player: null,
    playerScore: 0,
    computer: null,
    computerScore: 0,
    winner: Winner.None,

    gameOption: GameOption.People,
    scoreLimit: 5
  }
})
@Injectable()
export class GameState {

  private swapi = inject(SwapiService);
  private snackbarService = inject(SnackbarService);

  @Action(Game.ClearCharactersList)
  clearCharactersList(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, ids: [] }));
  }

  @Action(Game.CharactersLoading)
  charactersLoading(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isCharactersLoading: true }));
  }

  @Action(Game.CharactersLoaded)
  charactersLoaded(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isCharactersLoading: false }));
  }

  @Action(Game.Start)
  start(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isPlaying: true }));
    return ctx.dispatch([
      new Game.CharacterDetailsLoading(),
      new Game.CardsShuffle()
    ]);
  }

  @Action(Game.End)
  end(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isPlaying: false }));
    return ctx.dispatch(new Game.ResetScore())
  }

  @Action(Game.PlayAgain)
  playAgain(ctx: StateContext<GameStateModel>) {
    return ctx.dispatch([
      new Game.ResetScore(),
      new Game.CardsShuffle()
    ]);
  }

  @Action(Game.CharacterDetailsLoading)
  characterDetailsLoading(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isCharacterDetailsLoading: true, winner: Winner.None }));
  }

  @Action(Game.CharacterDetailsLoaded)
  cardsLoaded(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isCharacterDetailsLoading: false }));
  }

  @Action(Game.LoadPeopleList)
  loadPeopleList(ctx: StateContext<GameStateModel>) {
    ctx.dispatch(new Game.CharactersLoading());
    return this.swapi.getPeople().pipe(
      map((response) => response.results),
      map((people) => people.map(p => p.uid)),
      tap((ids) => {
        ctx.setState((state) => ({ ...state, ids }));
        ctx.dispatch(new Game.CharactersLoaded())
        if (!ids.length) ctx.dispatch(new Game.EmptyCharactersListError());
      }),
      catchError(() => ctx.dispatch(new Game.LoadPeopleListFailed()))
    );
  }

  @Action(Game.LoadPeopleListFailed)
  loadPeopleListFailed(ctx: StateContext<GameStateModel>) {
    this.snackbarService.openAsWarning('Load people failed');
    return ctx.dispatch([
      new Game.ClearCharactersList(),
      new Game.CharactersLoaded()
    ]);
  }

  @Action(Game.LoadStarshipsList)
  loadStarshipsList(ctx: StateContext<GameStateModel>) {
    ctx.dispatch(new Game.CharactersLoading());
    return this.swapi.getStarships().pipe(
      map((response) => response.results),
      map((starships) => starships.map(s => s.uid)),
      tap((ids) => {
        ctx.setState((state) => ({ ...state, ids }));
        ctx.dispatch(new Game.CharactersLoaded())
        if (!ids.length) ctx.dispatch(new Game.EmptyCharactersListError());
      }),
      catchError(() => ctx.dispatch(new Game.LoadStarshipsListFailed()))
    );
  }

  @Action(Game.LoadStarshipsListFailed)
  loadStarshipsListFailed(ctx: StateContext<GameStateModel>) {
    this.snackbarService.openAsWarning('Load starships failed');
    return ctx.dispatch([
      new Game.ClearCharactersList(),
      new Game.CharactersLoaded()
    ]);
  }

  @Action(Game.EmptyCharactersListError)
  emptyCharactersListError(ctx: StateContext<GameStateModel>) {
    this.snackbarService.openAsWarning('Empty characters list');
    return ctx.dispatch([]);
  }

  @Action(Game.CardsShuffle)
  cardsShuffle(ctx: StateContext<GameStateModel>) {
    const state = ctx.getState();
    const [playerId, computerId] = Random.getRandomIds(state.ids);
    ctx.dispatch(new Game.CharacterDetailsLoading())

    switch (state.gameOption) {
      case GameOption.People:
        return this.shufflePersons(ctx, playerId, computerId).pipe(
          tap(() => {
            ctx.dispatch([
              new Game.CharacterDetailsLoaded(),
              new Game.UpdateScore()
            ]);
          }),
          catchError(() => ctx.dispatch(new Game.CardsShuffleFailed()))
        );
      case GameOption.Starships:
        return this.shuffleStarships(ctx, playerId, computerId).pipe(
          tap(() => {
            ctx.dispatch([
              new Game.CharacterDetailsLoaded(),
              new Game.UpdateScore()
            ]);
          }),
          catchError(() => ctx.dispatch(new Game.CardsShuffleFailed()))
        );
      default:
        return ctx.dispatch(new Game.CardsShuffleFailed());
    }
  }

  @Action(Game.CardsShuffleFailed)
  cardsShuffleFailed(ctx: StateContext<GameStateModel>) {
    this.snackbarService.openAsWarning('Load character details failed');
    ctx.setState((state) => ({...state, player: null, computer: null}));
    return ctx.dispatch(new Game.CharacterDetailsLoaded());
  }

  @Action(Game.UpdateScore)
  updateScore(ctx: StateContext<GameStateModel>) {
    const state = ctx.getState();
    const gameOption = state.gameOption;
    const playerCommon = this.getCommonPropertyValue(state.player, gameOption);
    const computerCommon = this.getCommonPropertyValue(state.computer, gameOption);
    let winner = Winner.None;
    if (playerCommon > computerCommon) {
      state.playerScore++;
      winner = Winner.Player;
    }
    else if (playerCommon < computerCommon) {
      state.computerScore++;
      winner = Winner.Computer;
    }
    ctx.setState((currentState) => ({
      ...currentState,
      playerScore: state.playerScore,
      computerScore: state.computerScore,
      winner: winner
    }));
  }

  @Action(Game.ResetScore)
  resetScore(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({
      ...state,
      winner: Winner.None,
      playerScore: 0,
      computerScore: 0
    }));
  }

  @Action(Game.UpdateGameOption)
  updateGameOption(ctx: StateContext<GameStateModel>, action: Game.UpdateGameOption) {
    ctx.setState((state) => ({
      ...state,
      gameOption: action.option,
      ids: [],
      isCharactersLoading: true
    }));

    switch (action.option) {
      case GameOption.People:
        return ctx.dispatch(new Game.LoadPeopleList());
      case GameOption.Starships:
        return ctx.dispatch(new Game.LoadStarshipsList());
      default:
        return ctx.dispatch(new Game.EmptyCharactersListError());
    }
  }

  private shufflePersons(ctx: StateContext<GameStateModel>, playerId: string, computerId: string) {
    return this.swapi.getPerson(playerId).pipe(
      tap((person) => {
        ctx.setState((state) => ({
          ...state,
          player: PersonMapper.map(person)
        }));
      }),
      combineLatestWith(this.swapi.getPerson(computerId).pipe(
        tap((person) => {
          ctx.setState((state) => ({
            ...state,
            computer: PersonMapper.map(person)
          }));
        })
      ))
    )
  }

  private shuffleStarships(ctx: StateContext<GameStateModel>, playerId: string, computerId: string) {
    return this.swapi.getStarship(playerId).pipe(
      tap((starship) => {
        ctx.setState((state) => ({
          ...state,
          player: StarshipMapper.map(starship)
        }));
      }),
      combineLatestWith(this.swapi.getStarship(computerId).pipe(
        tap((starship) => {
          ctx.setState((state) => ({
            ...state,
            computer: StarshipMapper.map(starship)
          }));
        })
      ))
    )
  }

  private getCommonPropertyValue(player: PersonDetails | StarshipDetails | null, gameOption: GameOption): number {
    switch (gameOption) {
      case GameOption.People:
        return parseFloat((player as PersonDetails)?.mass ?? '') || 0;
      case GameOption.Starships:
        return parseFloat((player as StarshipDetails)?.crew ?? '') || 0;
      default:
        return 0;
    }
  }
}