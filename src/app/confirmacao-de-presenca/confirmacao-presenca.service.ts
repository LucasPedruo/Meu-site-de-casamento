import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoPresencaService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbzZjUvTX0yy8XorhtQQKxy84AUYQ78ZzRgSKwtC0GG4cHZAr6EDV6E7HDGDu8YjrTtINg/exec';

  constructor(private http: HttpClient) {}

  submitConfirmation(confirmation: { name: string, willAttend: boolean, timestamp: Date }): Observable<any> {
    const body = {
      name: confirmation.name,
      willAttend: confirmation.willAttend,
      timestamp: confirmation.timestamp.toISOString()
    };

    return this.http.post(this.apiUrl, body, { responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (error) {
          console.error('Erro ao converter resposta para JSON:', response);
          return { success: false, message: 'Erro inesperado na resposta do servidor.' };
        }
      })
    );
  }
}