import React, { useEffect } from "react";
import { useLocalStore, Observer } from "mobx-react-lite";
import { toJS } from "mobx";
import CUpload from "@compoments/cUpload";
import style from "./index.less";

export default props => {
    const {
        onChange = () => {},
        value,
        disabled,
        id,
        fileType = ["jpg", "png"],
        fileSize = 10,
        action,
        method = "post",
        data,
        headers
    } = props;
    const store = useLocalStore(() => {
        return { list: [] };
    });
    const onFileChange = (file, index) => {
        const list = store.list.length ? toJS(store.list) : [{}, {}];
        list[index] = file;
        store.list = list;
        const target = store.list.find(v => !Object.keys(v).length);
        !target && onChange?.(toJS(store.list));
    };

    const onFileRemove = index => {
        const list = toJS(store.list);
        list.splice(index, 1, {});
        store.list = list;
        onChange?.(null);
    };

    useEffect(() => {
        value && (store.list = value);
    }, [value]);

    return (
        <Observer>
            {() => {
                const _action =
                    Object.prototype.toString.call(action) == "[object String]" ? [action] : action;
                return (
                    <div className={style["id-card"]} id={id}>
                        <div className={`${style["id-card-item"]} ${style["m-r-20"]}`}>
                            <CUpload
                                fileList={
                                    store.list[0] && Object.keys(store.list[0]).length
                                        ? [store.list[0]]
                                        : []
                                }
                                action={_action?.[0] || window.location}
                                data={data?.[0] || data}
                                afterUpload={file => onFileChange(file, 0)}
                                afterRemove={() => onFileRemove(0)}
                                listType='picture-card'
                                maxCount={1}
                                disabled={disabled}
                                fileSize={fileSize}
                                fileType={fileType}
                                method={method}
                                headers={headers?.[0] || headers}
                            />
                            <p>身份证正面</p>
                        </div>
                        <div className={style["id-card-item"]}>
                            <CUpload
                                fileList={
                                    store.list[1] && Object.keys(store.list[1]).length
                                        ? [store.list[1]]
                                        : []
                                }
                                action={_action?.[1] || _action?.[0] || window.location}
                                data={data?.[1] || data?.[0] || data}
                                afterUpload={file => onFileChange(file, 1)}
                                afterRemove={() => onFileRemove(1)}
                                listType='picture-card'
                                maxCount={1}
                                disabled={disabled}
                                fileSize={fileSize}
                                fileType={fileType}
                                method={method}
                                headers={headers?.[1] || headers?.[0] || headers}
                            />
                            <p>身份证反面</p>
                        </div>
                    </div>
                );
            }}
        </Observer>
    );
};
