import React from "react";
import { CForm, Collapse } from "@src/index.js";

const { Panel } = Collapse;

export default props => {
    const form = CForm.cUseForm();
    const configNormal = {
        cForm: "test1",
        onFinish: () => {
            console.log(form.test1.getFieldsValue());
        },
        items: [
            { name: "1", label: "文本", type: "text" },
            { name: "2", label: "数字", type: "number" },
            { name: "3", label: "密码", type: "password" },
            {
                name: "4",
                label: "下拉选择",
                type: "select",
                props: {
                    options: [
                        { value: "1", label: "选项一" },
                        { value: "2", label: "选项二" }
                    ]
                }
            },
            {
                name: "5",
                label: "单选",
                type: "radio",
                props: {
                    options: [
                        { value: "1", label: "选项一" },
                        { value: "2", label: "选项二" }
                    ]
                }
            },
            {
                name: "6",
                label: "复选",
                type: "checkbox",
                props: {
                    options: [
                        { value: "1", label: "选项一" },
                        { value: "2", label: "选项二" }
                    ]
                }
            },
            { name: "7", label: "开关", type: "switch" },
            {
                name: "8",
                label: "联合选择",
                type: "cascader",
                props: {
                    options: [
                        {
                            value: "zhejiang",
                            label: "Zhejiang",
                            children: [
                                {
                                    value: "hangzhou",
                                    label: "Hangzhou",
                                    children: [
                                        {
                                            value: "xihu",
                                            label: "West Lake"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            value: "jiangsu",
                            label: "Jiangsu",
                            children: [
                                {
                                    value: "nanjing",
                                    label: "Nanjing",
                                    children: [
                                        {
                                            value: "zhonghuamen",
                                            label: "Zhong Hua Men"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            { name: "9", label: "评分", type: "rate" },
            { name: "10", label: "滑动输入", type: "slider" },
            { name: "11", label: "日期选择", type: "datePicker" },
            {
                name: "12",
                label: "日期选择(周)",
                type: "datePicker",
                props: {
                    picker: "week"
                }
            },
            {
                name: "13",
                label: "日期选择(月)",
                type: "datePicker",
                props: {
                    picker: "month"
                }
            },
            {
                name: "14",
                label: "日期选择(年)",
                type: "datePicker",
                props: {
                    picker: "year"
                }
            },
            {
                name: "15",
                label: "日期选择(季)",
                type: "datePicker",
                props: {
                    picker: "quarter"
                }
            },
            {
                name: "16",
                label: "日期范围",
                type: "rangeDataPicker"
            },
            {
                name: "17",
                label: "日期范围(周)",
                type: "rangeDataPicker",
                props: { picker: "week" }
            },
            {
                name: "18",
                label: "日期范围(月)",
                type: "rangeDataPicker",
                props: { picker: "month" }
            },
            {
                name: "19",
                label: "日期范围(年)",
                type: "rangeDataPicker",
                props: { picker: "year" }
            },
            {
                name: "20",
                label: "日期范围(季)",
                type: "rangeDataPicker",
                props: { picker: "quarter" }
            },
            {
                name: "21",
                label: "时间选择",
                type: "timePicker"
            },
            {
                name: "22",
                label: "时间范围",
                type: "rangeTimePicker"
            },
            {
                name: "23",
                label: "文件上传",
                type: "upload",
                props: {
                    action: "http://127.0.0.1:4523/m1/832302-0-default/test"
                }
            },
            {
                name: "24",
                label: "图片上传",
                type: "upload",
                props: {
                    listType: "picture-card",
                    action: "http://127.0.0.1:4523/m1/832302-0-default/test"
                }
            },
            {
                name: "25",
                label: "身份证",
                type: "idcard",
                props: {
                    action: "http://127.0.0.1:4523/m1/832302-0-default/test"
                }
            },
            {
                name: "26",
                label: "短信验证",
                type: "sms",
                props: {
                    getSmsUrl: "/baidu",
                    phone: "1234"
                }
            },
            { name: "27", label: "多行输入", type: "textArea" }
        ]
    };
    const configN = {
        items: [
            [{ name: "1", label: "一行一项", type: "text" }],
            [
                { name: "1", label: "一行二项", type: "text" },
                { name: "1", label: "一行二项", type: "text" }
            ],
            [
                { name: "1", label: "一行三项", type: "text" },
                { name: "1", label: "一行三项", type: "text" },
                { name: "1", label: "一行三项", type: "text" }
            ],
            {
                colSpan: { span: 8 },
                name: "1",
                label: "栅格宽度",
                type: "text"
            },
            {
                colSpan: { span: 16 },
                name: "1",
                label: "栅格宽度",
                type: "text"
            },
            {
                name: "2",
                label: "详情",
                type: "text",
                dtl: true,
                initialValue: "这个字段内容",
                props: {
                }
            },
            [
                {
                    dom: <>这是自定义内容</>
                }
            ]
        ]
    };
    return (
        <Collapse defaultActiveKey={["2"]}>
            <Panel header='form表单' key='1'>
                <CForm {...configNormal} />
            </Panel>
            <Panel header='form表单(一行N个布局)' key='2'>
                <CForm {...configN} />
            </Panel>
        </Collapse>
    );
};
