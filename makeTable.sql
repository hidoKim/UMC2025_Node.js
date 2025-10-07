-- 완료
CREATE TABLE member ( 
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    nick_name VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    gender VARCHAR(10),
    birth DATE,
    address VARCHAR(100),
    point float,
    role ENUM('user', 'owner', 'admin'),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean
);

-- 완료
CREATE TABLE member_pref_food (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT,
    food_category_id BIGINT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (food_category_id) REFERENCES food_category(id)
);

-- 완료
CREATE TABLE food_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean
);

-- 완료
CREATE TABLE phone (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT,
    phone_number varchar(20),
    is_certified boolean,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (member_id) REFERENCES member(id)
)

-- 완료
CREATE TABLE inquiry (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT,
    title VARCHAR(100),
    type VARCHAR(20),
    content TEXT,
    status ENUM('waiting','answered') DEFAULT 'waiting',
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (member_id) REFERENCES member(id)
);

-- 완료
CREATE TABLE member_mission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT,
    mission_id BIGINT,
    status ENUM('assigned','in_progress','completed','failed'),
    started_at DATETIME(6),
    completed_at DATETIME(6),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (mission_id) REFERENCES mission(id)
);

-- 완료
CREATE TABLE mission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id BIGINT,
    name VARCHAR(100),
    description TEXT,
    reward INT,
    criteria VARCHAR(100),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- 완료
CREATE TABLE review (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_mission_id BIGINT,
    parent_review_id BIGINT,
    content TEXT,
    rating INT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (member_mission_id) REFERENCES member_mission(id)
);
-- 완료
CREATE TABLE review_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    review_id BIGINT,
    src varchar(200),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    FOREIGN KEY (review_id) REFERENCES review(id)
);

-- 완료
CREATE TABLE store (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    region_id BIGINT,
    name VARCHAR(40),
    address VARCHAR(100),
    food_type VARCHAR(20),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    is_deleted boolean,
    FOREIGN KEY (region_id) REFERENCES region(id)
);

-- 완료
CREATE TABLE store_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id BIGINT,
    src varchar(200),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- 완료
CREATE TABLE region (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15)
);


