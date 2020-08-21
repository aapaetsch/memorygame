import React, { Component } from 'react';
import { Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../App.css';

export const GameTile = (props) => {
    console.log(props)
    return (
    <div
        style={{width: `${props.width}%`}}
        className='gameCol'
        onClick={props.tileclick}
        id={props.id}
    >
        {(props.clicked || props.matched) ?
            (
                <img
                    id={props.id}
                    className='imageResize'
                    src={props.src}
                    alt={props.src}/>
            ) : (
                <img
                    id={props.id}
                    className='imageResize'
                    src={'/images/cardBack.jpg'}
                    alt={<QuestionCircleOutlined/>}/>
            )
        }
    </div>
    )
}


// export default class GameTile extends Component {
//
//     componentDidMount() {
//         console.log(this.props)
//     }
//
//     shouldComponentUpdate(nextProps, nextState, nextContext) {
//         return this.props !== nextProps || this.state !== nextState;
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         console.log(this.props);
//     }
//
//     handleClick = (e) => {
//         if (this.props.clickable){
//             // this.setState({clicked: !this.state.clicked});
//             this.props.tileClick(e);
//         }
//     }
//
//
//     render() {
//         return (
//             <div
//                 style={{width: `${this.props.width}%`}}
//                 className='gameCol'
//                 onClick={this.handleClick}
//                 id={this.props.id}
//             >
//                 {(this.props.clicked || this.props.matched)
//                     ? (<img id={this.props.id} className='imageResize' src={this.props.src} alt=''/>)
//                     : (<img id={this.props.id} className='imageResize' src={'/images/cardBack.jpg'}/>)
//                 }
//
//
//             </div>
//
//         );
//     }
// }