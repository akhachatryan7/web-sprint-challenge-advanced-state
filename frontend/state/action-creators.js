import axios from 'axios'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, RESET_QUIZ_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types'


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer
  };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  };
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange(payload) {
  return {
    type: INPUT_CHANGE,
    payload,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };

 }

// ❗ Async action creators
export const fetchQuiz = () => (dispatch) => {
  // return function (dispatch) {
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
  dispatch({ type: RESET_QUIZ_STATE });
  axios.get('http://localhost:9000/api/quiz/next')
    .then((res) => {
      // console.log(res);
      dispatch(setQuiz(res.data));
    })
    .catch((err) => {
      console.log(err);
    })

}
// }


export const postAnswer = (quiz_id, answer_id) => (dispatch) => {

  // On successful POST:
  // - Dispatch an action to reset the selected answer state
  // - Dispatch an action to set the server message to state
  // - Dispatch the fetching of the next quiz

  const payload = {
    quiz_id: quiz_id,
    answer_id: answer_id,
  };


  axios
    .post('http://localhost:9000/api/quiz/answer', payload)

    .then((res) => {
      console.log(res);
      dispatch(setMessage(res.data.message));
    }).then((res) => {
      dispatch(fetchQuiz());
    })
    .catch((err) => console.error(err))

}


export function postQuiz(payload) {
  
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios
      .post('http://localhost:9000/api/quiz/new', payload)
      .then((res) => {
        console.log(res)
        const customMessage = `{Congrats: "${payload.question_text}" is a great question!}`;
        dispatch(setMessage(customMessage));
      }).then((res) =>{
        dispatch(resetForm());
      })
      .catch((err) => {
        console.error(err);
      });

  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
