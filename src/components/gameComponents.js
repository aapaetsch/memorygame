import React, { Component } from 'react';
import { Statistic, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../App.css';

export const GameTile = (props) => {

    let cardStyles = 'gameCol';
    if (props.players === 2){
        cardStyles += ` gameColP${props.cp}`
    }

    return (
        <div
            style={{width: `${props.width}%`}}
            className={cardStyles}
            onClick={props.tileClick}
            id={props.id}
        >
            {(props.clicked || props.matched) ?
                (
                    <img
                        id={props.id}
                        className='imageResize'
                        src={props.src}
                        alt={<span>{props.src}</span>}/>
                ) : (
                    <img
                        id={props.id}
                        className='imageResize'
                        src='/images/questionmark.png'
                        alt=''/>
                )
            }
        </div>
    )
}

export const PlayerStats = props => {
    let p1Class = 'playerStat';
    let p2Class = 'playerStat';
    if (props.currentPlayer === 1){
        p1Class += ' playerStatTurn'
    } else {
        p2Class += ' playerStatTurn'
    }
    return (
        <div>
            <span
                className={p1Class}
                style={{color: '#ffec3d'}}>P1 Matches: {props.matches[1]}</span>
            <br/>
            <span
                className={p2Class}
                style={{color: '#ff4d4f'}}>P2 Matches: {props.matches[2]}</span>
        </div>
    )
}

const numToWord = require('number-to-words');
export const winnerMessage = props => {

    if (props.players === 2) {

        if (props.matches[1] === props.matches[2]) {

            return Modal.info({
                title: 'Draw!',
                content: `Both players found ${numToWord.toWords(props.matches[1])} pairs!`
            });

        } else {

            let winner = 1;
            if (props.matches[1] < props.matches[2]) {
                winner = 2;
            }

            const diff = Math.abs(props.matches[1] - props.matches[2]);


            return Modal.success({
                title: `Player ${winner} Wins!`,
                content: `Player ${winner} has ${numToWord.toWords(diff)} more pairs than player ${3 - winner}.`
            });
        }
    }
}

export const loserMessage = props => {
    return (
        Modal.error({
            title: 'You Lose!',
            content: `You have run out of time with ${props} pairs remaining.`
        })
    )
}

const { Countdown } = Statistic;
export class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeLimit: 0
        }
        //Set state takes too long to assign winShown.
        this.winShown = false;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.newGame !== nextProps.newGame
            || this.props.paused !== nextProps.paused
            || this.state.timeLimit !== nextState.timeLimit;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.newGame !== prevProps.newGame){
            this.setState({timeLimit: Date.now() + (this.props.limit * 60000)});
            this.winShown = false;
        }
    }

    render() {

        if (this.props.paused){

            const timeRemaining = new Date(this.state.timeLimit - Date.now());
            const timeString = `${timeRemaining.getMinutes()}:${timeRemaining.getSeconds()}:${timeRemaining.getMilliseconds()}`

            this.props.showWinMessage(timeString, this.winShown);
            this.winShown = true;

            return <h2 style={{color: '#fff'}}>{timeString}</h2>

        } else {

            return (
                <div>
                    <span className='countdownTimer timerLabel'>Time Remaining:</span>
                    <Countdown
                        format='m:ss:SSS'
                        className='countdownTimer'
                        value={this.state.timeLimit}
                        onFinish={this.props.limitReached}
                    />
                </div>
            )
        }
    }
}


