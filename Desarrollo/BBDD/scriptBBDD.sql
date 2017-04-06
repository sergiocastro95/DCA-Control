CREATE TABLE "TFG".Paciente (
	sip varchar(12) NOT NULL,
	password varchar(50) not null,
	nombre varchar(25) NOT NULL,
	apellidos varchar(50) NOT NULL,
	PRIMARY KEY (sip)
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Tratamiento (
	id SERIAL,
	paciente varchar(12) not null,
	nombre varchar(30) NOT NULL,
	descripcion varchar(500) not null,
	hora_1 timestamp,
	hora_2 timestamp,
	hora_3 timestamp,
	hora_4 timestamp,
	hora_5 timestamp,
	hora_6 timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip) on delete cascade
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Historial (
	id SERIAL,
	paciente varchar(12) not null,
	descripcion varchar(500) not null,
	fecha timestamp not null,
	PRIMARY KEY (id),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip) on delete cascade
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".HR (
	id SERIAL,
	paciente varchar(12) not null,
	tiempo timestamp not null,
	hr integer not null,
	PRIMARY KEY (id),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip) on delete cascade
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Temperatura (
	tiempo timestamp not null,
	paciente varchar(12) not null,
	temperatura real not null,
	PRIMARY KEY (tiempo, paciente),
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip) on delete cascade
)
WITH (
	OIDS=FALSE
);

CREATE TABLE "TFG".Enfermedad (
	id SERIAL,
	paciente varchar(12) not null,
	nombre varchar(50) not null,
	descripcion varchar(500) not null,
	PRIMARY KEY (id),
	foreign key (paciente) references "TFG".Paciente(sip) on delete cascade
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
	id SERIAL,
	email varchar(50) not null,
	nombre varchar(50) not null,
	password varchar(50) not null,
	telefono varchar(12) not null,
	rol smallint not null,
	PRIMARY KEY (id),
	FOREIGN KEY (rol) REFERENCES "TFG".Rol(id)on delete cascade
)
WITH (
	OIDS=FALSE
);
CREATE TABLE "TFG".Paciente_Usuario (
	usuario integer NOT NULL,
	paciente varchar(12) not null,
	PRIMARY KEY (usuario, paciente),
	FOREIGN KEY (usuario) REFERENCES "TFG".Usuario(id) on delete cascade, 
	FOREIGN KEY (paciente) REFERENCES "TFG".Paciente(sip) on delete cascade
)
WITH (
	OIDS=FALSE
);
insert into "TFG".Rol values(1);	/*familiar*/
insert into "TFG".Rol values(2);	/*medico*/

insert into "TFG".Usuario (email, nombre, password, telefono, rol) values ('prueba@email.com', 'sergio','qwe', '654321123', 1);
insert into "TFG".Usuario (email, nombre, password, telefono, rol) values ('prueba2@email.com', 'lucía','qwe', '654321123', 2);

insert into "TFG".paciente values ('123456789123','qwerty', 'fernando', 'gallud');/*el paciente que tendrá medidas*/
insert into "TFG".paciente values ('987654321987','qwerty', 'samuel', 'andreo');

insert into "TFG".paciente_usuario values (1, '123456789123' );
insert into "TFG".paciente_usuario values (2, '123456789123' );
insert into "TFG".paciente_usuario values (2, '987654321987' );

insert into "TFG".enfermedad (paciente, nombre, descripcion) values ('123456789123','DCA', 'DCA controlado, se espera nuevo diagnóstico en breve.');

insert into "TFG".historial (paciente, descripcion, fecha) values ('123456789123', 'Ataque repentino sufrido mientras estaba en casa.', '2017-01-13 13:00:00');
insert into "TFG".historial (paciente, descripcion, fecha) values ('123456789123', 'Ataque nocturno leve.', '2017-01-20 04:15:00');

insert into "TFG".hr (paciente, tiempo, hr) values ('123456789123','2017-01-08 04:05:06', 75 );
insert into "TFG".hr (paciente, tiempo, hr) values ('123456789123','2017-01-08 04:15:00', 77 );
insert into "TFG".hr (paciente, tiempo, hr) values ('123456789123','2017-01-08 04:25:06', 79 );
insert into "TFG".hr (paciente, tiempo, hr) values ('123456789123','2017-01-08 04:35:06', 73 );
insert into "TFG".hr (paciente, tiempo, hr) values ('123456789123','2017-01-08 04:45:06', 80 );

insert into "TFG".temperatura values ('2017-01-08 04:05:06', '123456789123', 36 );
insert into "TFG".temperatura values ('2017-01-08 04:15:00', '123456789123', 36.5 );
insert into "TFG".temperatura values ('2017-01-08 04:25:06', '123456789123', 36.6 );
insert into "TFG".temperatura values ('2017-01-08 04:35:06', '123456789123', 36.8 );
insert into "TFG".temperatura values ('2017-01-08 04:45:06', '123456789123', 37 );

/*aqui a lo mejor sobra la fecha del tratamiento, solo se usa la hora*/
insert into "TFG".tratamiento (paciente, nombre, descripcion, hora_1, hora_2, hora_3) values ('123456789123', 'Amoxicilina','Tomar con comidas', '2017-01-13 00:00:00','2017-01-13 08:00:00','2017-01-13 16:00:00');



/*SELECT email, password from "TFG".usuario where email= 'prueba@email.com' and password='qwe';
select * from "TFG".usuario;
UPDATE "TFG".paciente SET password='qwe',nombre='paco',apellidos ='castro sola' where id= '456456456456'
DELETE from "TFG".Paciente where sip='123456789123';
select * from "TFG".tratamiento;*/