import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoteService } from './note.service';

const BASE_URL = 'http://localhost:8080/notes';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });
    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch notes', () => {
    const dummyNotes = [{ id: '1', content: 'Test', type: 'PERSONAL', createdAt: '2023-01-01T00:00:00Z' }];
    service.getNotes().subscribe((res: any) => {
      expect(res).toEqual(dummyNotes);
    });
    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNotes);
  });

  it('should create note', () => {
    const newNote = { content: 'Baru', type: 'WORK' };
    const created = { id: '2', content: 'Baru', type: 'WORK', createdAt: '2023-01-02T00:00:00Z' };
    service.createNote(newNote).subscribe((res: any) => {
      expect(res).toEqual(created);
    });
    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNote);
    req.flush(created);
  });

  it('should delete note', () => {
    const id = '1';
    service.deleteNote(id).subscribe((res: any) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
}); 