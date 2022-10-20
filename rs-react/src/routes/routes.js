import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import routesTotem from "./routes.totem";
import { Error404 } from "../pages/Error404";
import { BasicLayout } from "../Layouts";

const routes = [...routesAdmin, ...routesClient,...routesTotem, {
    layout: BasicLayout,
    component: Error404,
}]



export default routes;