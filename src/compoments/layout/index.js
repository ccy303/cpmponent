import React, { useContext, useEffect } from "react";
import Header from "@compoments/header";
import Menu from "@compoments/menu";
import { Layout, Breadcrumb, Spin } from "@compoments/antd";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Observer, useLocalStore, observer } from "mobx-react-lite";
import { getBread, getRouteByPath } from "@tools/index";
import { AppContext } from "@compoments/appProvider/appContext";
import gStore from "@src/store/global";
import style from "./styles.less";

const BreadcrumbLink = props => {
    const { path, title, target, disabled } = props.breadcrumb;
    if (/^http/.test(path)) {
        return (
            <a href={path} target={target}>
                {title}
            </a>
        );
    }
    if (!path || disabled) {
        return <>{title}</>;
    }
    return <Link to={path}>{title}</Link>;
};

const SpinC = observer(() => {
    return (
        <>
            {!!gStore.g_loading.visible ? (
                <div className={style.spin}>
                    <Spin spinning={!!gStore.g_loading.visible} tip={gStore.g_loading.text} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
});

const LayoutUI = props => {
    const { targetRoute } = props;

    const { sliderTheme } = useContext(AppContext);

    const store = useLocalStore(() => ({
        breadcrumb: []
    }));

    const location = useLocation();

    useEffect(() => {
        const custom = getRouteByPath(targetRoute, location.pathname)?.route?.breadcrumb;
        store.breadcrumb = Array.isArray(custom)
            ? custom
            : getBread(targetRoute, location.pathname);
    }, [location]);

    return (
        <Layout className={style.warp}>
            <Layout.Header className={style.header}>
                <Header {...props} />
            </Layout.Header>
            <Layout>
                <Layout.Sider
                    className={style.sider}
                    style={{
                        backgroundColor: {
                            dark: "#1e1e2d",
                            light: "#fff"
                        }[sliderTheme || "light"]
                    }}
                >
                    <Menu {...props} />
                </Layout.Sider>
                <Layout.Content className={style.content}>
                    <div className={style.breadcrumb}>
                        <Observer>
                            {() => (
                                <Breadcrumb separator='>'>
                                    {[...store.breadcrumb].map(v => {
                                        return (
                                            <Breadcrumb.Item key={v.title}>
                                                <BreadcrumbLink breadcrumb={v} />
                                            </Breadcrumb.Item>
                                        );
                                    })}
                                </Breadcrumb>
                            )}
                        </Observer>
                    </div>
                    <div className={style.main}>
                        <Outlet />
                    </div>
                </Layout.Content>
            </Layout>
            <SpinC />
        </Layout>
    );
};

export default LayoutUI;
