import React, { useContext, useEffect } from "react";
import { AppContext } from "@compoments/appProvider/appContext";
// import { appConfig } from "@root/appConfig";
import gStore from "@src/store/global";
import NoMatch from "@compoments/noMatch";
import { checkAuth, getRouteByPath, findRoute } from "@tools/index";
import { useLocalStore, Observer } from "mobx-react-lite";
import {
    HashRouter,
    Routes,
    Route,
    useNavigate,
    Outlet,
    useLocation,
    Navigate
} from "react-router-dom";
import { runInAction } from "mobx";
const renderRoute = routes => {
    return (
        <>
            {routes.map(route => {
                const {
                    layout: Layout,
                    component: Component = () => {
                        return <></>;
                    },
                    children,
                    logined
                } = route;

                let { path } = route;
                path = path.replace(/\//, "");
                const CheckAuth = () => {
                    const location = useLocation();
                    if (logined && !gStore.g_userInfo) {
                        return <Navigate to={`/login?redict_uri=${location.pathname}`} />;
                    }
                    if (!checkAuth(route.auths, gStore.g_userAuth)) {
                        return <Navigate to={`/403`} />;
                    }
                    return (
                        <>
                            <Component gStore={gStore} location={location} />
                        </>
                    );
                };

                if (!children) {
                    if (Layout) {
                        return (
                            <Route
                                key={path}
                                element={<Layout targetRoute={route} gStore={gStore} />}
                            >
                                <Route path={path} element={<CheckAuth />} />
                            </Route>
                        );
                    }
                    return <Route key={path} path={path} element={<CheckAuth />} />;
                } else {
                    if (Layout) {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Layout targetRoute={route} gStore={gStore} />}
                            >
                                <Route index element={<NoMatch />} />
                                {renderRoute(children)}
                                <Route path='*' element={<NoMatch />} />
                            </Route>
                        );
                    }
                    return (
                        <Route key={path} path={path}>
                            <Route index element={<NoMatch />} />
                            {renderRoute(children)}
                            <Route path='*' element={<NoMatch />} />
                        </Route>
                    );
                }
            })}
        </>
    );
};

const Main = props => {
    const store = useLocalStore(() => ({
        state: false
    }));
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                let uInfo = {};
                uInfo = await appConfig.getUserFun();
                runInAction(() => {
                    gStore.g_userInfo = uInfo.userInfo;
                    gStore.g_userAuth = uInfo.auth;
                });
                try {
                    const res = await appConfig?.appWillMount({ ...uInfo });
                    gStore.g_customData = res;
                } catch (err) {
                    throw new Error(err);
                }
                (location.pathname === "/login" || location.pathname === "/") &&
                    navigate(appConfig.rootPath);
                store.state = true;
            } catch (err) {
                store.state = true;
                if (appConfig.getUserFunErr) {
                    appConfig.getUserFunErr?.(err);
                    return;
                }
                let flag = 0;
                for (; flag < routes.length; flag++) {
                    // 查找路由是否存在路由列表中,不存在重定向到登录
                    const res = getRouteByPath(routes[flag], location.pathname);
                    if (!res) {
                        continue;
                    } else {
                        break;
                    }
                    // if (!res.route.logined) {
                    //     // navigate(location.pathname);
                    //     break;
                    // } else {
                    //     // 查找第一个不需要登录就能查看的路由
                    //     const target = findRoute(
                    //         routes.filter(v => v.path !== "/login"),
                    //         "logined",
                    //         false
                    //     );
                    //     navigate(target?.fullPathName || "/login");
                    //     break;
                    // }
                }
                if (flag == routes.length) {
                    navigate("/login");
                }
            }
        })();
    }, []);
    location.pathname === "/" && store.state && navigate(`${appConfig.rootPath}`);
    return <Observer>{() => <>{store.state ? <Outlet /> : <></>}</>}</Observer>;
};

const PermissionRoute = props => {
    const appContext = useContext(AppContext);
    console.log(123, appContext);
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Main />}>
                    {/* {renderRoute(routes)} */}
                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default PermissionRoute;
