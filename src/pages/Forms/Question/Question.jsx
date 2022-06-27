import React from "react";
import Options from "./Options";
import "./question.css";

import { IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function Question({
  props,
  indexNumber,
  handleQuestionFunction,
  handleOptionFunction,
  handleAddOption,
  handleDeleteQuestion,
  handleDeleteOption,
}) {
  // const newOptions = [...props.options];

  // newOptions.questionN = indexNumber;
  // props.options.questionN = indexNumber;

  return (
    <div className="form-question-container my-2">
      <div className="row form-group form-question">
        <TextField
          name="question"
          label="Question"
          required
          value={props.question}
          onChange={(e) => handleQuestionFunction(e, indexNumber)}
        />
        <div className="row my-3">
          {props.options.map((o, i) => (
            <Options
              props={o}
              key={i}
              handleOptionFunction={handleOptionFunction}
              handleDeleteOption={handleDeleteOption}
              indexNumber={i}
              questionN={indexNumber}
            />
          ))}
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={(e) => handleAddOption(e, indexNumber)}
            disabled={props.options.length > 3 ? true : false}
          >
            Add option
          </button>
        </div>
        <div className="row justify-content-end">
          <div className="col-1">
            <IconButton onClick={() => handleDeleteQuestion(indexNumber)}>
              <DeleteIcon className="delete-buton" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
