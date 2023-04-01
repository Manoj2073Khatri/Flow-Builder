import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  MarkerType,
} from 'reactflow';
import WFbuilderAside from '../../components/WFbuilderAside';
import CustomNode from '../../components/customNode';
import customEdge from '../../components/customEdge';


const initialNodes:any = [];

let id = 0;
const getId = () => `${id++}`;

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { 
  custom: CustomNode 
};

const edgeTypes = {
	customEdge: customEdge,
};

const WorkFlowBuilder = () => {

  const reactFlowWrapper = useRef<any | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>();
  const [nodeName,setNodeName]=useState<any>(selectedNode?.data?.label);
  

  const onConnect = useCallback((params:any) => { 

    // Object.assign(params, {
    //   markerEnd:{
    //     type: MarkerType.ArrowClosed,
    //     width: 15,
    //     height: 15,
    //     color: '#0acf97',
    //   },
    //   style: {
    //     strokeWidth: 1,
    //     stroke: '#0acf97',
    //   },
    //   animated:true,

    // });

    
       // setEdges((eds) => addEdge(params, eds))
        setEdges((eds) => {
           debugger
   
          const parentNode = nodes?.find((x) => x.id == params.source);
          const settings:any = {};
          if (parentNode && parentNode.data.label === "Automation") {
            const lines = eds.filter((x) => x.source === params.source);
            // If only 1 edge, it should be green other wise we have to check if there are any previously added edge with different style
            if (lines.length <= 0) {
              settings.style = { stroke: "#0acf97" };
              settings.data = { type: "success" };
            } else {
              // Swipe type of new edge
              const type = lines[0].data.type;
              settings.style = { stroke: type === "success" ? "red" : "#0acf97" };
             // settings.markerEnd = { stroke: type === "success" ? "red" : "#0acf97" };
              settings.data = { type: type === "success" ? "fail" : "success" };
            }
          }
          return addEdge(
            {
              ...params,
              type: "customEdge",
              markerEnd: {
               // type: MarkerType.Arrow,
                type: MarkerType.ArrowClosed,
                width: 15,
                height: 15,
               // color: '#0acf97',
              },
              style: {
                strokeWidth: 1,
              //  stroke: '#0acf97',
              },
              animated:true,
              ...settings,
            },
            eds
          );
        });
  
  }, [setEdges, nodes]);

  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event:any) => {

      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const unparseData=event.dataTransfer.getData('application/nodeData');
      const nodeData = JSON.parse(unparseData);
     

      // check if the dropped element is valid
      if (typeof nodeData === 'undefined' || !nodeData) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });


      const newNode = {
        id: getId(),
        type:nodeData.nodeName,
        position,
        data: { label: `${nodeData.label}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  useEffect(() => {

       if(nodes){

          const select=nodes.find((data,index)=>data.selected===true);
           setSelectedNode(select);
       }

    return () => {
      
    }
  }, [nodes])





  
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);


  return (
    <div className="dndflow">

      <ReactFlowProvider>
        <WFbuilderAside />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <Controls />
            <MiniMap style={{height:120}} zoomable pannable />
 
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      
      </ReactFlowProvider>
    </div>
  );
};

export default WorkFlowBuilder;
