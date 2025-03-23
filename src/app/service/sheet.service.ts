import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sheet } from '../../app/models/sheet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor(private http: HttpClient) {}

  createSheet(Nome: string, Status: string): Observable<Sheet> {
    return this.http.post<Sheet>(`${environment.CONNECTION_URL}`, {
      Nome,
      Status,
    });
  }

  listSheet() {
    return this.http.get(`${environment.CONNECTION_URL}`);
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
