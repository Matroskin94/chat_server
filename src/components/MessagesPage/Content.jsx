import React, { PureComponent, Fragment } from 'react';
import Card from 'antd/lib/card';
import Divider from 'antd/lib/divider';

class Content extends PureComponent {

    render() {
        return (
            <Fragment>
                <Divider>Сообщения</Divider>
                <Card>
                    <p>Card content</p>
                </Card>
            </Fragment>
        );
    }
}

export default Content;
