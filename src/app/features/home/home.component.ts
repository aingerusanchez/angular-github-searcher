import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Components
import { SearchBarComponent, UsersTableComponent, EmptyComponent } from '@shared/components';
// Services
import { GithubUserService } from '@core/services/github/github-user.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
// Types
import { PageEvent } from '@angular/material/paginator';
import { GitHubUser } from '@core/services/github/types';
// Environment
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    UsersTableComponent,
    EmptyComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // Inject services
  githubService = inject(GithubUserService);
  errorHandlerService = inject(ErrorHandlerService);

  // Properties
  query = this.githubService.query;
  pagination = this.githubService.pagination;
  githubUsersData = this.githubService.githubUsersData;
  isLoadingData = this.githubService.isLoading;

  onTypeGithubUsername = (usernameQuery: string) => this.githubService.setQuery(usernameQuery);

  onPaginationChange = (pageEvent: PageEvent) => this.githubService.setPagination(pageEvent);

  onUserSelected = (user: GitHubUser) => {
    this.githubService.setUserSelected(user);
    if (user.score >= env.USER_MIN_SCORE) {
      window.open(user.html_url, "_blank");
    } else {
      this.errorHandlerService.showError(`La puntuación del usuario ${user.login}, (${user.score} punto), es menor de la definida para poder navegar al perfil (${env.USER_MIN_SCORE} punto).`);
    }
  }
}
