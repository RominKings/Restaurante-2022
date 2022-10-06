//RUTAS DE TODAS LAS PAGINAS DEL FRONT DE ADMIN
import {AdminLoyout} from "../Layouts";
import {HomeAdmin, UsersAdmin, CategoriasAdmin,TablesAdmin, ProductAdmin} from "../pages/Admin";

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLoyout,
        component: HomeAdmin,
    },

    {
        path: "/admin/users",
        layout: AdminLoyout,
        component: UsersAdmin,
        exact: true,
    },
    
    {
        path:"/admin/categories",
        layout: AdminLoyout,
        component: CategoriasAdmin,
        exact: true,
    },
    {
        path:"/admin/tables",
        layout: AdminLoyout,
        component: TablesAdmin,
        exact: true,
    },

    {
        path:"/admin/products",
        layout: AdminLoyout,
        component: ProductAdmin,
        exact: true, 
    },

];

export default routesAdmin;