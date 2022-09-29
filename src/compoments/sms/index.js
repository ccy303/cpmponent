import React, { useEffect } from "react";
import { Button, Input, Space, message, useAxios } from "@src/index.js";
import { useLocalStore, Observer } from "mobx-react-lite";
import { runInAction } from "mobx";
let TIMER = null;
export default props => {
    const {
        value,
        onChange,
        id,
        phone,
        disabled,
        customFun,
        params,
        getSmsUrl,
        getSmsMeth = "get"
    } = props;
    const axios = useAxios();
    const store = useLocalStore(() => {
        return {
            text: "获取验证码",
            loading: false,
            code: "",
            btnDisabled: false
        };
    });

    const getSms = async () => {
        if (!phone && !customFun) {
            return message.error("手机号不能为空");
        }
        // 获取短信认证码
        store.btnDisabled = true;
        try {
            if (getSmsUrl) {
                const cfg = {
                    method: getSmsMeth,
                    url: `${getSmsUrl}`
                };
                getSmsMeth === "get" ? (cfg.params = params) : (cfg.data = params);
                await axios(cfg);
            } else {
                await customFun?.();
                message.success("发送成功");
            }
            setText();
        } catch (err) {
            store.btnDisabled = false;
        }
    };

    const setText = () => {
        store.text = 60;
        TIMER = setInterval(() => {
            if (typeof store.text == "number" && store.text <= 0) {
                clearInterval(TIMER);
                TIMER = null;
                runInAction(() => {
                    store.text = "获取验证码";
                    store.btnDisabled = false;
                });
                return;
            }
            if (typeof store.text != "number") {
                store.text = 60;
            } else {
                store.text -= 1;
            }
        }, 1000);
    };

    useEffect(() => {
        store.code = value;
    }, [value]);

    const inputChange = e => {
        store.code = e.target.value;
        onChange?.(e.target.value);
    };

    return (
        <Observer>
            {() => {
                return (
                    <Space id={id} style={{ width: "100%" }}>
                        <Input
                            onChange={inputChange}
                            value={store.code}
                            placeholder='请输入短信验证码'
                            disabled={disabled}
                        />
                        <Button
                            disabled={store.btnDisabled || disabled}
                            type='primary'
                            onClick={getSms}
                        >
                            {typeof store.text == "number"
                                ? `${store.text}s后重新获取`
                                : store.text}
                        </Button>
                    </Space>
                );
            }}
        </Observer>
    );
};
