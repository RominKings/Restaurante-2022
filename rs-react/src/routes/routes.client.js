import {ClientLayout} from "../Layouts";
import {Home} from "../pages/Client";


const routesClient = [
    {
        path: "/",
        layout: ClientLayout,
        component: Home,
        exct: true,
    }
]

export default routesClient;