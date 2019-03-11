DROP DATABASE IF EXISTS yuchdb;
CREATE DATABASE yuchdb;

\c yuchdb;

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
  id uuid UNIQUE DEFAULT uuid_generate_v4 (),
  name CHAR varying(100) NOT NULL UNIQUE,
  username CHAR varying(100) NOT NULL UNIQUE,
  contact_no CHAR varying(100) NOT NULL,
  password CHAR varying(100) NOT NULL,
  bank_account_id INT,
  meal_price INT,
  default_lunch_quantity SMALLINT,
  default_init_quantity SMALLINT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

INSERT INTO users
  (name, username, contact_no, password )
VALUES
  ('yuch', 'yuch', '01033060057', '01033060057'),
  ('hundea', 'hundea', '00', '00')

