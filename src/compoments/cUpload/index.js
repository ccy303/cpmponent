import React, { useEffect } from "react";
import { Upload, Button, message } from "@src/index.js";
import { file as fileValid } from "@tools/valid";
import { VerticalAlignTopOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useLocalStore, Observer } from "mobx-react-lite";
// import { upload, filePrev } from "@src/http/public";
import { toJS } from "mobx";
import gStore from "@src/store/global";
import style from "./index.less";
export default props => {
    const {
        onChange = () => {},
        beforeUpload = () => {},
        customUpload,
        afterUpload = () => {},
        afterRemove = () => {},
        fileSize = 50,
        fileType,
        listType = "text",
        maxCount = Number.MAX_VALUE,
        fileList = [],
        value: formValue,
        fileUploadType = "",
        id,
        btnText = "上传",
        loading = true,
        ...other
    } = props;

    const store = useLocalStore(() => {
        return { fileList: [] };
    });

    useEffect(() => {
        if (fileList || formValue) {
            const _formValue = formValue ? formValue?.filter(v => !!Object.keys(v)?.length) : [];
            store.fileList = formValue && _formValue.length ? [..._formValue] : [...fileList];
        }
    }, [fileList, formValue]);

    const beforeUploadFun = async file => {
        try {
            const vailArr = [fileValid.checkSize(file, fileSize)];
            if (fileType) {
                vailArr.push(fileValid.checkType(file, fileType));
            }
            await Promise.all(vailArr);
        } catch (err) {
            message.warning(err);
            return false;
        }
    };

    /**
     * @param option antd 返回参数
     */
    const customRequest = async option => {
        const tag = await beforeUpload(option.file);
        if (tag === false) {
            return;
        }
        option.file = tag || option.file;
        console.log(option);
        const formdata = new FormData();
        formdata.append("file", option.file);

        // 发送ajax请求
        loading &&
            (gStore.g_loading = {
                visible: true,
                text: "文件上传中..."
            });
        // const res = await upload(fileUploadType, formdata);
        loading &&
            (gStore.g_loading = {
                visible: false,
                text: ""
            });
        const file = {
            name: option.file.name
            // uid: res.data_id
            // thumbUrl: filePrev(res.data_id),
            // url: filePrev(res.data_id)
        };

        // onChange?.([...toJS(store.fileList), { ...file, ...res }]);
        // afterUpload?.({ ...file, ...res }, store.fileList);

        // if (!fileList) {
        //     if (maxCount && store.fileList.length < maxCount) {
        //         store.fileList = [...store.fileList, { ...file }];
        //     } else {
        //         store.fileList = [...store.fileList.slice(0, maxCount - 1), { ...file }];
        //     }
        // }
    };

    const onRemove = file => {
        onChange?.(undefined);
        afterRemove?.(file);
        if (!fileList) {
            store.fileList = [...store.fileList.filter(v => v.uid != file.uid)];
        }
    };

    return (
        <Observer>
            {() => {
                const cls =
                    maxCount == store.fileList.length
                        ? `${style.upload} ${style["max-count"]}`
                        : style.upload;
                return (
                    <div id={id}>
                        <Upload
                            className={cls}
                            onRemove={onRemove}
                            listType={listType}
                            fileList={store.fileList}
                            customRequest={customRequest}
                            beforeUpload={beforeUploadFun}
                            {...other}
                        >
                            {listType == "text" || listType == "picture" ? (
                                <Button>
                                    <VerticalAlignTopOutlined />
                                    {btnText}
                                </Button>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <CloudUploadOutlined style={{ fontSize: "32px" }} />
                                    <span>上传图片</span>
                                </div>
                            )}
                        </Upload>
                    </div>
                );
            }}
        </Observer>
    );
};
