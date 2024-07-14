import React from 'react';

const DisplayCurrency = ({ num }) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });

    return <span>{formatter.format(num)}</span>;
};

export default DisplayCurrency;
