import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Confirmacao {
  name: string;
  willAttend: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoPresencaService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbxx8aji4NsdkGx4Lry0WOAhIgbDBue6_wkQeaiu4eJu/dev';

  constructor(private http: HttpClient) {}

  submitConfirmation(confirmation: Confirmacao): Observable<any> {
    const params = new URLSearchParams({
      name: confirmation.name,
      willAttend: confirmation.willAttend.toString(),
      timestamp: confirmation.timestamp.toISOString()
    });

    return this.http.get(`${this.apiUrl}?${params.toString()}`, { responseType: 'text' }).pipe(
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
