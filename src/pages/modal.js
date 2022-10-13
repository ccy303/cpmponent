import React from "react";
import { Button, CModal, Space } from "@src/index.js";
export default props => {
    const click1 = () => {
        CModal.acOpen("m1");
    };
    const click2 = () => {
        CModal.confirm({
            title: "函数式调用",
            content: <>函数式调用</>
        });
    };

    return (
        <>
            <Space>
                <Button onClick={click1}>JSX渲染弹框</Button>
                <Button onClick={click2}>函数式弹窗</Button>
            </Space>
            <CModal title='JSX渲染弹窗' name='m1'>
                JSX渲染弹窗
            </CModal>
        </>
    );
};
