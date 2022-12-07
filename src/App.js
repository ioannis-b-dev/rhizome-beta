import Display from "./Display";
import "./styles.scss";
import { Panel } from "./features/Panel";
const App = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>
                    RHIZOME<span>BETA</span>
                </h1>
            </header>
            <Display />
            <Panel />
        </div>
    );
};

export default App;
