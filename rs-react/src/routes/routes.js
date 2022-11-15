import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import routesTotem from "./routes.totem";
import routesCocina from "./routes.cocina";
import { Error404 } from "../pages/Error404";
import { BasicLayout } from "../Layouts";

const routes = [...routesAdmin, ...routesClient,...routesTotem,...routesCocina,{
    layout: BasicLayout,
    component: Error404,
}]



export default routes;