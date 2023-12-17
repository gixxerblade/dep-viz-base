import React, { useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import "./dependency_viz.css";
import api from './api';
import { QueryKeys } from './QueryKeys';
import DisplayGraph from './DisplayGraph';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { calculateRoot, calculateMaxDepth } from './helpers';

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const initialProject = { id: '', name: '' };

export const DependencyVisualization = () => {
  const [selectedProject, setSelectedProject] = useState(initialProject);
  const queryClient = useQueryClient();

  // function to fetch the projects to populate the <select />
  const { data: projects } = useQuery({
    queryKey: [QueryKeys.PROJECTS],
    queryFn: () => api.fetchProjects(),
  });

  // function to fetch the deps and tasks
  const getGraphData = async () => {
    if (selectedProject.id) {
      const [deps, tasks] = await Promise.all([
        api.fetchDependencies(selectedProject.id),
        api.fetchTasks(selectedProject.id),
      ]);
      if (deps?.length && tasks?.length) {
        return { deps, tasks };
      }
      return null;
    }
  }

  // useQuery funciton to fetch the deps and tasks
  // Only ran when a project is selected
  // refetchOnWindowFocus: false prevents the query from running again if the window loses focus
  const { data, error } = useQuery({
    queryKey: [QueryKeys.GRAPH, selectedProject.id],
    queryFn: getGraphData,
    enabled: !!selectedProject.id,
    refetchOnWindowFocus: false,
  });

  // method used to set the selected project
  const handleChangeProjectType = (e) => {
    e.preventDefault();
    // if there is a value set it otherwise set it to nothing
    if (e.target.value) {
      const newProject = projects.find((proj) => proj.id === e.target.value);
      setSelectedProject(newProject);
    } else {
      setSelectedProject(initialProject);
    }
    queryClient.invalidateQueries([QueryKeys.GRAPH]);
  }

  const rootLength = calculateRoot(data?.tasks, data?.deps)?.length || 0;
  const maxDepth = calculateMaxDepth(data?.tasks, data?.deps);

  return (
    <Container className="depVizContainer" maxWidth="xs">
      <Typography variant="h2" sx={{ textAlign: 'center' }}>Project</Typography>
      <Box sx={{ marginY: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Project Type</InputLabel>
          <Select
            data-testid="select"
            label="Project Type"
            labelId="select-label"
            onChange={handleChangeProjectType}
            value={selectedProject.id}
          >
            {/*
            map the projects from the useQuery into the option element. Key is required in 
            case the order comes back different.
          */}
            {projects?.map((project) => (
              <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ marginY: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Graph Stats</StyledTableHeaderCell>
              <StyledTableHeaderCell align="center">Value</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell>Task Count</TableCell>
              <TableCell align="center" data-testid="task-count" >{data?.tasks?.length || 0}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Dependency Count</TableCell>
              <TableCell align="center" data-testid="dep-count">{data?.deps?.length || 0}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Root Count</TableCell>
              <TableCell align="center" data-testid="root-count">{rootLength}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Max Depth</TableCell>
              <TableCell align="center" data-testid="max-depth">{maxDepth}</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Typography sx={{ color: 'red' }} variant="h2">
          There was an error fetching the Graph Visualization
        </Typography>
      )}
      <Typography variant="h4" sx={{ textAlign: 'center' }}>Graph Visualization</Typography>
      <DisplayGraph nodes={data?.tasks} edges={data?.deps} />
    </Container>
  );
};
