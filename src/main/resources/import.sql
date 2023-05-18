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
INSERT INTO ARTIESUser (id, roles, username, password,address, email, phone, first_name, last_name, client_type, description)
VALUES (1, 'ADMIN', 'a',
    '{bcrypt}$2a$10$2BpNTbrsarbHjNsUWgzfNubJqBRf.0Vz9924nRSHBqlbPKerkgX.W', 'calla jefazo', 'admin@faq.es', '123456321', 'admin', 'admin', 2, 'Dentro de la descripcion del admin: me lesione de la rodilla');

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

ALTER TABLE course ALTER COLUMN description TYPE text;--Para poder guardar textos largos en la descripcion

INSERT INTO CATEGORY (id, name)
VALUES (1, 'Cardio');

INSERT INTO CATEGORY (id, name)
VALUES (2, 'Musculación');

INSERT INTO CATEGORY (id, name)
VALUES (3, 'Yoga');

INSERT INTO CATEGORY (id, name)
VALUES (4, 'Pilates');

INSERT INTO CATEGORY (id, name)
VALUES (5, 'HIIT');

INSERT INTO CATEGORY (id, name)
VALUES (6, 'Tren superior');

INSERT INTO CATEGORY (id, name)
VALUES (7, 'Tren inferior');

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (1, 'Carrera 10km', FALSE, 'Prepárate para iniciarte en las maratones. Este curso te ayudará a conseguir superar la primera de ellas, la de 10km', 1, TRUE, TRUE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (2, 'Maratón 42km', FALSE, 'Una maratón no es fácil, y lo sabemos. Prepárate junto con nuestro entrenador especializado para lograr tu objetivo', 1, TRUE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (3, 'Triceps', TRUE, 'Aprenderás de diferentes maneras a entrenar adecuadamente tus triceps, haciendo incapié en la técinca para evitar lesiones', 2, TRUE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (4, 'Biceps', TRUE, 'Aprenderás de diferentes maneras a entrenar adecuadamente tus biceps, haciendo incapié en la técinca para evitar lesiones', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (5, 'Hombro', TRUE, 'Hay muchas maneras de entrenar hombros. En este curso te mostramos las mejores', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (6, 'Abdominales', TRUE, 'Entrena tus abdominales y consigue resultados en tiempo record', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (7, 'Cinta', FALSE, 'La cinta de correr es lo más típico. Sin embargo, te enseñaremos algunos trucos que no sabías', 1, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (8, 'Elíptica', FALSE, 'Otro de las máquinas más comunes de cardio gracias a ser menos agresiva para tus rodillas. Te enseñaremos algunos ajustes para sacar el máximo provecho', 1, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (9, 'Pecho', TRUE, 'En este curso aprenderás cuales son los mejores ejercicios tanto en eficiencia como en menor riesgo de lesión', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (10, 'Cuádriceps', TRUE, 'Aprende cómo funcionan los cuádriceps, además de la mejor manera de entrenarlos', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (11, 'Isquiotibiales', TRUE, 'Sigue estos pasos para conseguir tu objetivo', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (12, 'Gemelos', FALSE, '¿Se te cansan los gemelos solo por andar? No te preocupes, nosotros te explicamos cómo solucionarlo', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (13, 'Glúteos', FALSE, 'Convierte la grasa en músculo con este curso', 2, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (14, 'Iniciación al yoga', FALSE, 'En este curso aprenderás en qué se basa el yoga, además de los primeros movimientos', 3, FALSE, FALSE);

INSERT INTO COURSE (id, name, is_free, description, category_id, has_image, has_video)
VALUES (15, 'Bicicleta', FALSE, 'Uno de los mejores ejercicios para entrenar cardio, y además es divertido', 1, FALSE, FALSE);

INSERT INTO RELATION_USER_COURSE(course_id, user_id, times_done)
VALUES (1, 1, 4);

INSERT INTO RELATION_USER_COURSE(course_id, user_id, times_done)
VALUES (2, 1, 1);

INSERT INTO RELATION_USER_COURSE(course_id, user_id, times_done)
VALUES (3, 1, 1000);

INSERT INTO RELATION_USER_COURSE(course_id, user_id, times_done)
VALUES (1, 2, 3);

--- Datos sobre items y alquiler de items ---

ALTER TABLE item ALTER COLUMN description TYPE text;--Para poder guardar textos largos en la descripcion

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (1,'Pesa 5kg', 10, 2, '
La pesa de 5 kg es una opción ligera y versátil para el entrenamiento físico. Ideal para principiantes y personas en rehabilitación, ofrece resistencia gradual y cómodo agarre. Es compacta y permite trabajar diferentes grupos musculares de forma efectiva.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (2,'Pelota de pilates',12, 1, 'La pelota de Pilates es un accesorio versátil para fortalecer el cuerpo y mejorar la flexibilidad. Utilizada en una amplia gama de ejercicios, fortalece los músculos centrales, mejora la estabilidad y la postura. Es adecuada para personas de todos los niveles de condición física.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (3,'Step',6, 2, 'El step es un equipo versátil para entrenamiento cardiovascular y de fuerza. Consiste en una plataforma elevada ajustable en altura. Puedes realizar ejercicios de cardio y fortalecimiento muscular. Mejora la resistencia, quema calorías y fortalece piernas y glúteos. Es fácil de transportar y almacenar. Ideal para personas de todos los niveles de condición física.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (4,'Pesa 20kg', 4, 1, '
La pesa de 20 kg es ideal para usuarios experimentados en el entrenamiento de fuerza. Su diseño duradero y agarre cómodo la hacen adecuada para levantamientos, sentadillas y otros ejercicios de fuerza. Ayuda a aumentar la masa muscular, promover la resistencia y mejorar la fuerza general del cuerpo.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (5,'Bicicleta basica', 6, 1, 'Nuestra bicicleta básica es cómoda, resistente y se adapta a tus preferencias. Con diferentes niveles de resistencia y una pantalla digital, puedes hacer un entrenamiento cardiovascular efectivo y ver tu progreso. Es una opción confiable y segura para disfrutar del ejercicio al aire libre.');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (6,'Bicicleta montaña', 4, 1, '
La bicicleta de montaña es resistente, versátil y perfecta para explorar senderos accidentados. Con su sistema de suspensión y neumáticos anchos, ofrece una conducción suave y estable en terrenos irregulares. Sus múltiples velocidades y frenos de calidad garantizan un control preciso. ¡Prepárate para disfrutar de emocionantes aventuras al aire libre!');

INSERT INTO ITEM(id, name, quantity, max_loan, description)
VALUES (7,'Esterilla de yoga', 30, 3, 'La esterilla de yoga es un accesorio esencial para practicar yoga y ejercicios en el suelo. Hecha de materiales duraderos y antideslizantes, brinda comodidad, estabilidad y protección para tus articulaciones. Es portátil y fácil de transportar. Ideal para yoga, pilates y estiramientos.');

/* Para probar fecha de devolucion ya pasada o no unidades disponibles modificando fecha endLoand 
y poniendo dia del start del siguiente al dia siguiente*/
INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (1, 1, 4, 2, '2023-03-20T10:00:00', '2023-05-19T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (2, 3, 4, 3, '2023-05-21T00:00:00', '2023-05-25T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (3, 3, 6, 4, '2023-03-20T10:00:00', '2023-04-6T23:59:00',FALSE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (4, 3, 1, 1, '2023-03-20T10:00:00', '2023-03-27T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (5, 2, 1, 2, '2023-04-04T00:00:00', '2023-04-13T23:59:00',TRUE);
/* Para probar fecha cercana a fin loan (modificandolo) */
INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (6, 1, 3, 1, '2023-04-04T00:00:00', '2023-04-11T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (7, 1, 2, 1, '2023-04-04T00:00:00', '2023-05-19T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (8, 3, 3, 1, '2023-04-04T00:00:00', '2023-05-07T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (9, 3, 2, 1, '2023-04-04T00:00:00', '2023-05-07T23:59:00',TRUE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (10, 1, 1, 1, '2023-04-04T00:00:00', '2023-05-07T23:59:00',FALSE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (11, 1, 1, 2, '2023-03-04T00:00:00', '2023-03-07T23:59:00',FALSE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (12, 1, 5, 1, '2023-03-04T00:00:00', '2023-03-07T23:59:00',FALSE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (13, 1, 5, 2, '2023-02-03T00:00:00', '2023-02-07T23:59:00',FALSE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (14, 1, 5, 2, '2023-05-04T00:00:00', '2023-05-07T23:59:00',FALSE);

INSERT INTO ITEM_LOANS(id, user_id, item_id, quantity, loan_start, loan_end, is_active)
VALUES (15, 1, 3, 1, '2023-03-04T00:00:00', '2023-03-07T23:59:00',FALSE);

--- Data for chats ---

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (1, 2, 1, 'hola, tengo una pregunta', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, text, subject, user_sent_it)
VALUES (2, 1, 'Hola! bienvenido. En que podemos ayudarte?', 'duda maquina abdominales', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (3, 2, 1, 'Pues es que no se usar esta maquina', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, text, subject, user_sent_it)
VALUES (4, 3, 'Hola! Hoy he ido al gimnasio y me ha quedado la duda de cómo se utiliza la máquina que teneis nada más entrar a la izquierda', 'No se usar esta máquina', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, text, subject, user_sent_it)
VALUES (5, 3, 'No he sido capaz de encontrar como usar esta maquina', 'Pregunta instrucciones máquina', TRUE);

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
VALUES (12, 1, 3, 'soy empleado 3 y estoy respondiendo a admin', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (13, 1, 3, 'asi que bienvenido admin!', FALSE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (14, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (15, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (16, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (17, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (18, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (19, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (20, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (21, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

INSERT INTO CHAT_MESSAGE (id, user_id, staff_id, text, user_sent_it)
VALUES (22, 1, 3, 'genial! pues voy a repartir trabajo, dime si tienes inconvenientes', TRUE);

------ DATA FOR GYM SUBSCRIPTION ----- 
INSERT INTO GYM_SUB (id, online_price, onsite_price)
VALUES (1, 25, 50);

--- DATA FOR LESSONS ---
ALTER TABLE lesson ALTER COLUMN period TYPE text;--Para poder guardar textos largos
ALTER TABLE lesson ALTER COLUMN description TYPE text;--Para poder guardar textos largos en la descripcion

INSERT INTO LESSON (id, name, period, capacity, price, description)
VALUES (1, 'Zumba', 'MONDAY-10:30,MONDAY-17:15,THURSDAY-15:00', 20, 1.00, 'Disfruta de una sesión de baile energética y divertida al ritmo de la música latina y otros estilos musicales. Quemarás calorías, mejorarás tu coordinación y aumentarás tu estado de ánimo.');

INSERT INTO LESSON (id, name, period, capacity, price, description)
VALUES (2, 'Pilates', 'MONDAY-10:30,TUESDAY-12:15,THURSDAY-11:45', 30, 0.50, 'Enfocada en el fortalecimiento del núcleo y el control del cuerpo, esta clase te ayudará a mejorar tu postura, tonificar tus músculos y aumentar la flexibilidad y el equilibrio.');


INSERT INTO LESSON (id, name, period, capacity, price, description)
VALUES (3, 'Yoga', 'MONDAY-10:30,TUESDAY-12:15,THURSDAY-11:45', 25, 1.20, 'Esta clase se centra en la conexión mente-cuerpo a través de posturas físicas, respiración y meditación. Mejorarás tu flexibilidad, equilibrio, fuerza muscular y reducirás el estrés.');

INSERT INTO LESSON (id, name, period, capacity, price, description)
VALUES (4, 'Spinning', 'MONDAY-10:30,TUESDAY-12:15,THURSDAY-11:45', 15, 1.40, 'Esta clase de alta intensidad se realiza en bicicletas estáticas. Te guiará a través de un entrenamiento cardiovascular desafiante que fortalecerá tus piernas, mejorarás tu resistencia y quemarás calorías.');

INSERT INTO LESSON (id, name, period, capacity, price, description)
VALUES (5, 'Boxeo fitness', 'MONDAY-10:30,TUESDAY-12:15,THURSDAY-11:45', 10, 1.65, 'Esta clase combina ejercicios de boxeo y acondicionamiento físico. Golpearás sacos de boxeo, realizarás movimientos de boxeo y ejercicios cardiovasculares para mejorar la fuerza, la coordinación y el estado físico general.');

-------------------------
INSERT INTO SESSION (id, date, lesson_id)
VALUES (1, '2023-05-8 10:30', 1);
INSERT INTO SESSION (id, date, lesson_id)
VALUES (2, '2023-05-15 10:30', 1);
INSERT INTO SESSION (id, date, lesson_id)
VALUES (3, '2023-05-15 17:15', 1);


INSERT INTO SESSION (id, date, lesson_id)
VALUES (4, '2023-05-15 10:30', 2);
INSERT INTO SESSION (id, date, lesson_id)
VALUES (5, '2023-05-16 12:15', 2);

INSERT INTO SESSION (id, date, lesson_id)
VALUES (6, '2023-05-15 10:30', 3);
INSERT INTO SESSION (id, date, lesson_id)
VALUES (7, '2023-05-16 12:15', 3);

-------------------------

INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,1);
INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,2);
INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,3);
INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,4);
INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,6);
INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,7);
------
/* INSERT INTO SESSION (id, date, lesson_id)
VALUES (1,'2023-04-20T00:00:00', 1);

INSERT INTO SESSION (id, date, lesson_id)
VALUES (2,'2023-05-22T00:00:00', 1);

INSERT INTO SESSION (id, date, lesson_id)
VALUES (3,'2023-05-23T00:00:00', 1);

INSERT INTO SESSION (id, date, lesson_id)
VALUES (4, '2023-05-20T00:10:00', 2);
INSERT INTO SESSION (id, date, lesson_id)
VALUES (5, '2023-05-20T00:12:24', 2); */
------

/* INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,1);

INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,4);

INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,3);

INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,5);

INSERT INTO SESSION_BOOKINGS (user_id, session_id)
VALUES (1,2); */

ALTER SEQUENCE "PUBLIC"."GEN" RESTART WITH 1024;