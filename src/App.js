import Display from "./Display";
import Gui from "./Gui";
import "./styles.scss";

const App = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>
                    RHIZOME<span>BETA</span>
                </h1>
            </header>
            <Display bgColor={"white"} />
            <Gui />
        </div>
    );
};

export default App;
