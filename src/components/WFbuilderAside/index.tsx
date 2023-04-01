import React from 'react';
import {AiOutlineEdit} from 'react-icons/ai'
import {BiMailSend} from 'react-icons/bi'
import {RiSwapBoxLine,RiSettingsLine,RiPlayListAddLine,RiCalculatorLine,RiBook2Line} from 'react-icons/ri'

interface asideNodeData{
  icon:any;
  label:string;
  nodeName:string;
}

export const asideNode:asideNodeData[]=[
  {
   icon:<AiOutlineEdit/>,
   label:'State',
   nodeName:'custom',
  },
  {
   icon:<BiMailSend/>,
   label:'Email',
   nodeName:'custom',
  },
  {
   icon:<RiSwapBoxLine/>,
   label:'API integration',
   nodeName:'custom',
  },
  {
   icon:<RiSettingsLine/>,
   label:'Automation',
   nodeName:'custom',
  },
  {
   icon:<RiPlayListAddLine/>,
   label:'Assign',
   nodeName:'custom',
  },
  {
   icon:<RiCalculatorLine/>,
   label:'Pricing Calculator',
   nodeName:'custom',
  },
  {
   icon:<RiBook2Line/>,
   label:'Document',
   nodeName:'custom',
  },
]


 const WFbuilderAside=() => {

  const onDragStart = (event:any, nodeData:any) => {

    const { icon, ...newNodeData } = nodeData;
    event.dataTransfer.setData('application/nodeData', JSON.stringify(newNodeData));
    event.dataTransfer.effectAllowed = 'move';
   
  };

  return (
    <aside className='workflow-navigation-container'>
   
      <ul className='viewport-nav__list'>
        {
          asideNode.map((node,index)=>{
            return <li key={index} className='viewport-nav__item' onDragStart={(event) => onDragStart(event, node)} draggable>
                    {node.icon}
                    <span>{node.label}</span>
                    <span className='drag-icon'></span>
                </li>
          })
        }
       
      </ul>

    </aside>
  );
};
export default WFbuilderAside;