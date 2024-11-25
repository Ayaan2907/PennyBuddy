import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

import { PieChartProps, tailwindToRgbColors } from "@/app/models/transactionUtils";


ChartJS.register(ArcElement, Tooltip, Legend, Title);


const PieChart: React.FC<PieChartProps> = ({ transactions }) => {
    const categorySpending: Record<string, number> = transactions.reduce(
        (acc, transaction) => {
            const category = Array.isArray(transaction.category)
                ? transaction.category[0]
                : transaction.category;
            acc[category] = (acc[category] || 0) + transaction.amount;
            return acc;
        },
        {} as Record<string, number>
    );

    const labels = Object.keys(categorySpending);
    const data = Object.values(categorySpending);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Spends by Category",
                data,
                backgroundColor: tailwindToRgbColors,
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
                text: "Spends by Category",
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full h-full flex items-center justify-center">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
