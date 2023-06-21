DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    eventDescription VARCHAR(255)
    hostId INT,
    eventTime DATETIME NOT NULL,
    FOREIGN KEY (hostId) REFERENCES users(id)
)

INSERT INTO events VALUES (
    NULL,
    "Introductory Class",
    "Come and see what Goju Ryu Karate is all about in this free introductory lesson!",
    1,
    "2023-06-25 19:00:00",

)