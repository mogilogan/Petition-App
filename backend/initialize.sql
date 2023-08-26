DROP TABLE IF EXISTS users;

CREATE TABLE users (
  
  _name VARCHAR(100),
  user_name VARCHAR(30),
  _password VARCHAR(30),
  user_id INT NOT NULL AUTO_INCREMENT, 
  dept_id VARCHAR(10),
  ph_num INT(10),
  cate_id VARCHAR(10),
  PRIMARY KEY (user_id)
);