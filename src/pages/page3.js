import React from "react";
import Sms from "@compoments/sms";
import { Row, Col, CUpload, Divider } from "@src/index.js";
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
                    <CUpload data={{ a: 1234 }} action='/baidu' />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>文件上传(picture):</Col>
                <Col>
                    <CUpload listType='picture' />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>文件上传(picture-card):</Col>
                <Col>
                    <CUpload listType='picture-card' />
                </Col>
            </Row>
        </>
    );
};
