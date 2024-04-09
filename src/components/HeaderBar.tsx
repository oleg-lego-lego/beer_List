import React from 'react';
import {Layout} from "antd";

const {Header} = Layout;

export const HeaderBar = () => {
    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <div className="demo-logo"/>
        </Header>
    );
};
