import { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import ArticleEdit from "./ArticleEdit";
import ArticleView from "./ArticleView";
import Menu from "./Menu";
import RandomArticles from "./RandomArticles";
import SearchBar from "./SearchBar";
import Welcome from "./Welcome";
import Footer from "./Footer";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <SearchBar />
                </header>
                <nav>
                    <Menu />
                    <RandomArticles />
                </nav>
                <main>
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
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
