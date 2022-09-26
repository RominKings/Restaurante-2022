import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from  "./routes";
import {map} from "lodash";

export function Navegacion(){
    return(
        
            <Routes>
                {map(routes, (route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        element={
                            <route.layout>
                                <route.component/>
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
        
        
    );
}