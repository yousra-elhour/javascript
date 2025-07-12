# Movie & Todo App with Docker

A full-stack application with a Node.js/Express backend, React frontend, and PostgreSQL database, all containerized with Docker.

## Features

- **Backend (Node.js/Express)**:

  - RESTful API for movies, todos, users, ratings, and comments
  - JWT authentication
  - PostgreSQL database integration
  - File upload capabilities
  - Comprehensive logging

- **Frontend (React PWA)**:

  - Modern React application with hooks
  - Responsive design
  - Movie browsing and management
  - Todo list functionality
  - API integration with axios

- **Database (PostgreSQL)**:
  - Fully containerized PostgreSQL database
  - Pre-populated with sample data
  - Automatic table creation on startup

## Prerequisites

- Docker and Docker Compose installed on your machine
- No need to install Node.js, npm, or PostgreSQL locally!

## Quick Start

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd javscript
   ```

2. **Create environment file**:

   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Start the application**:

   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - PostgreSQL: localhost:5432

## Services

### Frontend (React PWA)

- **Port**: 3000
- **Features**: Movie browsing, todo management, responsive design

### Backend (Node.js/Express)

- **Port**: 8080
- **API Endpoints**:
  - `/movies` - Movie CRUD operations
  - `/todos` - Todo management
  - `/users` - User authentication
  - `/ratings` - Movie ratings
  - `/comments` - Movie comments

### Database (PostgreSQL)

- **Port**: 5432
- **Database**: `movie_app`
- **User**: `app_user`
- **Password**: `app_password`

## API Endpoints

### Movies

- `GET /movies` - Get all movies (grouped by category)
- `GET /movies/:id` - Get movie by ID
- `POST /movies` - Add new movie
- `GET /movies?category=<category>` - Get movies by category

### Todos

- `GET /todos` - Get all todos
- `POST /todos` - Add new todo
- `GET /todos/:index` - Get todo by index
- `PUT /todos/:index` - Update todo
- `DELETE /todos/:index` - Delete todo

### Users

- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/profile` - Get user profile (requires auth)

## Development

### Running in Development Mode

```bash
# Start all services
docker-compose up

# Start with live reload (rebuild on changes)
docker-compose up --build

# Run specific service
docker-compose up frontend
docker-compose up backend
docker-compose up postgres
```

### Accessing Logs

```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs postgres
```

### Database Management

```bash
# Access PostgreSQL directly
docker exec -it postgres_db psql -U app_user -d movie_app

# Reset database
docker-compose down -v  # Remove volumes
docker-compose up --build
```

## Project Structure

```
javscript/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # API controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── boot/               # Application setup
│   └── Dockerfile          # Backend container config
├── pwa/                    # React PWA frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/           # API service layer
│   │   └── App.jsx        # Main app component
│   └── Dockerfile         # Frontend container config
├── docker-compose.yml     # Docker orchestration
├── init.sql              # Database initialization
└── README.md             # This file
```

## Environment Variables

### Backend (.env)

```
DB_HOST=postgres
DB_USER=app_user
DB_PASSWORD=app_password
DB_NAME=movie_app
DB_PORT=5432
JWT_SECRET=your_jwt_secret_here
```

### Frontend (docker-compose.yml)

```
REACT_APP_API_URL=http://localhost:8080
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: If ports 3000, 8080, or 5432 are in use, stop the conflicting services or modify the ports in docker-compose.yml

2. **Database connection issues**: Ensure PostgreSQL container is healthy before backend starts

   ```bash
   docker-compose logs postgres
   ```

3. **Frontend can't connect to backend**: Check if REACT_APP_API_URL is set correctly

4. **CORS issues**: Backend is configured to allow all origins in development

### Reset Everything

```bash
# Stop all containers and remove volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild from scratch
docker-compose up --build
```

## Production Deployment

For production deployment:

1. Update environment variables with secure values
2. Use environment-specific docker-compose files
3. Set up proper SSL certificates
4. Configure reverse proxy (nginx)
5. Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

This project is licensed under the MIT License.
