<<<<<<< HEAD
import {ClientLayout, BasicLayout} from "../Layouts";
import { SelectTable } from "../pages/Client";
=======
import {BasicLayout,ClientLayout} from "../Layouts";
import {SelectTable ,Categories} from "../pages/Client";
>>>>>>> parent of a2334e1 (2.6)


const routesClient = [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exct: true,
<<<<<<< HEAD
    }
=======
    },
    {
        path: "/client/:tableNumber",
        layout: ClientLayout,
        component: Categories,
        exact: true,
    },
>>>>>>> parent of a2334e1 (2.6)
]

export default routesClient;