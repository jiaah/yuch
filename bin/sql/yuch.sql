CREATE TABLE admin
(
  id SERIAL,
  username CHAR varying(50) NOT NULL UNIQUE,
  password CHAR varying(20) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE users
(
  id SERIAL,
  name CHAR varying(50) NOT NULL UNIQUE,
  username CHAR varying(50) NOT NULL UNIQUE,
  contact_no CHAR varying(20) NOT NULL,
  bank_account_id INT,
  meal_price INT,
  default_lunch_quantity SMALLINT,
  default_init_quantity SMALLINT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

INSERT INTO admin
  (username, password )
VALUES
  ('yuch', 'yuch12')

