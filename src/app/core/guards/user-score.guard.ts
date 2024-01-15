import { inject } from '@angular/core';
import { GithubUserService } from '@core/services/github/github-user.service';

const MIN_SCORE = 1.0;

export const userScoreGuard = () => {
  const user = inject(GithubUserService).userSelected();
  return user && user.score >= MIN_SCORE;
};
