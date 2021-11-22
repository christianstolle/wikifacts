const express = require("express");
const cookieSession = require("cookie-session");
const usersRouter = require("./routers/users");
const publicRouter = require("./routers/public");
const path = require("path");
const app = express();

app.use(express);

app.use(
    cookieSession({
        secret: `I'm always myself.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use("/api", usersRouter);
app.use("/", publicRouter);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
