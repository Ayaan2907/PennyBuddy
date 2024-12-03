import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { BarChartProps, tailwindToRgbColors } from "@/app/models/transactionUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const BarChart: React.FC<BarChartProps> = ({ accounts }) => {
  const labels = accounts.map(
    (account) => `${account.institution} - ${account.subtype.charAt(0).toUpperCase() + account.subtype.slice(1)}`
  );
  const data = accounts.map((account) => parseFloat(account.b_current_balance));

  const uniqueData = Array.from(new Set(data));
  const colorMap = uniqueData.reduce<Record<number, string>>((acc, value, index) => {
    acc[value] = tailwindToRgbColors[index % tailwindToRgbColors.length];
    return acc;
  }, {});

  const chartData = {
    labels,
    datasets: [
      {
        label: "Current Balance",
        data,
        backgroundColor: data.map((value) => colorMap[value]),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    autopadding: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Account Balances",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-full flex items-center justify-center">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
