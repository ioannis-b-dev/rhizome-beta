import { useGlobalContext } from "./helpers/context";
import FDgraph from "./components/FDgraph";
import Loader from "./Loader";
import useScreenSize from "./helpers/useScreenSize";

const Display = () => {
    const { data, loading } = useGlobalContext();
    const { screenSize } = useScreenSize();

    return (
        <svg width={screenSize.width} height={screenSize.height}>
            {data ? (
                <FDgraph
                    data={data}
                    width={screenSize.width}
                    height={screenSize.height}
                />
            ) : loading ? (
                <Loader x={screenSize.width / 2} y={screenSize.height / 2} />
            ) : (
                <text
                    x={screenSize.width / 2}
                    y={screenSize.height / 2}
                    fill="white"
                >
                    {"Input a data origin to begin"}
                </text>
            )}
        </svg>
    );
};

export default Display;
