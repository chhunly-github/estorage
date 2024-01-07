CREATE TABLE status(
	status_id serial PRIMARY KEY,
	status_name VARCHAR,
	description VARCHAR
);

CREATE TABLE exploiting_status(
	status_id serial PRIMARY KEY,
	status_name VARCHAR,
	description VARCHAR
);