import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Environment
import { environment as env } from '@env/environment';

/**
 * The AuthInterceptorService class is responsible for intercepting HTTP requests and adding an
 * Authorization header with a token for authentication.
*/
@Injectable()
export class AuthInterceptorService {
  private token: string = env.GITHUB_TOKEN;


  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.token) {
      console.warn('No se ha provisto un token de GitHub. Es recomendable añadirlo para poder realizar más peticiones.');
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        }
      });
    }

    return next.handle(request);
  }
}
