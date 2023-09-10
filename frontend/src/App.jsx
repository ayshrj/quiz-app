import "./App.css";
import { Quiz } from "./components/Quiz";
import { Input } from "./components/Input";
// import { SearchApp } from "./components/SearchApp";
import SearchBox from "./components/SearchBox";

function App() {
  return (
    <div className="App">
      <SearchBox />
      <Quiz />
    </div>
  );
}

export default App;
