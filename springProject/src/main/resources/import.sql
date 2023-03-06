-- insert admin (username a, password aa)
INSERT INTO ARTIESUser (id, enabled, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (1, TRUE, 'ADMIN', 'a',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin', 2);

INSERT INTO ARTIESUser (id, enabled, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (2, TRUE, 'ADMIN', 'prueba',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin', 0);

INSERT INTO CATEGORY (id, name)
VALUES (1, 'cat1');

INSERT INTO CATEGORY (id, name)
VALUES (2, 'cat2');

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (1, 'curso de prueba1', FALSE, 'cprueba1', 1);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (2, 'curso de prueba2', FALSE, 'cprueba2', 1);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (3, 'curso de prueba3', TRUE, 'cprueba3', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (4, 'curso de prueba4 y desc mas larga para ver como se ve', TRUE, 'abdominales laterales', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (5, 'curso de prueba5', TRUE, 'curso de prueba5', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (6, 'curso de prueba6', TRUE, 'curso de prueba6', 2);

/* INSERT INTO IWUser (id, enabled, roles, username, password,direccion, email, telefono, first_name, last_name)
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
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle noseque', 'emp2@emps.com', '789789789', 'empleado2', 'empleado2'); */




ALTER SEQUENCE "PUBLIC"."GEN" RESTART WITH 1024;