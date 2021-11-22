import { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import ArticleEdit from "./ArticleEdit";
import ArticleView from "./ArticleView";
import Menu from "./Menu";
import RandomArticles from "./RandomArticles";
import SearchBar from "./SearchBar";
import Welcome from "./Welcome";

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <SearchBar />
            </header>
            <nav>
                <Menu />
                <RandomArticles />
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
