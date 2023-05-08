CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, last_name, first_name, password)
VALUES
  ('johndoe@gmail.com', 'Doe', 'John', 'password123'),
  ('janedoe@yahoo.com', 'Doe', 'Jane', 'password456'),
  ('bobsmith@hotmail.com', 'Smith', 'Bob', 'password789'),
  ('annajones@gmail.com', 'Jones', 'Anna', 'password111'),
  ('mikesmith@yahoo.com', 'Smith', 'Mike', 'password222'),
  ('katiebrown@gmail.com', 'Brown', 'Katie', 'password333'),
  ('tomjones@yahoo.com', 'Jones', 'Tom', 'password444'),
  ('laurasmith@hotmail.com', 'Smith', 'Laura', 'password555'),
  ('peterwhite@gmail.com', 'White', 'Peter', 'password666'),
  ('sarahgreen@yahoo.com', 'Green', 'Sarah', 'password777'),
  ('davidblack@hotmail.com', 'Black', 'David', 'password888'),
  ('jennifermartin@gmail.com', 'Martin', 'Jennifer', 'password999'),
  ('chrisadams@yahoo.com', 'Adams', 'Chris', 'password000'),
  ('juliesmith@hotmail.com', 'Smith', 'Julie', 'password111'),
  ('jimmybrown@gmail.com', 'Brown', 'Jimmy', 'password222'),
  ('alicewhite@yahoo.com', 'White', 'Alice', 'password333'),
  ('davidsmith@hotmail.com', 'Smith', 'David', 'password444'),
  ('amandabrown@gmail.com', 'Brown', 'Amanda', 'password555'),
  ('mattjohnson@yahoo.com', 'Johnson', 'Matt', 'password666'),
  ('sophiagreen@gmail.com', 'Green', 'Sophia', 'password777');