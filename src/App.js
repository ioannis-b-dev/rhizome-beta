import Display from "./Display";
import "./styles.scss";
import { Panel } from "./features/Panel";
import Console from "./components/Console/Console";
// import NodeInfo from "./components/NodeInfo/NodeInfo";
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
            <Console />
            {/* <NodeInfo posX={200} posY={200} /> */}
        </div>
    );
};

export default App;
