import { Component, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from './note.service';

interface Note {
  id: string;
  content: string;
  type: NoteType;
  createdAt: string;
}

type NoteType = 'PERSONAL' | 'WORK' | 'REMINDER' | 'OTHER';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('astrapay-simple-notes-ui');

  notes = signal<Note[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Form state
  newContent = signal('');
  newType = signal<NoteType>('PERSONAL');
  creating = signal(false);

  noteTypes: NoteType[] = ['PERSONAL', 'WORK', 'REMINDER', 'OTHER'];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.loading.set(true);
    this.error.set(null);
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        const notes = (res.data || []).slice().sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.notes.set(notes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Gagal mengambil data notes');
        this.loading.set(false);
      }
    });
  }

  addNote() {
    if (!this.newContent() || !this.newType()) return;

    this.creating.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    this.noteService.createNote({
      content: this.newContent(),
      type: this.newType()
    }).subscribe({
      next: (res: any) => {
        this.newContent.set('');
        this.newType.set('PERSONAL');
        this.creating.set(false);
        // Tambahkan note baru ke urutan teratas
        const newNote = res.data;
        if (newNote) {
          this.notes.set([newNote, ...this.notes()]);
        } else {
          this.loadNotes();
        }

        this.successMessage.set('Catatan berhasil ditambahkan!');
        setTimeout(() => this.successMessage.set(null), 3000); // hide after 3s
      },
      error: () => {
        this.error.set('Gagal menambah note');
        this.creating.set(false);
      }
    });
  }

  removeNote(id: string) {
    this.error.set(null);
    this.successMessage.set(null);

    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.successMessage.set('Catatan berhasil dihapus!');
        this.loadNotes();
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: () => {
        this.error.set('Gagal menghapus note');
      }
    });
  }

  trackById(index: number, note: Note) {
    return note.id;
  }
}
