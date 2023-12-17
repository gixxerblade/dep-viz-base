import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayGraph from './DisplayGraph';
import tasks from './data/tasks';
import dependencies from './data/dependencies';

// mocking library since rendering the graph is not part of the testing plan
jest.mock('dagre-d3-react', () => {
  return function DummyDagreGraph() {
    return <div data-testid="mock-graph"></div>;
  };
});

describe('DisplayGraph', () => {
  // eslint-disable-next-line jest/no-focused-tests
  it('renders the graph with required props', async () => {
    const nodes = tasks['a1DGZa1PY0Mc'];
    const edges = dependencies['a1DGZa1PY0Mc'];

    render(<DisplayGraph nodes={nodes} edges={edges} />);
    const graph = screen.getByTestId('mock-graph');
    expect(graph).toBeInTheDocument();
  });

  it('does not render the graph when props are empty', async () => {
    const { container } = render(<DisplayGraph nodes={[]} edges={[]} />);
    expect(container).toHaveTextContent('Select a Project Type');
  });
});
