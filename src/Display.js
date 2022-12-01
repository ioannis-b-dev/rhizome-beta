import { useGlobalContext } from "./helpers/context";
import FDgraph from "./FDgraph";
import Loader from "./Loader";
import useScreenSize from "./helpers/useScreenSize";
const Display = ({ bgColor }) => {
    const { data, loading } = useGlobalContext();
    const {
        screenSize: { width, height },
    } = useScreenSize();
    return (
        <svg width={width} height={height} fill={bgColor}>
            {data ? (
                <FDgraph data={data} width={width} height={height} />
            ) : loading ? (
                <Loader x={width / 2} y={height / 2} />
            ) : (
                <text x={width / 2} y={height / 2}>
                    {"Input a data origin to begin"}
                </text>
            )}
        </svg>
    );
};

export default Display;
