export const calculateRoot = (tasks, deps) => (
  tasks?.filter((task) =>
    !deps.some(dep => dep.successor_id === task.id))
    .map(task => task.id));

export const calculateMaxDepth = (tasks, deps) => {
  const dependencyGraph = deps?.reduce((graph, dependency) => {
    const { predecessor_id, successor_id } = dependency;
    // first time predecessor is enountered
    // initialize empty array
    if (!graph[predecessor_id]) {
      graph[predecessor_id] = [];
    }
    graph[predecessor_id].push(successor_id);
    return graph;
  }, {});

  const roots = calculateRoot(tasks, deps);

  // calculate the depth of each node in the graph.
  const calculateDepth = (node, memo = {}) => {
    // already calculated, return it to avoid recalculation
    if (memo[node]) {
      return memo[node];
    }

    const successors = dependencyGraph[node];
    if (!successors || successors.length === 0) {
      // node has no successors
      memo[node] = 1;
      return 1;
    }
    // Calculate the depth of each successor, then add 1 (for the current node) to get the node's depth.
    const depths = successors.map(successor => calculateDepth(successor, memo));
    memo[node] = 1 + Math.max(...depths);
    return memo[node];
  }

  // Calculating the max depth starting from each root node
  const maxDepth = roots?.length
    ? Math.max(...roots.map(start => calculateDepth(start)))
    : 0;

  return maxDepth;
};
