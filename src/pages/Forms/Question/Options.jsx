import React from "react";
import "./options.css";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";

function Options({
  props,
  indexNumber,
  handleOptionFunction,
  questionN,
  handleDeleteOption,
}) {
  return (
    <div>
      <RadioButtonUncheckedIcon fontSize="small" />
      <input
        className="m-2 form-control options"
        type="text"
        placeholder="Option"
        id="option"
        name="option"
        required
        value={props.option}
        onChange={(e) => handleOptionFunction(e, questionN, indexNumber)}
      />
      <IconButton onClick={() => handleDeleteOption(indexNumber, questionN)}>
        <HighlightOffIcon />
      </IconButton>
    </div>
  );
}

export default Options;
