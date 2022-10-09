import React from "react";
import { CTableList, Collapse } from "@src/index.js";

const { Panel } = Collapse;

export default props => {
    const columns = [
        { title: "列一", dataIndex: "a" },
        { title: "列二", dataIndex: "b" },
        { title: "列三", dataIndex: "c" },
        { title: "列四", dataIndex: "d" },
        { title: "列五", dataIndex: "e" }
    ];

    const data = [
        { id: 1, a: "数据", b: "数据", c: "数据", d: "数据", e: "数据" },
        { id: 2, a: "数据", b: "数据", c: "数据", d: "数据", e: "数据" },
        { id: 3, a: "数据", b: "数据", c: "数据", d: "数据", e: "数据" },
        { id: 4, a: "数据", b: "数据", c: "数据", d: "数据", e: "数据" },
        { id: 5, a: "数据", b: "数据", c: "数据", d: "数据", e: "数据" },
        { id: 6, a: "数据", b: "数据", c: "数据", d: "数据", e: "数据" }
    ];

    const searchNormal = {
        items: [
            { name: "字段一", label: "字段一", type: "text" },
            { name: "字段二", label: "字段二", type: "text" },
            { name: "字段三", label: "字段三", type: "text" }
        ]
    };

    const searchAutoSearch = {
        change2search: true,
        items: [
            { name: "字段一", label: "字段一", type: "text" },
            { name: "字段二", label: "字段二", type: "text" },
            { name: "字段三", label: "字段三", type: "text" }
        ]
    };

    return (
        <Collapse defaultActiveKey={["3"]}>
            <Panel header='静态数据（无搜索项）' key='1'>
                <CTableList
                    queryToUrl={false}
                    columns={columns}
                    dataSource={data}
                    rowKey='id'
                    search={false}
                />
            </Panel>
            <Panel header='动态数据（地址获取）' key='2'>
                <CTableList
                    toolBar={<div>工具栏</div>}
                    queryToUrl={false}
                    requestCfg='/data/tableData.json'
                    columns={columns}
                    rowKey='id'
                    search={searchNormal}
                />
            </Panel>
            <Panel header='动态数据（自定义数据请求、输入框改变自动获取数据）' key='3'>
                <CTableList
                    queryToUrl={false}
                    toolBar={<div>工具栏</div>}
                    requestCfg={async arg => {
                        return {
                            data: data,
                            total: data.length
                        };
                    }}
                    resetBtn={false}
                    submitBtn={false}
                    columns={columns}
                    rowKey='id'
                    search={searchAutoSearch}
                />
            </Panel>
        </Collapse>
    );
};
