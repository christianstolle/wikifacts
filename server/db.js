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
        .query(
            `
    SELECT * FROM articles WHERE topic ILIKE '%${string}%'`
        )
        .then((result) => result.rows);
}

function getArticleByUrlString(string) {
    const topic = string.replace("-", " ");
    return db
        .query(
            `
    SELECT * FROM articles WHERE topic ILIKE '%${topic}%'`
        )
        .then((result) => result.rows[0]);
}

module.exports = {
    searchTopic,
    getArticleByUrlString,
};
