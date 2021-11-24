const { Router } = require("express");
const { searchTopic, getArticleByUrlString } = require("../db.js");

const router = Router();

if (process.env.NODE_ENV == "production") {
    router.use((request, response, next) => {
        request.headers["x-forwarded-proto"].startsWith("https")
            ? next()
            : response.redirect(`https://${request.hostname}${request.url}`);
    });
}

router.get("/search-topic/:name", async (request, response) => {
    try {
        const { name } = request.params;
        const topics = await searchTopic(name);
        if (!topics || topics.length == 0) {
            return response.json({ message: "No such topics in the database" });
        }
        response.json(topics);
    } catch (error) {
        console.log(`[GET /search-topic/${request.params}]`, error);
    }
});

router.get("/:article", async (request, response) => {
    try {
        const { article } = request.params;
        const articleData = await getArticleByUrlString(article);
        if (!articleData || articleData.length == 0) {
            return response.redirect("/");
        }
        response.json(articleData);
    } catch (error) {
        console.log(`[GET /${request.params}`, error);
    }
});

module.exports = router;
