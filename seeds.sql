-- -- insert cat and dog
-- INSERT INTO pet_types (type)
-- VALUES ("cat"), ("dog");

-- INSERT INTO shelters (name, location)
-- VALUES ("Nine lives foundation", "Burlingame"),
-- ("Taylor's shelter", "Oceanside");

-- INSERT INTO pets(pet_type_id, name, description, adopted, shelter_id)
-- VALUES(1, "Paprika", "A wonderful lovey dovey cat.", TRUE, 1), 
-- (1, "Monkey", "A wonderful lovey dovey cat, who likes hugs.", FALSE, 1),
-- (1, "Lion Heart", "A wonderful lovey dovey cat, who likes hugs, alot.", FALSE, 1),
-- (2, "Leah", "A wonderful lovey dovey dog, who likes hugs, alot. missing tail.", TRUE, 2),
-- (2, "Belle", "A wonderful lovey dovey dog, who likes hugs, alot. loves fetch.", TRUE, 2),
-- (2, "Bobo", "A wonderful lovey dovey dog, who likes hugs, alot. is bobo.", FALSE, 2);

-- - Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

-- 
-- - ### Alternative way to insert more than one row
INSERT INTO products (item_id, product_name, department_name, price, quantity)
VALUES (item_id, product_name, department_name, price, quantity),
(1, "potato", "food", 5, 100),
(1, "hotdog", "food", 100, 100),
(1, "fizz", "food", 32, 100),
(1, "sugerz", "food", 55, 100),
(2, "hat", "houseware", price, 100),
(2, "single shoe", "houseware", price, 100),
(2, "bag of dirt", "houseware", price, 100),
(2, "actaul trash", "houseware", price, 100);