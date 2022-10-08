import React from "react";
import Sms from "@compoments/sms";
import { Row, Col, CUpload, Divider, IdCard } from "@src/index.js";
import style from "./index.less";
export default props => {
    return (
        <div className={style.page3}>
            <Row className={style.row}>
                <Col className={style.label}>短信组件:</Col>
                <Col>
                    <Sms phone='12345' getSmsUrl='/baidu' params={{ a: 123 }} />
                </Col>
            </Row>
            <Divider />
            <Row className={style.row}>
                <Col className={style.label}>文件上传(text):</Col>
                <Col>
                    <CUpload
                        data={{ a: 1234 }}
                        action='http://127.0.0.1:4523/m1/832302-0-default/test'
                        onChange={files => {
                            console.log(files);
                        }}
                        afterUpload={files => {
                            console.log(files);
                            return {
                                url: "www.baidu.conm",
                                ...files
                            };
                        }}
                    />
                </Col>
            </Row>
            <Divider />
            <Row className={style.row}>
                <Col className={style.label}>文件上传(picture):</Col>
                <Col>
                    <CUpload
                        listType='picture'
                        action='http://127.0.0.1:4523/m1/832302-0-default/test'
                    />
                </Col>
            </Row>
            <Divider />
            <Row className={style.row}>
                <Col className={style.label}>文件上传(picture-card):</Col>
                <Col>
                    <CUpload
                        listType='picture-card'
                        action='http://127.0.0.1:4523/m1/832302-0-default/test'
                    />
                </Col>
            </Row>
            <Divider />
            <Row className={style.row}>
                <Col className={style.label}>身份证正反面上传:</Col>
                <Col>
                    <IdCard
                        data={{ a: 1234 }}
                        action='http://127.0.0.1:4523/m1/832302-0-default/test'
                        headers={{ a: 123 }}
                    />
                </Col>
            </Row>
        </div>
    );
};
