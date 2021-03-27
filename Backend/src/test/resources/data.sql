INSERT INTO location (id_location, label, latitude, longitude) VALUES
(1, 'LOC1', 45, 45);
INSERT INTO location (id_location, label, latitude, longitude) VALUES
(2, 'LOC2', 55, 55);

INSERT INTO user (id, email, first_name, last_name, password, username) VALUES
(1, 'lidouh@gmail.com', 'mohamed', 'lidouh', '$2a$10$qqEWBP3BUTo17FThZsxMaOIu5rXWEQCEQ5v4G50GYhsCs8wCQEvCq', 'lidouh');
INSERT INTO user (id, email, first_name, last_name, password, username) VALUES
(2, 'cimo2@gmail.com', 'cimo2', 'cimo2', '$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG', 'cimo2');
INSERT INTO user (id, email, first_name, last_name, password, username) VALUES
(3, 'achkour@gmail.com', 'achkour', 'achkour', '$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG', 'achkour');

INSERT INTO tag (id_tag, sequence, title, user_id) VALUES
(1, 0, 'default tag', 1);
INSERT INTO tag (id_tag, sequence, title, user_id) VALUES
(2, 0, 'TAG', 1);
INSERT INTO tag (id_tag, sequence, title, user_id) VALUES
(3, 0, 'TAG1', 1);
INSERT INTO tag (id_tag, sequence, title, user_id) VALUES
(4, 0, 'TAG2', 1);
INSERT INTO tag (id_tag, sequence, title, user_id) VALUES
(5, 0, 'TAG4', 1);

INSERT INTO tag_access_user_entities (tag_entity_id_tag, access_user_id) VALUES
(3, 2);
INSERT INTO tag_access_user_entities (tag_entity_id_tag, access_user_id) VALUES
(5, 2);

INSERT INTO locations_tags (location_id, tag_id) VALUES
(1, 1);
INSERT INTO locations_tags (location_id, tag_id) VALUES
(1, 2);
INSERT INTO locations_tags (location_id, tag_id) VALUES
(1, 3);
INSERT INTO locations_tags (location_id, tag_id) VALUES
    (2, 1);
INSERT INTO locations_tags (location_id, tag_id) VALUES
(2, 4);
INSERT INTO locations_tags (location_id, tag_id) VALUES
(2, 5);





