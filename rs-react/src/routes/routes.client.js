import {BasicLayout,ClientLayout} from "../Layouts";
import {SelectTable ,Categories} from "../pages/Client";


const routesClient = [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exct: true,
    },
    {
        path: "/client/:tableNumber",
        layout: ClientLayout,
        component: Categories,
        exact: true,
    },
]

export default routesClient;