import React from 'react';
import {Layout, theme} from "antd";
import {TableList} from "./TableList";

const {Content} = Layout;

export const TablePage = () => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

    return (
        <Content style={{padding: '0 48px'}}>
            <Layout style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}>
                <Content style={{padding: '0 24px', minHeight: '77vh'}}>
                    <TableList/>
                </Content>
            </Layout>
        </Content>
    );
};
