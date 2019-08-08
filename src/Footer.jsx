import React from 'react';
import './App.css';
import style from './Footer.module.css';

class Footer extends React.Component {


    render = () => {

        let textAll = () => {
            this.props.buttonFilter('All');
        };
        let textCompleted = () => {
            this.props.buttonFilter('Completed');
        };
        let textActive = () => {
            this.props.buttonFilter('Active');
        };

        let ifCheckedAll = () => this.props.selectedFilter === 'All' ? style.active : '';

        let ifCheckedCompleted = () => this.props.selectedFilter === 'Completed' ? style.active : '';

        let ifCheckedActive = () => this.props.selectedFilter === 'Active' ? style.active : '';



        return (
                    <div className={style.todoListFooter}>
                        <button
                            className={ifCheckedAll()}
                            onClick={textAll}
                        >All</button>

                        <button
                            onClick={textCompleted}
                            className={ifCheckedCompleted()}
                        >Completed</button>

                        <button
                            onClick={textActive}
                            className={ifCheckedActive()}
                        >Active</button>

                    </div>

        );
    }
}

export default Footer;

