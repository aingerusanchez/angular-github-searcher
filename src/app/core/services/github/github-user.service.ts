import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, combineLatest, filter, finalize, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
// GitHub API
import { GitHubSearchResponse, GitHubUser } from './types';
// Angular Material
import { PageEvent } from '@angular/material/paginator';

@Injectable({ providedIn: 'root' })
export class GithubUserService {
  // Injections
  http = inject(HttpClient);

  // Properties
  #githubUsersApiUrl = 'https://api.github.com/search/users';

  query = signal('');
  setQuery(query: string): void {
    const newQuery = query.trim();
    if (newQuery === this.query()) return;
    this.pagination.update(page => ({ ...page, pageIndex: 0 }));
    this.query.set(query);
  }

  pagination = signal<PageEvent>({ pageIndex: 0, pageSize: 10, length: 0, previousPageIndex: 0 });
  setPagination = (page: PageEvent) => this.pagination.set(page);

  userSelected = signal<GitHubUser | null>(null);
  setUserSelected = (user: GitHubUser) => this.userSelected.set(user);

  isLoading = signal(false);

  #githubUsersData$: Observable<GitHubSearchResponse> = combineLatest([toObservable(this.query), toObservable(this.pagination)]).pipe(
    // Avoid empty queries
    filter(([query, page]: [string, PageEvent]) => query.toString().trim().length > 4),
    // Avoid multiple irrelevant requests. Not needed since button triggers te search action
    // debounceTime(500),
    tap(() => this.isLoading.set(true)),
    switchMap(([query, page]: [string, PageEvent]): Observable<GitHubSearchResponse> => {
      return this.#getUsersByUsername(query, page)
        .pipe(
          catchError(() => {
            this.pagination.update(
              // Restore to previous pagination state
              (prevValue: PageEvent) => ({ ...prevValue, pageIndex: prevValue.previousPageIndex || 0 })
            );
            return EMPTY;
          }),
          finalize(() => this.isLoading.set(false)),
        )
    }),
  );

  githubUsersData = toSignal(this.#githubUsersData$);




  /**
   * The function `getUsersByUsername` retrieves GitHub users based on a username query, with optional
   * pagination parameters.
   * @param {string} query - The query parameter is a string that represents the search query for
   * GitHub users. It is used to search for users based on their username.
   * @param {Pagination} pagination - `{page: number, size: number}`: Pagination options.
   * @returns an Observable of type GitHubSearchResponse.
   */
  #getUsersByUsername(query: string, pagination?: PageEvent): Observable<GitHubSearchResponse> {
    let url = `${this.#githubUsersApiUrl}?q=${query}`;
    // Add pagination query params if provided
    if (pagination) {
      // Avoid searches above 1000
      // if (pagination.pageSize * pagination.pageIndex > 1000) {
      //   throw new Error('Solo se permiten los 1000 primeros resultados para cada búsqueda.');
      // }
      // Increment page index, because GitHub API starts from 1
      url = url.concat(`&page=${pagination.pageIndex + 1}&per_page=${pagination.pageSize}`);
    }
    return this.http.get<GitHubSearchResponse>(url);
  }

}
