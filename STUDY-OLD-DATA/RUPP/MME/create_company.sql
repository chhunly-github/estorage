CREATE TABLE mining_company(
	mcid VARCHAR(5) PRIMARY KEY,
	mc_name VARCHAR,
	mc_location VARCHAR,
	created_date DATE
);

CREATE TABLE exploiting_mine(
	emid serial PRIMARY KEY,
	mcid VARCHAR(5) REFERENCES mining_company(mcid),
	mfid VARCHAR(5) REFERENCES mine_fountain(m_fountain_id),
	status_id INT REFERENCES exploiting_status(status_id),
	started_date DATE,
	stopped_date DATE
);

CREATE TABLE em_detail(
	mineid VARCHAR(10) REFERENCES mine(mineid),
	emid INT REFERENCES exploiting_mine(emid),
	volume FLOAT,
	weight FLOAT
);
	

CREATE TABLE exploiting_energy(
	eeid serial PRIMARY KEY,
	mcid VARCHAR(5) REFERENCES mining_company(mcid),
	efid VARCHAR(5) REFERENCES mine_fountain(m_fountain_id),
	status_id INT REFERENCES exploiting_status(status_id),
	started_date DATE,
	stopped_date DATE
);

CREATE TABLE ee_detail(
	mineid VARCHAR(10) REFERENCES mine(mineid),
	eeid INT REFERENCES exploiting_mine(emid),
	energy_amount FLOAT
);