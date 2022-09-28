import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStore, Observer } from "mobx-react-lite";
import { Menu } from "antd";
import { checkAuth, getRouteByPath, initRouteAttrbutes } from "@tools/index";
import { AppContext } from "@compoments/appProvider/appContext";
import style from "./styles.less";

const getOpenKeys = path => {
    const arr = path.split("/").filter(v => v);
    const out = [];
    for (let i = 1, len = arr.length; i <= len; i++) {
        const slis = arr.slice(0, i);
        out.push(`/${slis.join("/")}`);
    }
    return out;
};

const MenuCom = props => {
    const { routes: R, sliderTheme } = useContext(AppContext);
    const routes = initRouteAttrbutes(R);
    const location = useLocation();
    const navigate = useNavigate();
    const { targetRoute } = props;
    const { g_userAuth, g_userInfo } = props.gStore;
    const store = useLocalStore(() => ({
        menus: [],
        openKeys: getOpenKeys(location.pathname),
        activeKeys: ""
    }));

    useEffect(() => {
        store.activeKeys = `${getRouteByPath(targetRoute, location.pathname)?.path}`;
    }, [location]);

    const getMenu = (routes, menu = [], path = "") => {
        routes.forEach(route => {
            if (route.auths && !checkAuth(route.auths, g_userAuth)) {
                return;
            }
            if (route.logined && !g_userInfo) {
                return;
            }
            if (route.menu) {
                const menuITem = {
                    path: route.fullPathName,
                    key: route.fullPathName,
                    title: route.title,
                    label: route.title,
                    routeid: route.routeid
                };
                if (route.children?.length) {
                    menuITem.children = [];
                    getMenu(route.children, menuITem.children, menuITem.path);
                }
                menu.push(menuITem);
            } else if (route.children?.length) {
                getMenu(route.children, menu, route.path);
            }
        });
        return menu;
    };

    const onOpenChange = e => {
        store.openKeys = Array.from(new Set([...e]));
    };

    useEffect(() => {
        store.menus = getMenu(routes);
    }, []);

    return (
        <div className={style[`menu-${sliderTheme || "light"}`]}>
            <Observer>
                {() => {
                    return (
                        <Menu
                            mode='inline'
                            theme={sliderTheme || "light"}
                            onClick={e => {
                                navigate(e.key);
                                store.activeKeys = e.key;
                            }}
                            defaultOpenKeys={store.openKeys}
                            defaultSelectedKeys={[store.activeKeys]}
                            selectedKeys={[store.activeKeys]}
                            openKeys={store.openKeys}
                            onOpenChange={onOpenChange}
                            id={sliderTheme || "light"}
                            items={store.menus}
                        />
                    );
                }}
            </Observer>
        </div>
    );
};

export default MenuCom;
