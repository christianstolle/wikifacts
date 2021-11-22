import { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <header></header>
            <nav>
                <SearchBar />
                <RandomArticles />
                <Menu />
            </nav>
            <section className="content">
                <Switch>
                    <Route path="/" exact>
                        <Welcome />
                    </Route>
                    <Route path="/:article">
                        <ArticleView />
                    </Route>
                    <Route path="/:article/edit">
                        <ArticleEdit />
                    </Route>
                </Switch>
            </section>
        </BrowserRouter>
    );
}
