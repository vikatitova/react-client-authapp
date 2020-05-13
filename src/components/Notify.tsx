import { Component } from 'react';
import React from 'react';
import { Toast } from 'react-bootstrap';

interface INotifyProps {
    message: string;
    type: string;
    setShow(setShow: boolean): void;
    show: boolean;
}

export class Notify extends Component<INotifyProps> {
    constructor(props: any) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div
                aria-live='polite'
                aria-atomic='true'
                style={{
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    <Toast
                        onClose={() => this.props.setShow(false)}
                        show={this.props.show}
                        // delay={3000}
                        // autohide
                    >
                        <Toast.Header>
                            <strong className='mr-auto'>
                                System Notification
                            </strong>
                            {}
                        </Toast.Header>
                        <Toast.Body>{this.props.message}</Toast.Body>
                    </Toast>
                </div>
            </div>
        );
    }
}
