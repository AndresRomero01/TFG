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

--Datos sobre cursos

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


INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (13, 'curso de prueba6', FALSE, 'curso de prueba6', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (14, 'curso de prueba6', FALSE, 'curso de prueba6', 2);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (15, 'curso de prueba6', FALSE, 'curso de prueba6', 3);

INSERT INTO COURSE (id, description, is_free, name, category_id)
VALUES (16, 'curso de prueba6', FALSE, 'curso de prueba6', 1);

--Datos sobre items y alquiler de items

ALTER TABLE item ALTER COLUMN description TYPE text;--Para poder guardar textos largos en la descripcion

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (1,'pesa 5kg', 10, 2, 'Gna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (2,'pesa 10kg',8, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut en.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (3,'pesa 15kg',6, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (4,'pesa 20kg', 4, 1, 'Una pesa para musculacion');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (5,'bicicleta basica', 6, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (6,'bicicleta montaña', 4, 1, 'Lorem impsum dolor sit amet consecteuit adipiscining elit. Nobis, sit impsum dolor sit amet. Lorem impsum dolor sit amet consecteuit adipiscining elit. Nobis, sit impsum dolor sit amet');

/* Para probar fecha de devolucion ya pasada o no unidades disponibles modificando fecha endLoand 
y poniendo dia del start del siguiente al dia siguiente*/
INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (1, 4, 2, '2023-03-20T10:00:00', '2023-04-9T23:59:00');

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (3, 4, 1, '2023-04-10T00:00:00', '2023-04-20T23:59:00');


INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (3, 6, 4, '2023-03-20T10:00:00', '2023-04-6T10:00:00');

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (3, 1, 1, '2023-03-20T10:00:00', '2023-03-27T10:00:00');

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (2, 1, 2, '2023-04-04T00:00:00', '2023-04-13T00:00:00');
/* Para probar fecha cercana a fin loan (modificandolo) */
INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (1, 3, 1, '2023-04-04T00:00:00', '2023-04-11T23:59:00');

INSERT INTO ITEM_LOANS(user_id, item_id, quantity, loan_start, loan_end)
VALUES (1, 2, 1, '2023-04-04T00:00:00', '2023-04-06T00:00:00');

--Datos sobre chats

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

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (9, 2, 3, 'prueba delete staff', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (10, 2, 4, 'foreign key error al delete staff', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (11, 1, 3, 'pregunta para ver si mi empleado 3 lo lee', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (12, 1, 3, 'soy 3 y estoy respondiendo a admin', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (13, 1, 3, 'asi que bienvenido admin!', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (14, 1, 3, 'genial! pues voy a repartir trabajo y os vais a cagar :)', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (15, 1, 3, 'genial! pues voy a repartir trabajo y os vais a cagar :)', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (16, 1, 3, 'genial! pues voy a repartir trabajo y os vais a cagar :)', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (17, 1, 3, 'genial! pues voy a repartir trabajo y os vais a cagar :)', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (18, 1, 3, 'genial! pues voy a repartir trabajo y os vais a cagar :)', TRUE);

ALTER SEQUENCE "PUBLIC"."GEN" RESTART WITH 1024;