import React from 'react';
import { Link } from 'react-router-dom';
import Globe from '../images/globe.png';
export default function Header(){
    return(
        <>
        <header>
        <nav>
            <Link to ="/">
            <img className='logo' src={Globe} alt="Globe" />
            </Link>
            <span>my travel journal.</span>
        </nav>
        <Link to='/add' className="add-journal-btn">Add Journal</Link>
        </header>
        </>
    );
}