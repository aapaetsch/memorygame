import React, { Component, createRef } from 'react';
import { Row, Col, Card} from 'antd';
import MemoryGame from './components/memoryGame';
import GameOptions from "./components/gameOptions";
import './App.css';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            boardSize: 4,
            gameStarted: false,
            players: 1,
            timeLimit: 3,
        }
        this.gameRef = createRef();
    }


    startNewGame = (values) => {
        this.setState({...values, gameStarted: true}, () => {
            this.gameRef.current.newGame()
        });

    }

    endGame = () => {
        this.setState({gameStarted: false});
    }

    render() {
        const optionSizes = {
            'xs': 7,
            'sm': 7,
            'md': 6,
            'lg': 5,
            'xl': 4
        }
        const gameSizes = {
            'xs': 17,
            'sm': 17,
            'md': 17,
            'lg': 18,
            'xl': 19
        }
        return (
            <div className='gamePageBackground'>
                <Row align='top' justify='center' gutter={[8, 8]} >
                    <Col {...optionSizes}>
                        {/*Game Options*/}
                        <Card title='Options' bordered={false} style={{height: '100%'}} >
                            <GameOptions newGame={this.startNewGame} startGameFailed={this.endGame}/>
                        </Card>
                    </Col>
                    <Col {...gameSizes}>
                        {/*Game Board*/}
                        <MemoryGame
                            ref={this.gameRef}
                            {...this.state}
                            endGame={this.endGame}
                            newGame={this.startNewGame}
                        />
                    </Col>
                </Row>
            </div>
      );
    }
}

