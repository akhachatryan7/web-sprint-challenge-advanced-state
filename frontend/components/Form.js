import React, { useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { setMessage, inputChange, postQuiz } from '../state/action-creators'

 function Form(props) {
  const { form } = props;


  const handleInputChange = (evt) => {
    const { id, value } = evt.target;
    props.inputChange({ [id]: value });
  };





  const onSubmit = evt => {
    evt.preventDefault();

    const payload = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer,
    };

    props.postQuiz(payload);
  };

  const isSubmitDisabled =
  Object.keys(form).some((key) => {
    const value = form[key];
    return !value || (typeof value === 'string' && value.trim().length < 1);
  });


  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>

      <input
        maxLength={50}
        value={form.newQuestion}
        onChange={handleInputChange}
        id="newQuestion"
        placeholder="Enter question"
      />

      <input
        maxLength={50}
        value={form.newTrueAnswer}
        onChange={handleInputChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />

      <input
        maxLength={50}
        value={form.newFalseAnswer}
        onChange={handleInputChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />

      <button id="submitNewQuizBtn" disabled={isSubmitDisabled} >Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};


export default connect(mapStateToProps, { inputChange, setMessage, postQuiz })(Form);
