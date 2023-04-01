import { memo, useEffect, useState } from "react";
import {
  Handle,
  Position,
  NodeToolbar,
  useReactFlow,
  useStore,
  getConnectedEdges,
} from "reactflow";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import Button from "react-bootstrap/Button";
import { asideNode } from "../WFbuilderAside";
import { Form, Offcanvas } from "react-bootstrap";





const useConnectable = (id:any, direction:any) => {
  const edgesCount = useStore((store) => store.edges.length);
  const { getNode, getEdges } = useReactFlow();
  const [hasConnections, setHasConnections] = useState(false);

  useEffect(() => {
    setHasConnections(() => {
      // Allow more than 2 connection if not logical component
      const node:any = getNode(id);
      if (node && node.data.label !== "Automation") {
        return false;
      }
      // Allow only 2 connection since these are logical connections
      const edges = getConnectedEdges([node], getEdges()).filter(
        (e:any) => e[direction] === id
      );
      return edges.length > 1;
    });
  }, [getNode, getEdges, id, edgesCount, direction]);

  return hasConnections;
};

const CustomNode = ({id, data }: any) => {
  const [node, setNode] = useState<any>();
  const { setNodes, getEdges, setEdges } = useReactFlow();
  const hasSourceConnections = useConnectable(id, "source");
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let nodeData: any = asideNode.find((node) => node.label === data.label);

      setNode(nodeData);
    }

    return () => {
      isMounted = false;
    };
  }, []);


  const onNodeDelete = (evt:any, id:any) => {
		evt.stopPropagation();
		setNodes((nodes) => nodes.filter((node) => node.id !== id));
		// remove all edges joined with this node also
		const edgeIds = getEdges()
			.filter((ed) => ed.source === id || ed.target === id)
			.map((ed) => ed.id);
		setEdges((edges) => edges.filter((ed) => !edgeIds.includes(ed.id)));
	};

  const onNodeEdit = (evt:any, id:any) => {

		 evt.stopPropagation();
     setShow(true)
		

	};




  return (
    <>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Edit node</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Edit node label </Form.Label>
                <Form.Control type="input" placeholder=""  value={} onChange={}/>
              </Form.Group>
            </Form> */}
            <Button variant="primary" onClick={handleClose} className="me-2">Close</Button>
           
          </Offcanvas.Body>
    </Offcanvas>
      



      <NodeToolbar isVisible={data.toolbarVisible} position={Position.Left}>
        <div className="node-toolbar">
          <Button
            variant="outline-danger"
            className="me-2"
            onClick={(e) => onNodeDelete(e, id)}
          >
            <AiOutlineDelete />
          </Button>

          <Button 
            variant="outline-info"
            onClick={(e) => onNodeEdit(e, id)}
            >
            <AiOutlineEdit />
          </Button>
        </div>
      </NodeToolbar>
      <div className="d-flex justify-content-center align-items-center">
        <div className="customNode">{node?.icon}</div>
        <div className="customNode-info">
          <small>{node?.label}</small>
          <small>Type:{node?.label}</small>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        //isValidConnection={(connection) => connection.source === 'some-id'}
        // onConnect={(params) => console.log('handle onConnect', params)}
        //isConnectable=false,
        className="in-connecter"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        //isValidConnection={(connection) => connection.source === 'some-id'}
        // onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={!hasSourceConnections}
        className="out-connecter"
      />
    </>
  );
};

export default memo(CustomNode);
