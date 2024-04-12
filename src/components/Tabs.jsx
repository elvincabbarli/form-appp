/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function Tabs({ tabs }) {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className='tabs'>
            {tabs.map((tab, index) => (
                <NavLink
                    key={index}
                    to={tab.path}
                    onClick={() => handleTabClick(index)}
                >
                    {tab.label}
                </NavLink>
            ))}
        </div>
    );
}


Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Tabs;
