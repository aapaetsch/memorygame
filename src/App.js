import React, { Component } from 'react';
import { Row, Col, Select, Button} from 'antd';
import MemoryGame from './components/memoryGame';
import './App.css';

const { Option } = Select;

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            gutter: [8, 8],
            boardSize: 3,
            gameStarted: false,

        }
    }

    handleSizeSelection = (value) => {
        this.setState({gameSize: Number(value)});
    }

    startNewGame = () => {
        this.setState({gameStarted: true});
    }

    render() {
        return (
            <div className='gamePageBackground'>
                <Row
                    justify='center'
                    align='middle'
                    gutter={this.state.gutter}
                >
                    <Col span={22}>
                        <div className='cardHeader'>
                            <h3 style={{color: '#fff'}}>Match Up</h3>
                            <span style={{paddingRight: '5px'}}>Board Size: </span>
                            <Select
                                defaultValue='3'
                                style={{marginRight:"20px"}}
                                onChange={this.handleSizeSelection}
                            >
                                <Option value='3'>3 x 3</Option>
                                <Option value='6'>6 x 6</Option>
                                <Option value='9'>9 x 9</Option>
                            </Select>
                            <Button
                                type='primary'
                                onClick={this.startNewGame}
                            >
                                New Game!
                            </Button>
                        </div>
                        <div className='cardBody'>
                            <MemoryGame
                                gameStarted={this.state.gameStarted}
                                boardSize={this.state.boardSize}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
      );
    }
}

