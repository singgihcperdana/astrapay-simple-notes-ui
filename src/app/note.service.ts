import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private baseUrl = 'http://localhost:8080/notes';

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get(this.baseUrl);
  }

  createNote(note: { content: string; type: string }) {
    return this.http.post(this.baseUrl, note);
  }

  deleteNote(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
} 