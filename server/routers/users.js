const { Router } = require("express");
const {
    //
} = require("../db.js");

const router = Router();

if (process.env.NODE_ENV == "production") {
    router.use((request, response, next) => {
        request.headers["x-forwarded-proto"].startsWith("https")
            ? next()
            : response.redirect(`https://${request.hostname}${request.url}`);
    });
}

module.exports = router;
