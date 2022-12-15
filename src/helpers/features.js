const recursion = async (children, iterations, data) => {
    if (iterations < 0) return data;
    for (let i = 0; i < children.length; i++) {
        let parent = children[i];
        let newChildrenData = await getChildrenData(parent.id, 2);

        const { nodes, links } = dataToVis({
            parentData: parent,
            childrenData: newChildrenData,
        });
        data.nodes.push(...nodes);
        data.links.push(...links);
        iterations--;
        await recursion(newChildrenData, iterations, data);
    }
};

async function getDataTree(parent, numLinks, depth) {
    // add base case to end recursion when depth exceeds a certain value
    if (depth > 10) {
        return;
    }
    console.log(depth);
    let data = {};

    // get data for the parent page
    let parentData = await getParentData(parent);
    parentData = { ...parentData, isParent: true };
    data[parent] = parentData;

    // get data for the children pages
    let childrenData = await getChildrenData(parent, numLinks);
    data = { ...data, ...childrenData };

    // recursively get data for the children's children
    for (let child of Object.keys(childrenData)) {
        data = {
            ...data,
            ...(await getDataTree(child, numLinks, depth + 1)),
        };
    }

    return data;
}
var recursiveData = async function f(parent, iterations, data) {
    if (iterations < 0) return data;
    let newChildrenData = await getChildrenData(parent.id, 2);
    const { nodes, links } = dataToVis({
        parentData: parent,
        childrenData: newChildrenData,
    });
    data.nodes.push(...nodes);
    data.links.push(...links);

    for (let i = 0; i < newChildrenData.length; i++) {
        parent = newChildrenData[i];
        await recursiveData(parent, 2, data);
    }

    // parent = newChildrenData[0];
    console.log("CURR PARENT:", parent);
    iterations = iterations - 1;
    return f(parent, iterations, data);
};
