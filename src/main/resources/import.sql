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

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (3, 'STAFF', 'e',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Juan', 'Rodriguez', 0);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (4, 'STAFF', 'emp',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Roberto', 'Pelaez', 0);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (5, 'STAFF', 'emp2',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Alejandra', 'Fernandez', 0);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (6, 'STAFF', 'emp3',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Jorge', 'Castaño', 0);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (7, 'STAFF', 'emp4',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Jorge', 'Castaño', 0);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (8, 'STAFF', 'emp5',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Jorge', 'Castaño', 0);

INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type)
VALUES (9, 'STAFF', 'emp6',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calle machado', 'user@normalito.com', '456543675', 'Jorge', 'Castaño', 0);

INSERT INTO CATEGORY (id, name)
VALUES (1, 'cat1');

INSERT INTO CATEGORY (id, name)
VALUES (2, 'cat2');

INSERT INTO CATEGORY (id, name)
VALUES (3, 'categoria3');

INSERT INTO CATEGORY (id, name)
VALUES (4, 'categoria4');

INSERT INTO CATEGORY (id, name)
VALUES (5, 'categoria5categoria5');

INSERT INTO CATEGORY (id, name)
VALUES (6, 'categoria6');

INSERT INTO CATEGORY (id, name)
VALUES (7, 'cat7');

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

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (13, 'curso de prueba6', FALSE, 'curso de prueba6', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (14, 'curso de prueba6', FALSE, 'curso de prueba6', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (15, 'curso de prueba6', FALSE, 'curso de prueba6', 3);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (16, 'curso de prueba6', FALSE, 'curso de prueba6', 1);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (1, 2, 1, 'hola, tengo una pregunta', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, text, subject, user_sent_it)
VALUES (2, 1, 'Hola! bienvenido. En que podemos ayudarte?', 'duda maquina abdominales', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (3, 2, 1, 'Pues es que no se usar esta maquina', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, text, subject, user_sent_it)
VALUES (4, 3, 'Hola! como se usa esta app?', 'duda1', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, text, subject, user_sent_it)
VALUES (5, 3, 'No he sido capaz de encontrar como usar esta maquina', 'duda2 duda2 duda2', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (6, 1, 1, 'hola, soy el admin y no se como funciona', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (7, 1, 1, 'soy admin. Para cuando tendreis la app', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (8, 2, 1, 'no te preocupes, nosotros te lo explicamos', FALSE);

ALTER SEQUENCE "PUBLIC"."GEN" RESTART WITH 1024;