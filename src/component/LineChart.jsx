import React from "react";
import {Line} from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }
//   const data = {
//     labels: coinTimestamp,
//     datasets: [
//       {
//         label: "Price In USD",
//         data: coinPrice,
//         // fill: false,
//         backgroundColor: "#0071bd",
//         borderColor: "#0071bd",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

const data = {
    labels: ['Jan', 'Mar', 'May', 'July', 'Oct'],
    datasets: [
      {
        label: 'Iphone sales',
        data: [400, 1000, 4000, 800, 1500],
        fill: true,
        backgroundColor:"#2e4355",
        pointBorderColor:"#8884d8",
        pointBorderWidth:5,
        pointRadius:8,
        tension: 0.4
      },
    ],
  };
  
  const options = {
    plugins:{legend:{display:false}},
    layout:{padding:{bottom:100}},
    scales: {
      y:{
        ticks:{
          color:"white",
          font:{
            size:18
          }
        },
        grid:{
          color:"#243240"
        }
      },
      x:{
        ticks:{
          color:"white",
          font:{
            size:18
          }
        }
      }
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      {/* <Line data={data} options={options} /> */}


      
    </>
  );
};

export default LineChart;
