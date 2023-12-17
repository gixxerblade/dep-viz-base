import React from 'react';
import { render, screen } from '@testing-library/react';
import { DependencyVisualization } from './dependency_viz';
import { useQuery } from '@tanstack/react-query';
import projects from './data/projects';
import userEvent from '@testing-library/user-event'
import dependencies from './data/dependencies';
import tasks from './data/tasks';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useQueryClient: jest.fn(() => ({ invalidateQueries: jest.fn() })),
}));

jest.mock('./api');

jest.mock('dagre-d3-react', () => {
  return function DummyDagreGraph() {
    return <div data-testid="mock-graph"></div>;
  };
});

describe('DependencyVisualization', () => {
  it('populates the project dropdown with fetched projects', () => {
    useQuery.mockReturnValue({ data: projects, isLoading: false, error: null });

    render(<DependencyVisualization />);
    const select = screen.getByRole('combobox');
    userEvent.click(select);
    projects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    });
  });

  it('displays an error message if fetching projects fails', () => {
    useQuery.mockReturnValue({ data: null, isLoading: false, error: 'Error fetching data' });
  
    render(<DependencyVisualization />);
    expect(screen.getByText('There was an error fetching the Graph Visualization')).toBeInTheDocument();
  });

  it('displays graph visualization and stats when a project is selected', () => {
    const mockGraphData = {
      deps: dependencies['a1DGZa1PY0Mc'],
      tasks: tasks['a1DGZa1PY0Mc'],
    };
  
    useQuery
      .mockReturnValueOnce({ data: projects, isLoading: false, error: null })
      .mockReturnValueOnce({ data: mockGraphData, isLoading: false, error: null });
  
    render(<DependencyVisualization />);
  
    const select = screen.getByRole('combobox');
    userEvent.click(select);

    expect(screen.getByTestId('task-count')).toHaveTextContent(5);
    expect(screen.getByTestId('dep-count')).toHaveTextContent(5);
    expect(screen.getByTestId('root-count')).toHaveTextContent(1);
    expect(screen.getByTestId('max-depth')).toHaveTextContent(4);
  });
});