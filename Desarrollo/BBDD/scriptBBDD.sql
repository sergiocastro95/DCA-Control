CREATE TABLE "TFG".Paciente (
	sip varchar(12) NOT NULL,
	nombre varchar(25) NOT NULL,
	apellidos varchar(50) NOT NULL,
	PRIMARY KEY (sip)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Tratamiento (
	nombre varchar(30) NOT NULL,
	paciente varchar(12) not null,
	hora_1 timestamp,
	hora_2 timestamp,
	hora_3 timestamp,
	hora_4 timestamp,
	hora_5 timestamp,
	hora_6 timestamp,
	PRIMARY KEY (nombre, paciente),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Historial (
	id integer NOT NULL,
	paciente varchar(12) not null,
	descipcion varchar(500) not null,
	fecha date not null,
	PRIMARY KEY (id, paciente),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".HR (
	tiempo timestamp not null,
	hr integer not null,
	paciente varchar(12) not null,
	PRIMARY KEY (tiempo, paciente),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Temperatura (
	tiempo timestamp not null,
	temperatura real not null,
	paciente varchar(12) not null,
	PRIMARY KEY (tiempo, paciente),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Enfermedad (
	id integer NOT NULL,
	nombre varchar(50) not null,
	descripcion varchar(500) not null,
	PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Paciente_Enfermedad (
	enfermedad integer NOT NULL,
	paciente varchar(12) not null,
	PRIMARY KEY (enfermedad, paciente),
	FOREIGN KEY (enfermedad) REFERENCES "TFG".Enfermedad(id),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip)
)
WITH (
	OIDS=FALSE
);

create table "TFG".Rol (
	id smallint not null,
	PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Usuario (
	email varchar(50) not null,
	nombre varchar(50) not null,
	password varchar(50) not null,
	telefono varchar(12) not null,
	rol smallint not null,
	PRIMARY KEY (email),
	FOREIGN KEY (rol) REFERENCES "TFG".Rol(id)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Paciente_Usuario (
	usuario varchar(50) NOT NULL,
	paciente varchar(12) not null,
	PRIMARY KEY (usuario, paciente),
	FOREIGN KEY (usuario) REFERENCES "TFG".Usuario(email),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip)
)
WITH (
	OIDS=FALSE
);



drop table "TFG".tratamiento cascade