# Dependency Graph visualization

A properly formed construction schedule can be described as an acyclic
directed tree with one to many roots where the tasks are nodes, and dependencies
are edges. While not common, there is occasionally more than one relationship
of differing type between two tasks.

Use this template project to demonstrate skills in several areas by loading
the graph data, analyzing, and visualizing it.

Expect to spend no more than a couple hours to finish this project.

## Data Primitives

The sample data provided can be directly imported from files in 'src/data'
for experimentation purposes.

  * projects {id, name}
  * tasks {id, name}
  * dependencies {depend\_type, predecessor\_id, successor\_id}

## Mocked API

Data is mocked for reliability and can be accessed using the api module.

```
    import api from './api';

    api.fetchProjects().then(projects => console.log(`${projects.length} projects loaded`);
    // or
    const projects = await api.fetchProjects();

    const tasks = await api.fetchTasks(projectId);
    const deps = await api.fetchDependencies(projectId);
```

## Requirements

  * Fetch projects, tasks, and dependencies from api
  * Store data in a state management library, e.g. Redux
  * Add your own component styles, whether css files, inline, scss, etc.
  * Compute graph statistics
    - task count
    - dependency count
    - root count (i.e. a task that isn't a successor)
    - longest path between a root and a leaf
  * Integrate a 3rd party directed-graph visualization library
    - Render tasks as nodes, use dependencies to create edges.
    - Be aware most existing libraries seem adequate for small graphs
      but don't perform well on large graphs. The solution will not
      be assessed on the performance of the third party library.

You are free to restructure or entirely rewrite the provided
react components as long as it meets requirements.

## Assessment Criteria

The highest priority is seeing you show your skills as a professional
engineer -- an incomplete solution that's well-factored, has testable code
with documentation where necessary is better than a complete and sloppy solution.

  * Includes required visual elements
  * Uses state management correctly
  * Improvement in UI/UX/usability using styles
  * Accuracy and efficiency in computing graph statistics
  * Any extras you feel appropriate to bring the project up to your standards
