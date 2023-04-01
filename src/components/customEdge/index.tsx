import React, { memo } from "react";
import { Button } from "react-bootstrap";
import { MdRemoveCircleOutline } from "react-icons/md";
import { getBezierPath, useReactFlow } from "reactflow";

const foreignObjectSize = 16;
const CustomEdge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
}:any) => {
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});
	const { setEdges } = useReactFlow();

	const onEdgeClick = (evt:any, id:any) => {
		evt.stopPropagation();
		setEdges((edges) => edges.filter((ed) => ed.id !== id));
	};

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
			<foreignObject
				width={foreignObjectSize}
				height={foreignObjectSize}
				x={labelX - foreignObjectSize / 2}
				y={labelY - foreignObjectSize / 2}
				className="edgebutton-foreignobject node-toolbar"
				requiredExtensions="http://www.w3.org/1999/xhtml"
			>
				
					<Button
                       
                        variant="danger"
						className=" d-flex justify-content-center align-items-center p-0"
						onClick={(event) => onEdgeClick(event, id)}
					>
						<MdRemoveCircleOutline />
					</Button>
			
			</foreignObject>
		</>
	);
};
export default memo(CustomEdge);
