import React from 'react';
import '../../App.css';
import style from './Footer.module.css';

class Footer extends React.Component {

    state = {
        isHidden: true,
    };

    render = () => {

        let hideClick = () => {
            let val = true;
            this.state.isHidden === true ? val = false : val = true;
            this.setState({isHidden: val});
        };

        let onAllFilterClick = () => {
            this.props.buttonFilter('All')
        };

        let onCompletedFilterClick = () => {
            this.props.buttonFilter('Completed')
        };

        let onActiveFilterClick = () => {
            this.props.buttonFilter('Active')
        };

        let ifCheckedAll = ()  => this.props.selectedFilter === 'All' ? style.active : style.button;
        let ifCheckedActive = ()  => this.props.selectedFilter === 'Active' ? style.active : style.button;
        let ifCheckedCompleted = ()  => this.props.selectedFilter === 'Completed' ? style.active : style.button;

        return (
            <div className={style.todoListFooter}>
                {!this.state.isHidden && <div>
                    <div>
                    <button
                        onClick={onAllFilterClick}
                        className={ifCheckedAll()}
                    >All
                    </button>
                    </div>

                    <div>
                    <button
                        onClick={onCompletedFilterClick}
                        className={ifCheckedCompleted()}
                    >Completed
                    </button>
                    </div>

                    <div>
                    <button
                        onClick={onActiveFilterClick}
                        className={ifCheckedActive()}
                    >Active
                    </button>
                    </div>

                    <div>
                    <span
                        className={style.teg}
                        onClick={hideClick}
                    >HIDE</span>
                    </div>
                </div>}

                {this.state.isHidden && <span
                    className={style.teg}
                    onClick={hideClick}
                >SHOW</span>}

            </div>

        );
    }
}

export default Footer;

