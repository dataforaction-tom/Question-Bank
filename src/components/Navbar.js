import React from 'react';

function Navbar({ onHomeClick, onAddQuestionClick, onSearchClick, onAddAnswerClick }) {
    return (
        <div className="navbar">
            <h2>Data For Action</h2>
            
            
            <ul>
        <li onClick={onHomeClick}>Home</li>
        <li onClick={onAddQuestionClick}>Add Question</li>
        <li onClick={onSearchClick}>Search Questions</li>
        <li onClick={onAddAnswerClick}>Add Answer</li>
        <li>Sign Up/Log In</li>
    </ul>
    

        </div>
    );
}

export default Navbar;
