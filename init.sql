-- Create database tables
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    author VARCHAR(100),
    type VARCHAR(50),
    poster VARCHAR(255),
    backdrop_poster VARCHAR(255),
    overview TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ratings (
    rating_id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(movie_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(movie_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email, password_hash) VALUES
('demo_user', 'demo@example.com', '$2b$10$example_hashed_password'),
('admin', 'admin@example.com', '$2b$10$example_hashed_password');

INSERT INTO movies (title, release_date, author, type, overview) VALUES
('The Matrix', '1999-03-31', 'Lana Wachowski', 'Action', 'A computer hacker learns about the true nature of reality.'),
('Inception', '2010-07-16', 'Christopher Nolan', 'Sci-Fi', 'A thief enters the dreams of others to steal secrets.'),
('The Godfather', '1972-03-24', 'Francis Ford Coppola', 'Drama', 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.'),
('Pulp Fiction', '1994-10-14', 'Quentin Tarantino', 'Crime', 'The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.'),
('The Dark Knight', '2008-07-18', 'Christopher Nolan', 'Action', 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.'); 