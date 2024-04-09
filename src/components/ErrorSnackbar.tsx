import React from 'react';
import {Alert, Space} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setError} from "../error-reducer";

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.error.error)

    if (error) {
        setTimeout(() => {
            dispatch(setError(null))
        }, 4000)
    }

    return (
        <>
            {error &&
                <Space direction="vertical" className={'alert-container'}>
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        closable
                    />
                </Space>
            }
        </>
    );
};
