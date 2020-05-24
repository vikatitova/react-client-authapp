import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';
import styled from 'styled-components';

const StyledMessage: any = styled.span`
    color: ${(props: any) => (props.type === 'info' ? 'darkgreen' : 'red')};
`;

interface INotifyProps {
    message: string;
    type: string;
    setShow(show: boolean): void;
}

export class Notify extends Component<INotifyProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: true,
        };
    }

    render() {
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
                        top: `${-150}px`,
                        right: 0,
                    }}
                >
                    <Toast
                        onClose={() => this.props.setShow(false)}
                        show={this.state.show}
                        delay={2000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className='mr-auto'>
                                System Notification
                            </strong>
                        </Toast.Header>
                        <Toast.Body>
                            <StyledMessage type={this.props.type}>
                                {this.props.message}
                            </StyledMessage>
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        );
    }
}
