import React from 'react';
import Menu from './Menu';

const Base = ({
    title="My Title",
    description="My Description",
    className="bg-light text-dark p-4",
    children
}) => (
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-light text-dark text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
            <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-light mt-auto py-3">       
                <div className="container">
                    <span className="text-muted">
                        BioScodex Pharmaceuticals
                    </span>
                </div>
            </footer>
        </div>
);

export default Base;
