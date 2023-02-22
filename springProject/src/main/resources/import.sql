-- insert admin (username a, password aa)
INSERT INTO IWUser (id, enabled, roles, username, password,direccion, email, telefono, first_name, last_name)
VALUES (1, TRUE, 'ADMIN', 'a',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin');

INSERT INTO IWUser (id, enabled, roles, username, password,direccion, email, telefono, first_name, last_name)
VALUES (2, TRUE, 'USER', 'b',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'user', 'user');

INSERT INTO IWUser (id, enabled, roles, username, password,direccion, email, telefono, first_name, last_name)
VALUES (3, TRUE, 'EMPLEADO', 'emp',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle empleado', 'emp1@emps.com', '123123123', 'empleado', 'empleado');

INSERT INTO IWUser (id, enabled, roles, username, password, direccion, email, telefono, first_name, last_name)
VALUES (4, TRUE, 'USER', 'u',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle lola', 'holita@ucm.es','678435232', 'user2', 'user2');

INSERT INTO IWUser (id, enabled, roles, username, password,direccion, email, telefono, first_name, last_name)
VALUES (5, TRUE, 'EMPLEADO', 'emp2',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle noseque', 'emp2@emps.com', '789789789', 'empleado2', 'empleado2');




ALTER SEQUENCE "PUBLIC"."GEN" RESTART WITH 1024;