import {
    Input,
    Select as CSelect,
    Radio as CRadio,
    DatePicker,
    Checkbox as CCheckbox,
    InputNumber,
    Rate as CRate,
    Switch,
    AutoComplete,
    Cascader,
    Slider,
    TimePicker
} from "@compoments/antd";
import Sms from "@compoments/sms";
import IdCard from "@compoments/idCard";
import CUpload from "@compoments/cUpload";
import React, { useEffect } from "react";
import { useLocalStore, Observer } from "mobx-react-lite";
import moment from "moment";

const CNumber = props => {
    const { onChange, value, ...other } = props;
    const store = useLocalStore(() => ({
        value: undefined
    }));

    useEffect(() => {
        store.value = value;
    }, [value]);

    const dateChange = e => {
        onChange?.(e);
    };

    return (
        <Observer>
            {() => (
                <InputNumber
                    {...{
                        controls: false,
                        ...other
                    }}
                    style={{ width: "100%" }}
                    value={store.value}
                    onChange={dateChange}
                    title={value}
                />
            )}
        </Observer>
    );
};

const CRangeDataPicker = props => {
    const { onChange, value, widthSec = false, fixSec = false, ...other } = props;
    const store = useLocalStore(() => ({
        value: undefined
    }));

    useEffect(() => {
        store.value = value?.map(v => {
            switch (other.picker) {
                case "week":
                    return v && moment(v.split("-")[0]).isoWeek(v.split("-")[1]);
                case "quarter":
                    return v && moment(v.split("-")[0]).quarter(v.split("-")[1]);
                default:
                    return v && moment(v);
            }
        });
    }, [value]);

    const dateChange = e => {
        switch (other.picker) {
            case "week":
                onChange?.(e?.map(v => v?.format("YYYY-WW")));
                break;
            case "month":
                onChange?.(e?.map(v => v?.format("YYYY-MM")));
                break;
            case "year":
                onChange?.(e?.map(v => v?.format("YYYY")));
                break;
            case "quarter":
                onChange?.(e?.map(v => v?.format("YYYY-Q")));
                break;
            default:
                onChange?.(
                    e?.map(v =>
                        v?.format(
                            `${
                                widthSec
                                    ? "YYYY-MM-DD HH:mm:ss"
                                    : fixSec
                                    ? "YYYY-MM-DD 00:00:00"
                                    : "YYYY-MM-DD"
                            }`
                        )
                    )
                );
        }
    };

    return (
        <Observer>
            {() => (
                <DatePicker.RangePicker
                    {...{
                        allowEmpty: [true, true],
                        ...other
                    }}
                    style={{ width: "100%" }}
                    value={store.value}
                    onChange={dateChange}
                />
            )}
        </Observer>
    );
};

const CDatePicker = props => {
    const { onChange, value, widthSec = false, fixSec = false, ...other } = props;
    const store = useLocalStore(() => {
        return {
            value: undefined
        };
    });

    useEffect(() => {
        store.value = (() => {
            switch (other.picker) {
                case "week":
                    return value && moment(value.split("-")[0]).isoWeek(value.split("-")[1]);
                case "quarter":
                    return value && moment(value.split("-")[0]).quarter(value.split("-")[1]);
                default:
                    return value && moment(value);
            }
        })();
    }, [value]);

    const dateChange = value => {
        switch (other.picker) {
            case "week":
                onChange?.(value?.format("YYYY-WW"));
                break;
            case "month":
                onChange?.(value?.format("YYYY-MM"));
                break;
            case "year":
                onChange?.(value?.format("YYYY"));
                break;
            case "quarter":
                onChange?.(value?.format("YYYY-Q"));
                break;
            default: {
                onChange?.(
                    value?.format(
                        `${
                            widthSec
                                ? "YYYY-MM-DD HH:mm:ss"
                                : fixSec
                                ? "YYYY-MM-DD 00:00:00"
                                : "YYYY-MM-DD"
                        }`
                    )
                );
            }
        }
    };

    return (
        <Observer>
            {() => (
                <DatePicker
                    {...other}
                    style={{ width: "100%" }}
                    value={store.value}
                    onChange={dateChange}
                />
            )}
        </Observer>
    );
};

const CTimePicker = props => {
    const { onChange, value, ...other } = props;
    const store = useLocalStore(() => {
        return {
            value: undefined
        };
    });

    useEffect(() => {
        value && (store.value = moment(value, "HH:mm:ss"));
    }, [value]);

    const timeChange = value => {
        onChange?.(value?.format("HH:mm:ss"));
    };

    return (
        <Observer>
            {() => (
                <TimePicker
                    {...{
                        allowEmpty: [true, true],
                        ...other
                    }}
                    style={{ width: "100%" }}
                    value={store.value}
                    onChange={timeChange}
                />
            )}
        </Observer>
    );
};

const CRangeTimePicker = props => {
    const { onChange, value, ...other } = props;
    const store = useLocalStore(() => {
        return {
            value: undefined
        };
    });

    useEffect(() => {
        value && (store.value = value.map(v => v && moment(v, "HH:mm:ss")));
    }, [value]);

    const timeChange = value => {
        onChange?.(value?.map(v => v?.format("HH:mm:ss")));
    };

    return (
        <Observer>
            {() => (
                <TimePicker.RangePicker
                    {...{
                        allowEmpty: [true, true],
                        ...other
                    }}
                    style={{ width: "100%" }}
                    value={store.value}
                    onChange={timeChange}
                />
            )}
        </Observer>
    );
};

const CSwitch = props => {
    const { value, onChange, ...other } = props;
    const store = useLocalStore(() => {
        return {
            value: undefined
        };
    });
    const onCheckChange = e => {
        onChange?.(e);
    };

    useEffect(() => {
        store.value = value;
    }, [value]);

    return (
        <Observer>
            {() => {
                return <Switch {...other} checked={store.value} onChange={onCheckChange} />;
            }}
        </Observer>
    );
};

export default {
    text: props => <Input title={props.value} {...props} />,
    textArea: Input.TextArea,
    select: CSelect,
    radio: CRadio.Group,
    cascader: Cascader,
    autoComplete: AutoComplete,
    slider: Slider,
    datePicker: CDatePicker,
    rangeDataPicker: CRangeDataPicker,
    timePicker: CTimePicker,
    rangeTimePicker: CRangeTimePicker,
    checkbox: CCheckbox.Group,
    number: CNumber,
    rate: CRate,
    switch: CSwitch,
    upload: CUpload,
    password: Input.Password,
    idcard: IdCard,
    sms: Sms
};
