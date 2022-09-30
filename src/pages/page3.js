import React from "react";
import Sms from "@compoments/sms";
import { Row, Col, CUpload, Divider, Upload } from "@src/index.js";
export default props => {
    return (
        <>
            <Row>
                <Col>短信组件:</Col>
                <Col>
                    <Sms phone='12345' getSmsUrl='/baidu' params={{ a: 123 }} />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>文件上传(text):</Col>
                <Col>
                    <CUpload
                        data={{ a: 1234 }}
                        action='http://127.0.0.1:4523/m1/832302-0-default/test'
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>文件上传(picture):</Col>
                <Col>
                    <CUpload
                        listType='picture'
                        customRequest={a => {
                            console.log(a);
                        }}
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>文件上传(picture-card):</Col>
                <Col>
                    <CUpload
                        listType='picture-card'
                        action='http://127.0.0.1:4523/m1/832302-0-default/test'
                    />
                </Col>
            </Row>
        </>
    );
};
