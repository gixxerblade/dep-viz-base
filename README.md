# Dependency Graph visualization

## Requirements

- [x] Fetch projects, tasks, and dependencies from api
- [x] Add your own component styles, whether css files, inline, scss, etc.

- Compute graph statistics
  - [x] task count
  - [x] dependency count
  - [x] root count (i.e. a task that isn't a successor)
  - [x] longest path between a root and a leaf
- Integrate a 3rd party directed-graph visualization library
  - [x] Render tasks as nodes, use dependencies to create edges.
  - [x] Be aware most existing libraries seem adequate for small graphs
    but don't perform well on large graphs. The solution will not
    be assessed on the performance of the third party library.

## Assessment Criteria

The highest priority is seeing you show your skills as a professional
engineer -- an incomplete solution that's well-factored, has testable code
with documentation where necessary is better than a complete and sloppy solution.

- Includes required visual elements
- Uses state management correctly
- Improvement in UI/UX/usability using styles
- Accuracy and efficiency in computing graph statistics
- Any extras you feel appropriate to bring the project up to your standards
