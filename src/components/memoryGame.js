import React, { Component } from 'react';
import { message, Row, Col, Modal } from 'antd';
import {GameTile, Timer, PlayerStats, winnerMessage, loserMessage} from './gameComponents';
import '../App.css';


export default class MemoryGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null,
            gameBoard: [],
            remaining: -1,
            isProcessing: false,
            newGameTrigger: 0,
            matches: { 1:0, 2:0 },
            turns: 0,
            currentPlayer: 1,
        }

    }
    componentDidMount() {
        this.allCards = this.getImages();
        this.setBoard([...this.allCards].slice(0,13));
    }

    getImages = () => {
        //this method gets all of the images for the game cards
        const images = [];
        for (let i = 1; i < 28; i++){
            images.push(`/images/green${i}.png`);
            images.push(`/images/red${i}.png`);
            images.push(`/images/purple${i}.png`);
        }

        return images;
    }

    newGame = () => {
        //Shuffle the deck of cards
        this.allCards = this.randomizeCards([...this.allCards]);

        //Generate all unique card pairings
        const uniqueCards = (this.props.boardSize * (this.props.boardSize - 1)) / 2;
        let cards = this.allCards.slice(0, uniqueCards);
        //Shuffle the deck of pairs
        cards = this.randomizeCards([...cards, ...cards]);

        this.setBoard(cards);
        this.setState({
            remaining: uniqueCards,
            isProcessing: false,
            currentPlayer: 1,
            matches: { 1:0, 2:0 },
            selected: null,
            turns: 0,
            newGameTrigger: this.state.newGameTrigger + 1});
    }

    randomizeCards = (cardDeck) => {
        let cards = [...cardDeck];
        //Fisher-Yates Shuffle
        for (let i = cards.length - 1; i > 0; i--){
            //shuffle every position but index 0 to prevent both i and j from being 0
            const j = Math.floor(Math.random() * i);
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        return cards;
    }

    setBoard = (cards) => {
        //This method sets the props for each game tile
        let gameBoard = [];
        for (let i = 0; i < cards.length; i++){
            gameBoard.push({id: i, clicked: false, matched: false, src: cards[i]});
        }

        this.setState({gameBoard: gameBoard});
    }

    handleTileClick = (e) => {

        let index = e.target.id;
        if (index === this.state.selected){
            message.warning('Card is already selected', 1);

        } else if (!this.state.isProcessing && this.props.gameStarted) {
            this.setState({isProcessing: true});

            let gameBoard = [...this.state.gameBoard];
            if (!gameBoard[index].clicked && !gameBoard[index].matched){
                gameBoard[index].clicked = true;

                if (this.state.selected === null){
                    //If the user has not selected another card this turn, store the currently selected card
                    this.setState({selected: index, gameBoard: gameBoard, isProcessing: false});

                } else {
                    //If the user has selected 2 cards, check if they are the same image
                    if (gameBoard[this.state.selected].src === gameBoard[index].src){
                        //Keep the card uncovered if they match
                        gameBoard[index].matched = true;
                        gameBoard[this.state.selected].matched = true;

                        //Increment a players matches if they are the same (only for 2p game)
                        let matches = {...this.state.matches}
                        matches[this.state.currentPlayer] += 1

                        this.setState({
                            remaining: this.state.remaining - 1,
                            matches: matches,
                        }, () => {
                            let timeout = 0;
                            if (this.props.players === 2){
                                timeout = 500;
                            }

                            this.checkWin();
                            this.endTurn(gameBoard,timeout);
                        });

                    } else {
                        //If the two cards are not the same image, revert them back to covered
                        this.setState({ gameBoard: [...gameBoard] },  () => {
                            gameBoard[index].clicked = false;
                            gameBoard[this.state.selected].clicked = false;
                            this.endTurn(gameBoard, 500);
                        });
                    }
                }
            }
        } else if (!this.props.gameStarted) {
            message.error("Please start a new game!");
        }
    }

    endTurn = (gameBoard, timeoutLength) => {
        setTimeout( () => {
            this.setState({
                selected: null,
                gameBoard: gameBoard,
                currentPlayer: 3 - this.state.currentPlayer,
                isProcessing: false
            });
        }, timeoutLength);
    }

    checkWin = () => {
        //If there are no remaining matches, show a win notification
        if (this.state.remaining === 0){
            winnerMessage({matches: this.state.matches, players: this.props.players} );
            this.props.endGame();
        }
        //switch the current player at the end of a turn
        // this.setState({isProcessing: false, currentPlayer: 3 - this.state.currentPlayer});
    }

    timeLimitReached = () => {
        //End the game and show a lose message if timelimit is reached
        this.props.endGame();
        loserMessage(this.state.remaining);
        this.setState({isProcessing: false});
    }

    soloWinMessage = (time, showMessage) => {
        //Show a different win message for single player game
        if (!showMessage){
            Modal.success({
                title: 'Winner!',
                content: `Player wins with ${time} remaining.`
            })
        }
    }

    render() {
        //Create the gameboard with new states on each render.
        let myGameBoard=[];
        const width = (1 / (this.props.boardSize - 1)) * 90;
        let k = 0;

        for (let i = 0; i < this.props.boardSize; i++){
            let row = [];

            for (let j = 0; j < this.props.boardSize - 1; j++){

                const cell = (
                    <GameTile
                        {...this.state.gameBoard[k]}
                        width={width}
                        tileClick={this.handleTileClick}
                        cp={this.state.currentPlayer}
                        players={this.props.players}
                    />)

                row.push(cell);
                k++;
            }

            myGameBoard.push(<div className='gameRow'>{row}</div>)
        }

        return (
            <div>
                <Row align='middle' justify='center' className='cardHeader'>
                    <Col span={8}>
                        {this.props.players === 2 ?
                            (
                                <PlayerStats matches={this.state.matches} currentPlayer={this.state.currentPlayer}/>
                            ) : (
                                <Timer
                                    newGame={this.state.newGameTrigger}
                                    paused={this.state.remaining === 0}
                                    limit={this.props.timeLimit}
                                    limitReached={this.timeLimitReached}
                                    showWinMessage={this.soloWinMessage}
                                />
                            )
                        }
                    </Col>
                    <Col span={8}>
                        <h2 style={{color: '#fff'}}>Memory Game</h2>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <div className='cardBody'>
                    {myGameBoard}
                </div>
            </div>
        );
    }
}