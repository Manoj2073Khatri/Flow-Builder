import {
  Route, Routes
} from "react-router-dom";
import Layout from "./components/layout/Layout";
//toastify  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageNotFound } from "./pages/404Page/404Page";
import WorkFlowBuilder from "./pages/workFlowBuilder";

const App = () => {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route  index element={<WorkFlowBuilder />} />
          {/* <Route path="workflowBuilder" index element={<WorkFlowBuilder />} /> */}
      
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
