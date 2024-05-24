INSERT INTO `app_user` (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, city, street, street_number, bank_number) VALUES
(2, 'pbkdf2_sha256$720000$PeiZmmYWbSXZNJMwdo5kpt$PHaCCHV5U87T5/slqx2vqX0cQuiDaszRS4v1HY6/PgY=', null, 0, 'user1', '', '', 'user1@auction.local', 0, 1, '2024-01-18 18:40:41.592411', 'Gdańsk', 'Grunwaldzka', '1', '100001'),
(3, 'pbkdf2_sha256$720000$IZe4uVqBiyabqJZaH8qxWF$NtIAktI9+232gNA7CKmACK6AYCFgoi1ViFH7I0Udrlo=', null, 0, 'user2', '', '', 'user2@auction.local', 0, 1, '2024-01-18 18:41:30.949515', 'Sopot', 'Sopocka', '2', '100002'),
(4, 'pbkdf2_sha256$720000$FQvlPcbIozAfBt0E3edvUJ$CnlJg/rL1mhJ53evYFerHlPQ6Wqr1yoP5+KB3sWn4mQ=', null, 0, 'user3', '', '', 'user3@auction.local', 0, 1, '2024-01-18 18:42:05.607356', 'Gdynia', 'Mickiewicza', '5', '100003'),
(5, 'pbkdf2_sha256$720000$pZEjt4fltvw49EJchJtK2I$J/yXbzBD/WXslOtOTJpU3n9PzH4tuZ/68bgA4qIXafU=', null, 0, 'user4', '', '', 'user4@auction.local', 0, 1, '2024-01-18 18:42:41.826310', 'Gdańsk', 'Grunwaldzka', '4', '100004'),
(6, 'pbkdf2_sha256$720000$AunMafl9qeseAEeiIOwbGG$SlUqotFVooIyYPyXZyQ8exWb0flj8PoezVjrVkKrZH4=', null, 0, 'user5', '', '', 'user5@auction.local', 0, 1, '2024-01-18 18:43:05.474294', 'Hel', 'Hel', '5', '100005');

INSERT INTO `app_auction` (title, body, created, status, price, seller_id, buyer_id) VALUES
('Used Smartphone', 'I offer used Samsung S10 in a good state', '2024-01-13 15:52:04.269978', 'AC', 1999.98, 2, null),
('Used Smartphone', 'I offer used Samsung S10 in a good state', '2024-01-14 15:52:04.269978', 'AC', 999.98, 2, null),
('Brand new wallet', 'I offer leather wallet', '2024-01-15 15:52:04.269978', 'FI', 99.98, 4, 3),
('Bluetooth speakers', 'I offer some old bluetooth speakers', '2024-01-15 15:52:04.269978', 'FI', 99.98, 2, 3),
('Old books', 'Send me an private message', '2024-01-14 15:52:04.269978', 'AC', 10.0, 3, null);

INSERT INTO `app_chat` (auction_id, client_id) VALUES
(3, 3),
(4, 3);

INSERT INTO `app_message` (chat_id, sender_id, message, created) VALUES
(1, 3, 'Hi whats is whats is the wallet color?', '2024-01-15 15:55:04.269978'),
(1, 4, 'Brown.', '2024-01-15 16:55:04.269978'),
(2, 3, 'Hi are these speakers work?', '2024-01-15 15:58:04.269978'),
(2, 2, 'Yes', '2024-01-15 16:58:04.269978');
