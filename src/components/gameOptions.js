import React, { Component } from 'react';
import { Form, Button, Select, message, InputNumber } from 'antd';
import '../App.css';

const { Option } = Select;


export default class GameOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: 1,
        }
    }

    startGame = (values) => {
        this.props.newGame(values);
    }

    fieldChange = (value, e) => {
        if (value[0] !== undefined){
            if (value[0].name[0] === 'players'){
                this.setState({players: value[0].value});
            }
        }
    }

    render() {

        const onFinishFailed = (error) => {
            message.error('There was an error starting the game.');
            this.props.startGameFailed();
        }

        return (
            <Form
                name='MemoryGameOptions'
                layout={this.state.width < 700 ? ('inline') : ('vertical')}
                style={{textAlign: 'center'}}
                initialValues={{players: 1, boardSize: 4, timeLimit: 3}}
                onFinish={this.startGame}
                onFinishFailed={onFinishFailed}
                onFieldsChange={this.fieldChange}
                size='small'
            >
                <Button type='primary' htmlType='submit'>
                    New Game!
                </Button>
                <br/><br/>
                <Form.Item name='boardSize' label='Board' >
                    <Select>
                        <Option value={4}>3 x 4</Option>
                        <Option value={5}>4 x 5</Option>
                        <Option value={6}>5 x 6</Option>
                        <Option value={7}>6 x 7</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='players' label='Players'>
                    <Select>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='timeLimit' label='Time Limit' style={{textAlign: 'left'}}>
                    <InputNumber
                        min={1}
                        max={10}
                        disabled={this.state.players === 2}
                    />
                </Form.Item>
            </Form>
        );
    }
}