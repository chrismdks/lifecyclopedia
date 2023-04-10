import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import ClassPage from './ClassPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Header/>
        <div className='row text-white'>
            <div className='col-6'>
                <span className='h1 text-warning text-center'>Class Component</span>
                <ClassPage/>
            </div>
        </div>
    </div>
);