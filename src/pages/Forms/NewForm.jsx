import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Question from "./Question/Question";
import "./newform.css";
import { createForm } from "../../redux/docs/docSlice";
import { useNavigate } from "react-router";

export default function NewForm() {
  const [questionList, setQuestionList] = useState({
    title: "",
    description: "",
    questions: [{ question: "", options: [{ option: "" }] }],
  });

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeEvent = (e) => {
    const value = { ...questionList };
    value[e.target.name] = e.target.value;
    setQuestionList(value);
  };

  const handleQuestionFunction = (e, i) => {
    const value = { ...questionList };
    value.questions[i].question = e.target.value;
    setQuestionList(value);
  };

  const handleOptionFunction = (e, i, io) => {
    const value = { ...questionList };
    // console.log(i, io);
    value.questions[i].options[io].option = e.target.value;
    setQuestionList(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to submit the form")) {
      dispatch(createForm(questionList));

      setQuestionList({
        title: "",
        description: "",
        questions: [{ question: "", options: [{ option: "" }] }],
      });
      navigate("/forms");
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const value = { ...questionList };

    // console.log(value.questions);

    value.questions.push({
      question: "",
      options: [{ option: "" }],
    });
    // console.log(value.questions);
    setQuestionList(value);
  };

  const handleAddOption = (e, indexNumber) => {
    e.preventDefault();
    const value = { ...questionList };
    value.questions[indexNumber].options.length < 4
      ? value.questions[indexNumber].options.push({ option: "" })
      : window.alert("4 is max");
    setQuestionList(value);
  };

  const handleDeleteQuestion = (i) => {
    const value = { ...questionList };
    value.questions.splice(i, 1);
    setQuestionList(value);
  };
  const handleDeleteOption = (i, q) => {
    const value = { ...questionList };
    value.questions[q].options.splice(i, 1);
    setQuestionList(value);
  };

  // const handleCancel = () => {
  //   navigate("/");
  // };
  const handleClear = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to clear the form")) {
      setQuestionList({
        title: "",
        description: "",
        questions: [{ question: "", options: [{ option: "" }] }],
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="title-box">
          <label htmlFor="title">Form Title</label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            name="title"
            value={questionList.title}
            onChange={(e) => handleChangeEvent(e)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={questionList.description}
            onChange={(e) => handleChangeEvent(e)}
            cols="10"
          ></textarea>
        </div>
        <div className="row questions-container">
          {questionList.questions.map((q, i) => (
            <Question
              props={q}
              key={i}
              handleQuestionFunction={handleQuestionFunction}
              handleOptionFunction={handleOptionFunction}
              handleAddOption={handleAddOption}
              handleDeleteOption={handleDeleteOption}
              handleDeleteQuestion={handleDeleteQuestion}
              indexNumber={i}
            />
          ))}
        </div>
        <div className="row">
          <button className="btn btn-primary" onClick={handleAddQuestion}>
            Add a question
          </button>
        </div>

        <div className="row my-5 submit-container">
          <button
            className="col-3 mx-3 btn btn-success"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button className="col-3 mx-3 btn btn-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
