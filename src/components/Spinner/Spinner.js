import React from 'react';
import loading from "./load.gif";

const Spinner = () =>
{
    return (
        <div className="text-center">
            <img className="my-3" src={ loading } alt="" />
        </div>
    );
};

export default Spinner;
