-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publishers;
DROP TABLE IF EXISTS authors;

CREATE TABLE publishers(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL
);

INSERT INTO 
    publishers (name, city, state, country)
VALUES 
    ('Pindy', 'Prescott', 'AZ', 'USA');

CREATE TABLE authors(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    pob TEXT NOT NULL
);

INSERT INTO
    authors (name, dob, pob)
VALUES
    ('bob', '6/15/2001', 'Prescott');