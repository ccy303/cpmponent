import React, { useEffect } from "react";
import { Upload, Button, message, useAxios } from "@src/index.js";
import { file as fileValid } from "@tools/valid";
import { VerticalAlignTopOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useLocalStore, Observer } from "mobx-react-lite";
// import { upload, filePrev } from "@src/http/public";
// import { toJS } from "mobx";
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
        customRequest,
        afterUpload = () => {},
        afterRemove = () => {},
        fileSize = 50,
        fileType,
        listType = "text",
        maxCount = Number.MAX_VALUE,
        fileList = [],
        value: formValue,
        id,
        btnText = "文件上传",
        loading = true,
        action,
        data,
        method = "post",
        ...other
    } = props;

    const axios = useAxios();

    const store = useLocalStore(() => {
        return { fileList: [] };
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
        console.log(option);
        loading &&
            (gStore.g_loading = {
                visible: true,
                text: "文件上传中..."
            });

        await vailArrFun(option.file);
        const formdata = new FormData();
        formdata.append("file", option.file);
        data && formdata.append("data", data);

        if (customRequest) {
            await customRequest(option);
            loading &&
                (gStore.g_loading = {
                    visible: false,
                    text: ""
                });
            return;
        }

        if (action) {
            try {
                const res = await axios({
                    method: method,
                    url: action,
                    data: formdata,
                    headers: { "Content-Type": "multipart/form-data" }
                });
                const file = {
                    name: option.file.name,
                    // uid: res.data_id
                    thumbUrl: await getBase64(option.file)
                    // url: filePrev(res.data_id)
                };
                console.log(file);
                message.success("上传成功");
                store.fileList = [...store.fileList, file];
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
            return;
        }

        // console.log(123456, option);

        // // 发送ajax请求
        // loading &&
        //     (gStore.g_loading = {
        //         visible: true,
        //         text: "文件上传中..."
        //     });
        // // const res = await upload(fileUploadType, formdata);
        // loading &&
        //     (gStore.g_loading = {
        //         visible: false,
        //         text: ""
        //     });
        // const file = {
        //     name: option.file.name
        //     // uid: res.data_id
        //     // thumbUrl: filePrev(res.data_id),
        //     // url: filePrev(res.data_id)
        // };

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
        // onChange?.(undefined);
        // afterRemove?.(file);
        // if (!fileList) {
        //     store.fileList = [...store.fileList.filter(v => v.uid != file.uid)];
        // }
    };

    const change = ({ file, fileList, event }) => {
        // console.log(file);
        // console.log(fileList);
        // console.log(event);
        // onChange();
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
                            customRequest={uploadFun}
                            onChange={change}
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
