DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin TINYINT,
    memberSince DATE NOT NULL,
    renewalDate DATE NOT NULL,
    emergencyContact VARCHAR(255) NOT NULL,
    emergencyNumber CHAR(10) NOT NULL,
    birthday DATE NOT NULL,
    notes VARCHAR(255),
    beltRank VARCHAR(255),
    beltProgress TINYINT,
    profilePic VARCHAR(255)
);

INSERT INTO users VALUES (
    NULL,
    "Sam Svetlik",
    "sam.svetlik@gmail.com",
    "password",
    0,
    "2023-06-20",
    "2023-06-20",
    "Stephany Perez",
    "7205797996",
    "1990-08-17",
    NULL,
    NULL,
    NULL,
    NULL
)