DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS parks CASCADE;
DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo TEXT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE parks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    street_address TEXT NOT NULL,
    place_id TEXT,
    google_rating DECIMAL(2,1),
    dog_friendly BOOLEAN DEFAULT TRUE,
    playground BOOLEAN DEFAULT TRUE,
    restrooms BOOLEAN DEFAULT TRUE
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    park_id INT REFERENCES parks(id),
    user_id INT REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT
);