import React, { Component } from 'react';
import { Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import cardBack from '../images/cardBack.jpg';
import '../App.css';

export default class GameTile extends Component {
    constructor(props){
        super(props);
        this.state = {
            covered: true,
            clicked: false,
            matched: false
        }
    }

    handleClick = () => {
        this.setState({covered: !this.state.covered});
    }


    render() {
        return (
            <div className='gameTileWrapper' onClick={this.handleClick}>
                { this.state.covered ?
                    (
                        <div className='gameTileCovered'>
                            <h2><QuestionCircleOutlined /></h2>
                        </div>
                    ) : (
                        <div className='gameTileUncovered'>
                            <img />
                        </div>
                    )

                }

            </div>
        );
    }
}