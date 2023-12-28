import React from 'react'
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
      {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`cog ${index === props.wheelPosition ? 'active' : ''}`}
            style={{ '--i': index }}
          >
            {index === props.wheelPosition ? 'B' : ''}
          </div>
        ))}
      </div>

      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    wheelPosition: state.wheel,
  };
};

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);