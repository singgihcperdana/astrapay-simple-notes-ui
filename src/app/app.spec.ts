import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { NoteService } from './note.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

type NoteType = 'PERSONAL' | 'WORK' | 'REMINDER' | 'OTHER';

describe('App Component', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let noteServiceSpy: jasmine.SpyObj<NoteService>;

  beforeEach(() => {
    noteServiceSpy = jasmine.createSpyObj('NoteService', ['getNotes', 'createNote', 'deleteNote']);
    TestBed.configureTestingModule({
      imports: [CommonModule, App],
      providers: [{ provide: NoteService, useValue: noteServiceSpy }]
    });
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should load notes in descending order', () => {
    const notes = [
      { id: '1', content: 'A', type: 'PERSONAL' as NoteType, createdAt: '2023-01-01T10:00:00Z' },
      { id: '2', content: 'B', type: 'WORK' as NoteType, createdAt: '2023-01-01T12:00:00Z' }
    ];
    noteServiceSpy.getNotes.and.returnValue(of({ data: notes }));
    component.loadNotes();
    expect(component.notes()[0].id).toBe('2'); // Terbaru di atas
    expect(component.notes()[1].id).toBe('1');
  });

  it('should add new note to the top', () => {
    const oldNotes = [
      { id: '1', content: 'A', type: 'PERSONAL' as NoteType, createdAt: '2023-01-01T10:00:00Z' }
    ];
    component.notes.set(oldNotes);
    const newNote = { id: '2', content: 'Baru', type: 'WORK' as NoteType, createdAt: '2023-01-02T10:00:00Z' };
    noteServiceSpy.createNote.and.returnValue(of({ data: newNote }));
    component.newContent.set('Baru');
    component.newType.set('WORK');
    component.addNote();
    expect(component.notes()[0]).toEqual(newNote);
  });

  it('should call removeNote and reload notes', () => {
    noteServiceSpy.deleteNote.and.returnValue(of({}));
    spyOn(component, 'loadNotes');
    component.removeNote('1');
    expect(noteServiceSpy.deleteNote).toHaveBeenCalledWith('1');
    expect(component.loadNotes).toHaveBeenCalled();
  });
});
