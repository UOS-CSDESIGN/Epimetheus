import React from 'react';
import ReactLoading from 'react-loading';

export default function LoadingComponent() {
    return (
        <ReactLoading
            type={'spin'}
            color={'#000000'}
            height={'20%'}
            width={'20%'}
        />
    );
}
