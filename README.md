# Astrapay Simple Notes UI

Aplikasi catatan sederhana menggunakan Angular (frontend) dan Spring Boot (backend).

## Prasyarat
- Node.js & npm
- Angular CLI (opsional, untuk development)
- Java (untuk backend Spring Boot)

## Menjalankan Frontend (Angular)

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Jalankan aplikasi**
   ```sh
   npm start
   # atau
   npx ng serve
   ```
3. **Buka di browser**
   [http://localhost:4200](http://localhost:4200)

## Menjalankan Backend (Spring Boot)

1. Masuk ke folder backend (misal: `astrapay-notes-backend`)
2. Jalankan aplikasi Spring Boot:
   ```sh
   ./mvnw spring-boot:run
   # atau
   mvn spring-boot:run
   # atau
   ./gradlew bootRun
   ```
3. Backend berjalan di [http://localhost:8080](http://localhost:8080)

## Testing

### Frontend (Angular)
```sh
npm test
# atau
ng test
```

### Backend (Spring Boot)
Jalankan test dengan Maven/Gradle sesuai project backend.

## Fitur
- Lihat daftar notes
- Tambah note baru
- Hapus note
- Notes otomatis terurut terbaru di atas

---

**Catatan:**
- Pastikan backend sudah berjalan sebelum menggunakan aplikasi frontend.
- Jika port backend berbeda, update URL di `note.service.ts`.
