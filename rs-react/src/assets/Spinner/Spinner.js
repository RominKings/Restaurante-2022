import React from "react";
import './Spinner.css';


export function Spinner(){

    return (
        <div class="pan-loader">
    <div class="loader"></div>
    <div class="pan-container">
        <div class="pan"></div>
        <div class="handle"></div>
    </div>
    <div class="shadow"></div>
    </div>
    )
}