import React, { useMemo } from 'react';
import DagreGraph from 'dagre-d3-react'
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const DisplayGraph = ({ nodes, edges }) => {
  const dagreNodes = useMemo(() => nodes?.map(node => {
    if (!nodes.length) {
      return [];
    }
    return {
      id: node.id,
      label: node.name,
      config: {
        style: `fill: #${Math.floor(Math.random() * 16777215).toString(16)}`,
      }
    }
  }), [nodes]);

  const dagreEdges = useMemo(() => edges?.map(edge => {
    if (!edges.length) {
      return [];
    }
    return {
      source: edge.predecessor_id,
      target: edge.successor_id,
    }
  }), [edges]);

  if (!nodes?.length || !edges?.length) {
    return (
      <Typography sx={{ textAlign: 'center', paddingTop: 3, color: 'green' }} variant="h4">
        Select a Project Type
      </Typography>
    );
  }

  const canvasWidth = edges?.length < 10 ? 500 : 1000;
  const canvasHeight = edges.length > 10 ? canvasWidth / 2 : 500;

  return (
    <DagreGraph
      config={{
        align: 'DL',
        rankdir: 'TB',
        ranker: 'longest-path'
      }}
      fitBoundaries
      height={canvasHeight}
      links={dagreEdges}
      nodes={dagreNodes}
      shape='rect'
      width={canvasWidth}
      zoomable
    />
  );
};

export default DisplayGraph;

DisplayGraph.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  edges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    source: PropTypes.string,
    target: PropTypes.string,
  })),
};