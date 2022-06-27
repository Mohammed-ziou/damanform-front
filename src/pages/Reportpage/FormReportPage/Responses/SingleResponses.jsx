import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  // PointElement,
  // LineElement,
  // // Title,
} from "chart.js";
import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import { registerables } from "chart.js";

ChartJS.register(...registerables);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

function SingleResponses({ qs, doc, indexI }) {
  const [labels, setLabels] = useState([]);
  const [ansArray, setAnsArray] = useState([]);
  const [ansCountArray, setAnsCountArray] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const ResponsesDataCalculations = async () => {
    for (let i = 0; i < qs.options.length; i++) {
      labels.push(qs.options[i].option);
    }
    await setLabels(labels);

    let resArray = doc.response;
    for (let i = 0; i < resArray.length; i++) {
      ansArray.push(doc.response[i].questions[indexI].answer);
    }
    await setAnsArray(ansArray);
    for (let i = labels.length; i > 0; i--) {
      ansCountArray.push(
        ansArray.filter((x) => JSON.stringify(x) === JSON.stringify(labels[i]))
          .length
      );
    }
    await setAnsCountArray(ansCountArray);
    setIsReady(true);
  };

  useEffect(() => {
    ResponsesDataCalculations();
  }, [qs]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 97, 192,0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "#4b61c0",
        ],
        borderWidth: 1,
      },
    ],
  };

  function isEven(n) {
    return n % 2 === 0;
  }
  const really = isEven(indexI);

  if (!isReady) {
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
  }

  return (
    <>
      <Paper elevation={2} className="my-2 p-2 p-md-5">
        <Typography variant="h4" color="textSecondary">
          {qs.question}
        </Typography>
        <div>
          {really ? (
            <Pie
              data={data}
              width={300}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Bar
              data={data}
              width={300}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </Paper>
    </>
  );
}

export default SingleResponses;
