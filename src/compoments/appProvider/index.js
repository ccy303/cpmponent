import React, { Children, useContext } from "react";
import { AppConfig } from "./appcontext";
export default (children, ...other) => {
    console.log(other);
    return <AppConfig.Provider {...other}>{children}</AppConfig.Provider>;
};
