export const environment = {
  production: true,
  GITHUB_TOKEN: import.meta.env.NG_APP_GITHUB_TOKEN ?? '',
  USER_MIN_SCORE: 1.0,
};
