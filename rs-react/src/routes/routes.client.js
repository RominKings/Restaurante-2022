import {ClientLayout, BasicLayout} from "../Layouts";
import { SelectTable } from "../pages/Client";


const routesClient = [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exct: true,
    }
]

export default routesClient;