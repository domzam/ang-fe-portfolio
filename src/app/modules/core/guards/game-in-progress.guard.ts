import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { SnackbarService } from '../../../modules/shared/services/snackbar.service';
import { GameSelectors } from '../../game/state/game.selectors';


export const gameInProgressGuard: CanDeactivateFn<boolean> = (component, currentRoute, currentState, nextState) => {
  const store = inject(Store);
  const snackbarService = inject(SnackbarService);
  const isPlaying = store.selectSnapshot<boolean>(GameSelectors.isPlaying);
  if (isPlaying) snackbarService.openAsWarning("Game is in-progress");
  return !isPlaying ?? true;
};
