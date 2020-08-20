import React, { Component } from 'react';
import {Row, Col, Select, Button, Space} from 'antd';
import GameTile from './gameTile';
import getImages from '../helpers/getImages';
import '../App.css';


export default class MemoryGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: [],
        }

    }

    handleTileClick = () => {

    }
    newGame = () => {
    }

    render() {
        // let myGameBoard = [];
        // for (let i = 0; i < this.props.boardSize; i++){
        //     let row = [];
        //     for (let j = 0; j < this.props.boardSize; j++)
        // }
        return (
            <table id='myGame' align='center'>
                <tbody>
                {/*{myGameBoard}*/}
                </tbody>
            </table>
        );
    }
}