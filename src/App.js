import Display from "./Display";
import "./styles.scss";
import { Example } from "./features/Example";
const App = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>
                    RHIZOME<span>BETA</span>
                </h1>
            </header>
            <Display />
            <Example />
            {/* <Gui /> */}
        </div>
    );
};

export default App;
