CREATE TABLE minetype(
	typeid VARCHAR(5) PRIMARY KEY,
	typename VARCHAR
);
CREATE TABLE mine(
	mineid VARCHAR(10) PRIMARY KEY,
	minename VARCHAR,
	mine_type VARCHAR(5) REFERENCES minetype(typeid),
	description VARCHAR
);
CREATE TABLE mine_fountain(
	m_fountain_id VARCHAR(5) PRIMARY KEY,
	m_fountain_name VARCHAR,
	mf_location VARCHAR,
	status_id INT REFERENCES status(status_id)
);
CREATE TABLE mine_detail(
	mineid VARCHAR(10) REFERENCES mine(mineid),
	m_fountain_id VARCHAR(10) REFERENCES mine_fountain(m_fountain_id),
	volume FLOAT,
	weight FLOAT
);