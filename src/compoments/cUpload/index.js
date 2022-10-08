import React, { useEffect } from "react";
import { Upload, Button, message, useAxios } from "@src/index.js";
import { file as fileValid } from "@tools/valid";
import { VerticalAlignTopOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useLocalStore, Observer } from "mobx-react-lite";
import { toJS, autorun } from "mobx";
import gStore from "@src/store/global";
import style from "./index.less";

const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

export default props => {
    const {
        onChange = () => {},
        afterUpload = () => {},
        afterRemove = () => {},
        fileSize = 50,
        fileType,
        listType = "text",
        maxCount = Number.MAX_VALUE,
        fileList = null,
        value: formValue,
        id,
        btnText = "文件上传",
        loading = true,
        action,
        data,
        method = "post",
        headers,
        ...other
    } = props;

    const axios = useAxios();

    const store = useLocalStore(() => {
        return { fileList: [] };
    });

    autorun(() => {
        onChange?.(toJS(store.fileList).length ? toJS(store.fileList) : null);
    });

    useEffect(() => {
        if (fileList || formValue) {
            const _formValue = formValue ? formValue?.filter(v => !!Object.keys(v)?.length) : [];
            store.fileList = formValue && _formValue.length ? [..._formValue] : [...fileList];
        }
    }, [fileList, formValue]);

    const vailArrFun = async file => {
        try {
            const vailArr = [fileValid.checkSize(file, fileSize)];
            fileType && vailArr.push(fileValid.checkType(file, fileType));
            await Promise.all(vailArr);
            Promise.resolve();
        } catch (err) {
            message.warning(err);
            Promise.reject();
        }
    };

    /**
     * @param option antd 返回参数
     */
    const uploadFun = async option => {
        loading &&
            (gStore.g_loading = {
                visible: true,
                text: "文件上传中..."
            });

        await vailArrFun(option.file);
        const formdata = new FormData();
        formdata.append("file", option.file);
        if (data) {
            for (let key in data) {
                formdata.append(key, data[key]);
            }
        }
        try {
            const res = await axios({
                method: method,
                url: action || window.location,
                data: formdata,
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...headers
                }
            });

            let file = {
                lastModified: option.file.lastModified,
                name: option.file.name,
                size: option.file.size,
                type: option.file.type,
                uid: option.file.uid,
                thumbUrl: listType != "text" && (await getBase64(option.file)),
                uploadRes: res
            };

            const _file = await afterUpload(toJS(file));

            _file && (file = { ...file, ..._file });

            if (!fileList) {
                if (maxCount && store.fileList.length < maxCount) {
                    store.fileList = [...store.fileList, { ...file }];
                } else {
                    store.fileList = [...store.fileList.slice(0, maxCount - 1), { ...file }];
                }
            }

            message.success("上传成功");

            loading &&
                (gStore.g_loading = {
                    visible: false,
                    text: ""
                });
        } catch (err) {
            loading &&
                (gStore.g_loading = {
                    visible: false,
                    text: ""
                });
        }
    };

    const onRemove = file => {
        store.fileList = [...store.fileList.filter(v => v.uid != file.uid)];
        afterRemove?.(file);
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
                            {...other}
                            className={cls}
                            onRemove={onRemove}
                            listType={listType}
                            fileList={store.fileList}
                            customRequest={uploadFun}
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
