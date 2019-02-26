CREATE TABLE users
(
  id SERIAL,
  name CHAR varying(50) NOT NULL,
  assigned_id CHAR varying(50) NOT NULL,
  contact CHAR varying(20) NOT NULL,
  bank_account_id INT NOT NULL,
  meal_price INT NOT NULL,
  lunch_init_quantity SMALLINT,
  dinner_init_quantity SMALLINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);
