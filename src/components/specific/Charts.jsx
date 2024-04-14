import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Filler, Tooltip, Legend } from "chart.js";
import { getLast7Days } from '../../lib/Features';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const labels = getLast7Days();

const linechartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      grid : {
        display : false,
      }
    },
    y: {
      beginAtZero:true,
      grid : {
        display : false,
      }
    }
  },
  elements: {
    point: {
      radius: 0,
    },
  }
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels: labels,
    datasets: [{
      label: 'Revenue', 
      data: value, 
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
    }],
  };

  return (
    <Line
      data={data}
      options={linechartOptions}
    />
  );
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels: labels,
    datasets: [{
      label: "Total Chats vs Groups Chat", 
      data: value, 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: 100,
  };

  return (
    <Doughnut
      data={data}
      options={doughnutOptions}
    />
  );
};

export { LineChart, DoughnutChart };
