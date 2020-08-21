import React, { Component } from 'react';
import { Form, Button, Select, message, InputNumber } from 'antd';
import '../App.css';

const { Option } = Select;


export default class GameOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: 1
        }
    }

    startGame = (values) => {
        this.props.newGame(values);
    }

    fieldChange = (value, e) => {
        if (value[0] !== undefined){
            if (value[0].name[0] === 'players'){
                console.log(value[0].value)
                this.setState({players: value[0].value});
            }
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {'xs':12},
            wrapperCol: {'xs':12}
        }
        const onFinishFailed = (error) => {
            message.error('There was an error starting the game.');
            this.props.startGameFailed();
        }
        return (
            <Form
                name='MemoryGameOptions'
                {...formItemLayout}
                style={{textAlign: 'center'}}
                initialValues={{players: 1, boardSize: 4, timeLimit: 3}}
                onFinish={this.startGame}
                onFinishFailed={onFinishFailed}
                onFieldsChange={this.fieldChange}
            >
                <Button type='primary' htmlType='submit'>
                    New Game!
                </Button>
                <br/><br/>
                <Form.Item name='boardSize' label='Board Size'>
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
                <Form.Item name='timeLimit' label='Time Limit'>
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