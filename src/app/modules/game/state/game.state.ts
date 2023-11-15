import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, combineLatestWith, tap } from "rxjs";
import { BattleResult } from "../models/battle-result.enum";
import { SwapiService } from "../services/swapi.service";
import { GameStateModel } from "./game.model";
import { Random } from "../../../modules/shared/utils/random";
import { GameService } from "../../../modules/game/services/game.service";
import { GameOption } from "../../../modules/game/models/game-option.enum";
import { SnackbarService } from "../../../modules/shared/services/snackbar.service";
import { Game } from "./game.actions";

@State<GameStateModel>({
  name: 'game',
  defaults: {
    isPlaying: false,
    isLoading: false,
    cardsReloading: false,
    characters: [],
    ships: [],
    player: null,
    playerStarships: null,
    computer: null,
    computerStarships: null,
    playerResult: BattleResult.None,
    computerResult: BattleResult.None,
    playerWinCount: 0,
    computerWinCount: 0,
    isFinalWinner: false,
    gameOption: GameOption.People
  }
})
@Injectable()
export class GameState {

  private swapi = inject(SwapiService);
  private gameService = inject(GameService);
  private snackbarService = inject(SnackbarService);

  @Action(Game.IsLoading)
  isLoading(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isLoading: true }));
  }

  @Action(Game.IsLoaded)
  isLoaded(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isLoading: false }));
  }

  @Action(Game.CardsReloading)
  cardsReloading(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, cardsReloading: true }));
  }

  @Action(Game.CardsReloaded)
  cardsLoaded(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, cardsReloading: false }));
  }

  @Action(Game.Start)
  start(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isPlaying: true }));
  }

  @Action(Game.End)
  end(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({ ...state, isPlaying: false }));
  }

  @Action(Game.ResetResults)
  resetResults(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({
      ...state,
      playerResult: BattleResult.None,
      computerResult: BattleResult.None
    }));
  }

  @Action(Game.ResetScors)
  resetScores(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({
      ...state,
      playerWinCount: 0,
      computerWinCount: 0,
      isFinalWinner: false
    }));
  }

  @Action(Game.ResetPlayers)
  resetPlayers(ctx: StateContext<GameStateModel>) {
    ctx.setState((state) => ({
      ...state,
      player: null,
      computer: null,
      playerStarships: null,
      computerStarships: null
    }));
    this.gameService.resetImages();
  }

  @Action(Game.LoadCharacters)
  loadCharacters(ctx: StateContext<GameStateModel>) {
    return this.swapi.getPeople().pipe(
      tap((people) => {
        ctx.setState((state) => ({ ...state, characters: people.results }));
      }),
      tap(() => ctx.dispatch(new Game.IsLoaded()))
    );
  }

  @Action(Game.LoadGame)
  loadGame(ctx: StateContext<GameStateModel>, action: Game.LoadGame) {
    return this.swapi.getPeople().pipe(
      tap((people) => {
        if (action.evokeError) throw new Error();
        ctx.setState((state) => ({ ...state, characters: people.results }));
      }),
      combineLatestWith(this.swapi.getStarships().pipe(
        tap((ships) => { ctx.setState((state) => ({ ...state, ships: ships.results })); })
      )),
      tap(() => ctx.dispatch(new Game.IsLoaded())),
      catchError(() => {
        this.snackbarService.openAsWarning('[Game Loading] Something went wrong');
        return ctx.dispatch(new Game.End());
      })
    );
  }

  @Action(Game.CardsShuffle)
  cardsShuffle(ctx: StateContext<GameStateModel>, action: Game.CardsShuffle) {
    const state = ctx.getState();
    switch (state.gameOption) {
      case GameOption.People:
        return this.swapi.getPerson(Random.getRandomId(state.characters)).pipe(
          tap((person) => {
            if (action.evokeError) throw new Error();
            ctx.setState((state) => ({ ...state, player: person.result }));
          }),
          combineLatestWith(this.swapi.getPerson(Random.getRandomId(state.characters)).pipe(
            tap((person) => ctx.setState((state) => ({ ...state, computer: person.result }))),
          )),
          tap(() => {
            this.gameService.shufflePeopleImages();
            ctx.dispatch([new Game.SetWinner(), new Game.CardsReloaded()]);
          }),
          catchError(() => ctx.dispatch(new Game.CardsShuffleFailed()))
        );
      case GameOption.Starships:
        return this.swapi.getStarship(Random.getRandomId(state.ships)).pipe(
          tap((ship) => {
            if (action.evokeError) throw new Error();
            ctx.setState((state) => ({ ...state, playerStarships: ship.result }));
          }),
          combineLatestWith(this.swapi.getStarship(Random.getRandomId(state.ships)).pipe(
            tap((ship) => ctx.setState((state) => ({ ...state, computerStarships: ship.result }))),
          )),
          tap(() => {
            this.gameService.shuffleShipsImages();
            ctx.dispatch([new Game.SetWinner(), new Game.CardsReloaded()]);
          }),
          catchError(() => ctx.dispatch(new Game.CardsShuffleFailed()))
        );
      default:
        return ctx.dispatch([
          new Game.ResetResults(),
          new Game.ResetPlayers(),
          new Game.CardsReloaded()
        ]);
    }
  }

  @Action(Game.CardsShuffleFailed)
  cardsShuffleFailed(ctx: StateContext<GameStateModel>) {
    this.snackbarService.openAsWarning('[Cards Shuffle] Something went wrong');
    return ctx.dispatch([
      new Game.ResetResults(),
      new Game.ResetPlayers(),
      new Game.CardsReloaded(),
    ]);
  }
  @Action(Game.SetWinner)
  setWinner(ctx: StateContext<GameStateModel>) {
    const state = ctx.getState();
    let playerCommonParam = 0;
    let computerCommonParam = 0;
    switch (state.gameOption) {
      case GameOption.People:
        playerCommonParam = parseFloat(state.player?.properties.mass ?? '') || 0;
        computerCommonParam = parseFloat(state.computer?.properties.mass ?? '') || 0;
        break;
      case GameOption.Starships:
        playerCommonParam = parseFloat(state.playerStarships?.properties.crew ?? '') || 0;
        computerCommonParam = parseFloat(state.computerStarships?.properties.crew ?? '') || 0;
        break;
      default:
        break;
    }
    if (playerCommonParam > computerCommonParam) {
      ctx.setState({
        ...state,
        playerResult: state.playerWinCount === 4 ? BattleResult.FinalWinner : BattleResult.Winner,
        computerResult: BattleResult.Loser,
        playerWinCount: state.playerWinCount + 1,
        isFinalWinner: state.playerWinCount === 4
      });
    } else if (playerCommonParam < computerCommonParam) {
      ctx.setState({
        ...state,
        playerResult: BattleResult.Loser,
        computerResult: state.computerWinCount === 4 ? BattleResult.FinalWinner : BattleResult.Winner,
        computerWinCount: state.computerWinCount + 1,
        isFinalWinner: state.computerWinCount === 4
      });
    } else {
      ctx.setState({
        ...state,
        playerResult: BattleResult.Draw,
        computerResult: BattleResult.Draw
      });
    }
  }

  @Action(Game.UpdateGameOption)
  updateGameOption(ctx: StateContext<GameStateModel>, action: Game.UpdateGameOption) {
    ctx.setState((state) => ({ ...state, gameOption: action.option }));
  }
}