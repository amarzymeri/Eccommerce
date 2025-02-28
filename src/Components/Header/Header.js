import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return <div className="bg-red-500 p-4">
        <Link to={"/"}><h1 className="text-xl text-white font-bold">Amar's shop</h1></Link>
    </div>
}

export default Header;