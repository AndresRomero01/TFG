import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div><a href='/' className='navbar-brand'>Home</a></div>
                        <div><a href='/books' className='navbar-item'>books</a></div>
                    </nav>
                    
                </header>
            </div>
        );
    }
}

export default HeaderComponent;