CREATE TABLE users (
  id         SERIAL NOT NULL,
  name       VARCHAR(255),
  email      VARCHAR(100),
  CONSTRAINT pk_users PRIMARY KEY (id)
);