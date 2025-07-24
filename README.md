# Astrapay Simple Notes UI

A simple notes application built with Angular (frontend) and Spring Boot (backend).

## Prerequisites

- Node.js & npm
- Angular CLI (optional, for development)
- Java (for backend – Spring Boot)

## Running the Frontend (Angular)

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Start the application**
   ```sh
   npm start
   # or
   npx ng serve
   ```

3. **Open in browser**  
   Visit [http://localhost:4200](http://localhost:4200)

## Backend

> The backend service is available at:  
> [https://github.com/singgihcperdana/astrapay-simple-notes](https://github.com/singgihcperdana/astrapay-simple-notes)

Please refer to that repository for instructions on running and testing the backend.

## Testing

### Frontend (Angular)
```sh
npm test
# or
ng test
```

## Features

- View list of notes
- Add new note
- Delete note
- Notes are sorted with the newest at the top

---

**Notes:**

- Ensure the backend is running before using the frontend.
- If the backend uses a different port, update the API URL in `note.service.ts`.
