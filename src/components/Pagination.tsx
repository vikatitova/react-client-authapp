import React, { useState } from 'react';
import { Pagination as Pag, Button } from 'react-bootstrap';

const Pagination = (props: any) => {
    const {
        usersCount,
        setActivePaginationNumber,
        activePaginationNumber,
    } = props;

    const handleActive = (pressedNumber: number): void => {
        setActivePaginationNumber(pressedNumber);
    };

    const getPaginationItems = () => {
        const paginationItems = [];
        for (let number = 1; number <= Math.ceil(usersCount / 5); number++) {
            paginationItems.push(
                <Pag.Item
                    key={number}
                    active={number === activePaginationNumber}
                    onClick={() => handleActive(number)}
                >
                    {number}
                </Pag.Item>
            );
        }
        return paginationItems;
    };

    return (
        <>
            <Pag>{getPaginationItems()}</Pag>
        </>
    );
};

export default Pagination;
