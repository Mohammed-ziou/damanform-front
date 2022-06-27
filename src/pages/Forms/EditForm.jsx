import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Question from "./Question/Question";
// import EditQuestion from "./Question/Edit/EditQuestion";
import "./newform.css";
import { getForm, reset, updateForm } from "../../redux/docs/docSlice";
import { CircularProgress } from "@material-ui/core";

export default function NewForm() {
  const [questionEList, setQuestionEList] = useState({
    title: "",
    description: "",
    questions: [{ question: "", options: [{ option: "" }] }],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  const { doc, message, isError } = useSelector((state) => state.docs);

  // console.log(doc.questions);
  // const hello = isLoading || isSuccess;
  // console.log(doc);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user.token) {
      navigate("/login");
    }

    dispatch(getForm(id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, id]);

  useEffect(() => {
    console.log(doc);

    if (doc.questions && doc.questions[0]) {
      console.log(doc.questions);
      const value = {
        title: doc.title,
        description: doc.description,
        questions: doc.questions.map((q) => ({
          question: q.question,
          options: q.options.map((o) => ({
            option: o.option,
          })),
        })),
      };
      setQuestionEList(value);
      console.log(value);
    }

    // console.log(doc.questions);
  }, [doc]);

  const handleChangeEvent = (e) => {
    const value = { ...questionEList };
    value[e.target.name] = e.target.value;
    setQuestionEList(value);
  };

  const handleQuestionFunction = (e, i) => {
    const value = { ...questionEList };
    value.questions[i].question = e.target.value;
    setQuestionEList(value);
  };

  const handleOptionFunction = (e, i, io) => {
    console.log(e.target.value);
    console.log(i, io);
    const value = { ...questionEList };
    value.questions[i].options[io].option = e.target.value;
    setQuestionEList(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(questionEList);
    // setQuestionEList(questionEList);
    console.log(id, questionEList);
    const dataNeeded = { form: questionEList, id: id };
    dispatch(updateForm(dataNeeded));
    navigate("/forms");
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const value = { ...questionEList };

    console.log(value.questions);

    value.questions.push({
      question: "",
      options: [{ option: "" }, { option: "" }],
    });
    console.log(value.questions);
    setQuestionEList(value);
  };

  const handleAddOption = (e, indexNumber) => {
    e.preventDefault();
    const value = { ...questionEList };
    value.questions[indexNumber].options.length < 4
      ? value.questions[indexNumber].options.push({ option: "" })
      : console.log("4 is max");
    setQuestionEList(value);
  };

  const handleDeleteQuestion = (i) => {
    const value = { ...questionEList };
    value.questions.splice(i, 1);
    setQuestionEList(value);
  };
  const handleDeleteOption = (i, q) => {
    const value = { ...questionEList };
    value.questions[q].options.splice(i, 1);
    setQuestionEList(value);
  };

  const handleCancel = () => {
    navigate("/");
  };
  // const handleClear = () => {
  //   setQuestionEList({
  //     title: "",
  //     description: "",
  //     questions: [{ question: "", options: [{ option: "" }, { option: "" }] }],
  //   });
  // };

  if (!doc) {
    return (
      <div className="container d-flex justify-content-center">
        <CircularProgress />;
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleUpdate}>
        <div className="title-box">
          <label htmlFor="title">Form Title</label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            name="title"
            required
            value={questionEList.title}
            onChange={(e) => handleChangeEvent(e)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            required
            value={questionEList.description}
            onChange={(e) => handleChangeEvent(e)}
            cols="10"
          ></textarea>
        </div>
        <div className="row questions-container">
          {questionEList.questions ? (
            questionEList.questions.map((q, i) => (
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
            ))
          ) : (
            <CircularProgress />
          )}
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
            onClick={handleUpdate}
          >
            Update
          </button>
          <button className="col-3 mx-3 btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
