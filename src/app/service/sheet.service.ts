import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sheet } from '../../app/models/sheet.model';
import { Observable } from 'rxjs';
export interface RegistroPlanilha {
  Nome: string;
  Valor?: string;
  Telefone?: string;
}


@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor(private http: HttpClient) { }

  createSheet(Nome: string, Valor: string, Telefone: string = ''): Observable<any> {
    return this.http.post(`${environment.CONNECTION_URL}`, {
      Nome,
      Valor,
      Telefone
    });
  }
  

listSheet(): Observable<RegistroPlanilha[]> {
  return this.http.get<RegistroPlanilha[]>(`${environment.CONNECTION_URL}`);
}

  deleteSheet(id: number) {
    return this.http.delete(`${environment.CONNECTION_URL}/${id}`);
  }

  getSheetDataById(id: number) {
    return this.http.get(`${environment.CONNECTION_URL}/${id}`);
  }

  updateSheet(id: number, Nome: string, Status: string): Observable<Sheet> {
    return this.http.put<Sheet>(`${environment.CONNECTION_URL}/${id}`, {
      Nome,
      Status,
    });
  }
}
