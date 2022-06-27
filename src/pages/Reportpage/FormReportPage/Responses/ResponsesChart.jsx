import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import SingleResponses from "./SingleResponses";

function ResponsesChart({ doc }) {
  if (!doc)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "70vh" }}
      >
        <CircularProgress />
      </Grid>
    );

  // get question
  const questions = doc?.questions?.map((q) => q.question);

  //   get options
  const options = doc?.questions?.map((q) => q.options.map((o) => o.option));

  const responsesQ = doc?.response?.map((r) => r.questions);
  const responsesA = responsesQ?.map((qa) => qa.map((aq) => aq.answer));

  const QNumber = questions?.length;
  let arraySeperator = [];
  for (let i = 0; i < QNumber; i++) {
    arraySeperator.push(
      responsesA?.map(function (x) {
        return x[i];
      })
    );
  }

  const anwers = "";

  return (
    <Grid container spacing={2}>
      {doc?.questions?.map((qs, i) => (
        <Grid item xs={12} md={6} key={i}>
          <SingleResponses qs={qs} doc={doc} indexI={i} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ResponsesChart;
