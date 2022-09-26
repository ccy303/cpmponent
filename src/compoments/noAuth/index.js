import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import qs from "qs";
import style from "./styles.less";

const NoMatch = props => {
    const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    const arr = ["您没有权限访问当前页面", "您没有实名认证，请实名认证后操作"];
    const arrBtn = [
        <Link to='/'>
            <Button type='primary' style={{ margin: "10px 0 0 0" }}>
                返回首页
            </Button>
        </Link>
    ];
    return (
        <div className={style.wrap}>
            <span className={style["first-title"]}>403</span>
            <span className={style["second-title"]}>{arr[query.tp || 0]}</span>
            {arrBtn[query.tp || 0]}
        </div>
    );
};

export default NoMatch;
