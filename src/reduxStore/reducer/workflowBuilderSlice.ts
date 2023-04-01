import { createSlice } from '@reduxjs/toolkit'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

export type NodeData = {
  color: string;
};
export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeColor: (nodeId: string, color: string) => void;
};

export interface droppedDataType {
  nodeData?: number;
  edgeData?: number;
}

const initialState: droppedDataType ={
  nodeData:undefined,
  edgeData: undefined
};

export const workflowBuilderSlice = createSlice({
  name: 'workflowBuilder',
  initialState,
  reducers: {
    addNodes: (state:any,action:any) => {

      //console.log("payload:",action.payload)
      state.nodeData=action.payload;

    },
    deleteNode: (state:any,action:any) => {

    //  state.push(action);
    state.nodeData=action.payload;
    },
    editNode: (state:any,action:any) => {

     // state.push(action);

    },
    
   
  },
})

// Action creators are generated for each case reducer function
export const { addNodes,deleteNode ,editNode } = workflowBuilderSlice.actions

export default workflowBuilderSlice.reducer