import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { Observable, throwError } from 'rxjs';

const GitHubAPIErrorCodes = {
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Sólo están disponibles los primeros 1.000 resultados de cada búsqueda',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  Default: 'Ha ocurrido un error :(',
}

/**
 * The HttpErrorInterceptor class for intercepting HTTP requests and handles HTTP errors.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  #errorHandler = inject(ErrorHandlerService);
  // readonly #MAX_RETRIES = 3;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.#handleError(err);
        return throwError(() => err);
      }),
    );
  }

  #handleError(err: HttpErrorResponse): void {
    let errorMessage = err?.error?.message || err?.message || 'Ha ocurrido un error :(';
    if (err.url?.includes('api.github')) {
      errorMessage = getGitHubAPIErrorCode(err.status);
      this.#errorHandler.showError(errorMessage, 'Más info').onAction()
        .pipe(first())
        .subscribe(() => {
          window.open(err.error.documentation_url, '_blank');
        });
    } else {
      this.#errorHandler.showError(errorMessage);
    }
    console.error('HTTP Error:', errorMessage);
  }
}

function getGitHubAPIErrorCode(value: any): string {
  return Object.keys(GitHubAPIErrorCodes).includes(value.toString()) ?
    GitHubAPIErrorCodes[value as keyof typeof GitHubAPIErrorCodes]
    : GitHubAPIErrorCodes.Default;
}


