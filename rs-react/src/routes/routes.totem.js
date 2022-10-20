import { BasicLayout,TotemLayout} from "../Layouts";
import {ViewTableTotem} from "../pages/Totem";

const routesTotem = [
    {
      path: "/totem",
      layout: TotemLayout,
      component: ViewTableTotem,
      exact: true,
    },
  ];
  
  export default routesTotem;
  