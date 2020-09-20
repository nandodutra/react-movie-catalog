import React, { useState, useEffect } from 'react';
import './Card.css';

export default props => {
    return (
        <div className="Card"> 
            <header>{props.title}</header>
            <div className="Content">
                {props.children}
            </div>
        </div>
    );
}