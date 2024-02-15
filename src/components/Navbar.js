import React from 'react';
import logoImage from '../assets/img/DfALogov2.png'

function Navbar({ onHomeClick, onAddQuestionClick, onSearchClick, onAddAnswerClick }) {
    return (
        <div className="navbar">
            <div>
            <img src={logoImage} width="60" height="60"></img>
        
            
            </div>
            <h2 class="purple">Question Bank</h2>
            
            
            <ul class="purple">
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
