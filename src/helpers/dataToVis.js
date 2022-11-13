export const dataToVis = (data) => {
    //================================================//
    let nodes = [];
    let links = [];
    const DEFAULT_DIST = 30;
    const NODE_SIZE = 12;
    //================================================//
    const addMainNode = (node) => {
        node.size = 50;
        node.isParent = true;
        nodes.push(node);
    };

    const addChildNode = (
        parentNode,
        childNode,
        size = NODE_SIZE,
        distance = DEFAULT_DIST
    ) => {
        childNode.size = size;
        nodes.push(childNode);
        links.push({
            source: parentNode.id,
            target: childNode.id,
            distance,
        });
    };
    //================================================//

    const parentNode = data.parentData;
    const childNodes = data.childrenData;
    childNodes.map((childNode) => addChildNode(parentNode, childNode));
    if (parentNode.isParent) addMainNode(parentNode);

    return { nodes, links };
};

// const connectMainNodes = (source, target) => {
//     links.push({
//         source,
//         target,
//         distance: DEFAULT_DIST,
//     });
// };
