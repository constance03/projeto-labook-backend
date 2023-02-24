-- Active: 1677080391346@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Maria", "maria@email.com", "$2y$12$1N5zm9D1yJlp3/ZcqBIWJOskqX2gHz0Dkk2mHqd0IQ3rKdWOpWMoi", "NORMAL"),
	("u002", "Veronica", "veronica@email.com", "$2y$12$wJU4l2i93xuAOctpgP.zkOsx5h4eml7PwCq81tdtxBQsAo6tLMcR2", "NORMAL"),
	("u003", "Matheus", "matheus@email.com", "$2y$12$//5rjmqEYNmBa6TdcU6InOsQtcF9ZiwPQ7K.zlpMSZStoeZHGtfxu", "ADMIN");

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT UNIQUE NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO posts (id, creator_id, content)
VALUES
	("p001", "u001", "Bora pra praia!"),
	("p002", "u002", "Saudades de vocês :("),
	("p003", "u003", "Vamos no bar hoje?");


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p002", 1),
    ("u002", "p001", 1),
    ("u001", "p003", 1),
    ("u002", "p003", 0),
    ("u003", "p001", 1);

-- UPDATE posts
-- SET dislikes = 1
-- WHERE id = "p003";

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;