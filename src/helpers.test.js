import { calculateRoot, calculateMaxDepth } from './helpers';

const tasks = [
  { id: '1', name: 'Task 1' },
  { id: '2', name: 'Task 2' },
  { id: '3', name: 'Task 3' },
  { id: '4', name: 'Task 4' }
];
const deps = [
  { predecessor_id: '1', successor_id: '2' },
  { predecessor_id: '2', successor_id: '3' }
];

const tasksWithoutDeps = [
  { id: '1', name: 'Task 1' },
  { id: '2', name: 'Task 2' }
];

describe('calculateRoots', () => {
  it('finds root tasks correctly in a standard scenario', () => {
    const result = calculateRoot(tasks, deps);
    expect(result).toEqual(['1', '4']);
  });

  it('identifies all tasks as roots when there are no dependencies', () => {
    const result = calculateRoot(tasksWithoutDeps, []);
    expect(result).toEqual(['1', '2']);
  });

  it('returns an empty array when tasks and dependencies are empty', () => {
    const result = calculateRoot([], []);
    expect(result).toEqual([]);
  });
});

describe('calculateMaxDepth', () => {
  it('calculates max depth', () => {
    expect(calculateMaxDepth(tasks, deps)).toBe(3);
  });

  it('returns 0 for tasks with no deps', () => {
    expect(calculateMaxDepth(tasks, [])).toBe(1);
  });
});
