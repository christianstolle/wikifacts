const { Router } = require("express");
const express = require("express");
const {
    searchTopic,
    createTopic,
    getArticleByUrlString,
    updateText,
} = require("../db.js");

const router = Router();

router.use(express.json());

function headlinify(string) {
    return string.toUpperCase().replace("-", " ");
}

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
        console.log(`[GET api/search-topic/${request.params}]`, error);
    }
});

router.post("/create-topic/:name", async (request, response) => {
    try {
        const { name } = request.params;
        const topic = await createTopic(headlinify(name));
        response.json(topic);
    } catch (error) {
        console.log(`[POST api/create-topic/${request.params}]`, error);
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
        console.log(`[GET api/${request.params}`, error);
    }
});

router.put("/:article/edit", async (request, response) => {
    try {
        const { article } = request.params;
        const updatedArticle = await updateText({
            content: request.body.text,
            topic: headlinify(article),
        });
        response.json(updatedArticle);
    } catch (error) {
        console.log(`[PUT api/${request.params}/edit`, error);
    }
});

module.exports = router;
