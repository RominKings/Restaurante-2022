//RUTAS DE TODAS LAS PAGINAS DEL FRONT DE ADMIN
import {AdminLoyout} from "../Layouts";
import {OrdersAdmin, UsersAdmin, CategoriesAdmin,TablesAdmin,ProductAdmin, TableDetailsAdmin} from "../pages/Admin";

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLoyout,
        component: OrdersAdmin,
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
        component: CategoriesAdmin,
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

    {
        path:"/admin/table/:id",
        layout: AdminLoyout,
        component: TableDetailsAdmin,
        exact: true, 
    },
];

export default routesAdmin;