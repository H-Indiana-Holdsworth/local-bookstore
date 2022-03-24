-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publishers  CASCADE;
DROP TABLE IF EXISTS authors  CASCADE;
DROP TABLE IF EXISTS reviewers  CASCADE;
DROP TABLE IF EXISTS reviews  CASCADE;
DROP TABLE IF EXISTS books CASCADE ;
DROP TABLE IF EXISTS authors_books CASCADE ;

CREATE TABLE publishers(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
);

CREATE TABLE authors(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    pob TEXT
);

CREATE TABLE reviewers(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);


CREATE TABLE books(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    publisher_id BIGINT REFERENCES publishers(id),
    released INT NOT NULL
);

CREATE TABLE reviews(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL,
    review VARCHAR NOT NULL,
    reviewer_id BIGINT REFERENCES reviewers(id),
    book_id BIGINT REFERENCES books(id)
);

CREATE TABLE authors_books(
    author_id BIGINT REFERENCES authors(id),
    books_id BIGINT REFERENCES books(id)
);









INSERT INTO 
    publishers (name, city, state, country)
VALUES 
    ('Pindy', 'Prescott', 'AZ', 'USA');

INSERT INTO
    authors (name, dob, pob)
VALUES
    ('bob', '6/15/2001', 'Prescott');

INSERT INTO 
    reviewers (name, company)
VALUES
    ('Dobby', 'Pindy LLC');

INSERT INTO
    books (title, publisher_id, released)
VALUES
    ('cool book', '1', 2001 );

INSERT INTO
    reviews (rating, review, reviewer_id, book_id)
VALUES
    (3, 'Good', '1', '1');



