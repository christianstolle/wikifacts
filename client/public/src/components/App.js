import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticleEdit from "./ArticleEdit";
import ArticleView from "./ArticleView";
import CreateArticle from "./CreateArticle";
import Menu from "./Menu";
import RandomArticles from "./RandomArticles";
import SearchBar from "./SearchBar";
import Welcome from "./Welcome";
import Footer from "./Footer";
import HowTo from "./HowTo";

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
                        <Route path="/participate" exact>
                            <CreateArticle />
                        </Route>
                        <Route path="/how-to" exact>
                            <HowTo />
                        </Route>
                        <Route path="/:article" exact>
                            <ArticleView />
                        </Route>
                        <Route path="/:article/edit" exact>
                            <ArticleEdit />
                        </Route>
                    </Switch>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
