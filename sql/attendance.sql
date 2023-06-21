DROP TABLE IF EXISTS attendance;

CREATE TABLE attendance (
  eventId INT,
  userId INT,
  FOREIGN KEY (eventId) REFERENCES events(id),
  FOREIGN KEY (userId) REFERENCES users(id)
  );
  
INSERT INTO attendance VALUES (
	1,
    1
);

INSERT INTO attendance VALUES (
	1,
    2
);

INSERT INTO attendance VALUES (
	1,
    4
);

INSERT INTO attendance VALUES (
	4,
    4
);