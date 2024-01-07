CREATE TABLE energytype(
	typeid VARCHAR(5) PRIMARY KEY,
	typename VARCHAR
);
CREATE TABLE energy(
	energyid VARCHAR(10) PRIMARY KEY,
	energyname VARCHAR,
	energy_type VARCHAR(5) REFERENCES energytype(typeid),
	description VARCHAR
);
CREATE TABLE energy_fountain(
	e_fountain_id VARCHAR(5) PRIMARY KEY,
	e_fountain_name VARCHAR,
	ef_location VARCHAR,
	status_id INT REFERENCES status(status_id)
);
CREATE TABLE energy_detail(
	energyid VARCHAR(10) REFERENCES energy(energyid),
	e_fountain_id VARCHAR(10) REFERENCES energy_fountain(e_fountain_id),
	energy_amount FLOAT
);