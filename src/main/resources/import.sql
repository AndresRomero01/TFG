-- insert admin (username a, password aa)
/* INSERT INTO ARTIESUser (id, enabled, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (1, TRUE, 'ADMIN', 'a',
    'a', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin', 2);

INSERT INTO ARTIESUser (id, enabled, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (2, TRUE, 'USER', 'user',
    'u', 'calla jefazo', 'user@gmail.es', '1234123555', 'user', 'user', 0); */

/* INSERT INTO ARTIESUser (id, enabled, roles, username, password,address, email, phone, first_name, last_name)
VALUES (1, TRUE, 'ADMIN', 'a',
    'a', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin');

INSERT INTO ARTIESUser (id, enabled, roles, username, password,address, email, phone, first_name, last_name)
VALUES (2, TRUE, 'USER', 'user',
    'u', 'calla jefazo', 'user@gmail.es', '1234123555', 'user', 'user'); */
INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (1, 'ADMIN', 'a',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin', 2);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (2, 'USER', 'b',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'user', 'user', 0);

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

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (7, 'curso de prueba1', FALSE, 'cprueba1', 1);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (8, 'curso de prueba2', FALSE, 'cprueba2', 1);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (9, 'curso de prueba3', TRUE, 'cprueba3', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (10, 'curso de prueba4 y desc mas larga para ver como se ve', TRUE, 'abdominales laterales', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (11, 'curso de prueba5', TRUE, 'curso de prueba5', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (12, 'curso de prueba6', TRUE, 'curso de prueba6', 2);


-- Datos sobre items

INSERT INTO ITEM(id, name, description, quantity)
VALUES (1,'pesa 5kg', 'Una pequeña pesa para principiantes', 10);

INSERT INTO ITEM(id, name, description, quantity)
VALUES (2,'pesa 10kg', 'Una pesa para niveles intermedios', 8);

INSERT INTO ITEM(id, name, description, quantity)
VALUES (3,'pesa 15kg', 'Una pesa para tonificar', 6);

INSERT INTO ITEM(id, name, description, quantity)
VALUES (4,'pesa 20kg', 'Una pesa para musculacion', 4);

INSERT INTO ITEM(id, name, description, quantity)
VALUES (5,'bicicleta basica', 'Una bicicleta basica ideal para principiantes y uso por ciudad', 6);

INSERT INTO ITEM(id, name, description, quantity)
VALUES (6,'bicicleta montaña', 'Una bicicleta perfecta para rutas por el campo', 4);

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (2, 1, 2, '2023-03-20T10:00:00', '2023-04-20T10:00:00');

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (1, 4, 2, '2023-03-20T10:00:00', '2023-04-20T10:00:00');

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (2, 4, 2, '2023-03-20T10:00:00', '2023-04-20T10:00:00');

ALTER SEQUENCE "PUBLIC"."GEN" RESTART WITH 1024;