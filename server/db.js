const spicedPg = require("spiced-pg");

const db =
    process.env.DATABASE_URL ||
    spicedPg(
        `postgres:${require("../secrets.json").DB_USER}:${
            require("../secrets.json").DB_PASS
        }@localhost:5432/wikifacts-chris`
    );

function searchTopic(string) {
    return db
        .query(`SELECT * FROM articles WHERE topic ILIKE '%${string}%'`)
        .then((result) => result.rows);
}

function createTopic(string) {
    return db
        .query(`INSERT INTO articles (topic) VALUES ($1) RETURNING *`, [string])
        .then((result) => result.rows[0]);
}

function getArticleByUrlString(string) {
    const topic = string.toUpperCase().replace("-", " ");
    return db
        .query(`SELECT * FROM articles WHERE topic = $1`, [topic])
        .then((result) => result.rows[0]);
}

function getAllTopics() {
    return db
        .query(`SELECT topic, id FROM articles`)
        .then((result) => result.rows);
}

function updateText({ content, topic }) {
    return db
        .query(
            `
    UPDATE articles SET content = $1 WHERE topic = $2 RETURNING *`,
            [content, topic]
        )
        .then((result) => result.rows[0]);
}

module.exports = {
    searchTopic,
    createTopic,
    getAllTopics,
    getArticleByUrlString,
    updateText,
};
