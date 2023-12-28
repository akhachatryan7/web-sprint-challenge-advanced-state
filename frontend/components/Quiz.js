import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const { quiz, selectedAnswer } = props;

  const handleAnswerSelect = (answer) => {
    props.selectAnswer(answer);
  };

  const handleAnswerSubmit = () => {
    const payload = {
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer.answer_id,
    };

      props.postAnswer(quiz.quiz_id, selectedAnswer.answer_id);
    
  };


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer) => (
                <div className={`answer ${answer === selectedAnswer ? 'selected' : ''}`} key={answer.answer_id}>
                  {answer.text}
                  <button onClick={() => handleAnswerSelect(answer)}> {answer === selectedAnswer ? 'SELECTED' : 'Select'}</button>
                </div>
              ))}
            </div>

            <button
              id="submitAnswerBtn"
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
            >
              Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  };
};




export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);