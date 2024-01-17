INSERT INTO auctiondb.app_user (password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, city, street, street_number, bank_number) VALUES
('pbkdf2_sha256$720000$SsBlkN3iTHMtRbocCZiSZ3$parfH6Doyp6eGlEOv88PzmGYsWcneWBjIZR0WzzIi+k=', 0, 'user1', 'name1', 'lastname1', 'user1@auction.local', 0, 0, '2024-01-14 15:52:04.269978', 'Gdańsk', 'Grunwaldzka', '1', '123456'),
('pbkdf2_sha256$720000$SsBlkN3iTHMtRbocCZiSZ3$parfH6Doyp6eGlEOv88PzmGYsWcneWBjIZR0WzzIi+k=', 0, 'user2', 'name2', 'lastname2', 'user2@auction.local', 0, 0, '2024-01-14 15:52:04.269978', 'Gdańsk', 'Grunwaldzka', '2', '123456'),
('pbkdf2_sha256$720000$SsBlkN3iTHMtRbocCZiSZ3$parfH6Doyp6eGlEOv88PzmGYsWcneWBjIZR0WzzIi+k=', 0, 'user3', 'name3', 'lastname3', 'user3@auction.local', 0, 0, '2024-01-14 15:52:04.269978', 'Gdańsk', 'Grunwaldzka', '3', '123456'),
('pbkdf2_sha256$720000$SsBlkN3iTHMtRbocCZiSZ3$parfH6Doyp6eGlEOv88PzmGYsWcneWBjIZR0WzzIi+k=', 0, 'user4', 'name4', 'lastname4', 'user4@auction.local', 0, 0, '2024-01-14 15:52:04.269978', 'Gdańsk', 'Grunwaldzka', '4', '123456');

INSERT INTO auctiondb.app_auction (title, body, created, status, price, seller_id, buyer_id) VALUES
('Used Smartphone', 'I offer used Samsung S10 in a good state', '2024-01-13 15:52:04.269978', 'AC', 1999.98, 2, null),
('Used Smartphone', 'I offer used Samsung S10 in a good state', '2024-01-14 15:52:04.269978', 'AC', 999.98, 2, null),
('Brand new wallet', 'I offer leather wallet', '2024-01-15 15:52:04.269978', 'FI', 99.98, 4, 3),
('Bluetooth speakers', 'I offer some old bluetooth speakers', '2024-01-15 15:52:04.269978', 'FI', 99.98, 2, 3),
('Old books', 'Send me an private message', '2024-01-14 15:52:04.269978', 'AC', 10.0, 3, null);

INSERT INTO auctiondb.app_chat (auction_id, client_id) VALUES
(3, 3),
(4, 3);

INSERT INTO auctiondb.app_message (chat_id, sender_id, message, created) VALUES
(1, 3, 'Hi whats is whats is the wallet color?', '2024-01-15 15:55:04.269978'),
(1, 4, 'Brown.', '2024-01-15 16:55:04.269978'),
(2, 3, 'Hi are these speakers work?', '2024-01-15 15:58:04.269978'),
(2, 2, 'Yes', '2024-01-15 16:58:04.269978');
