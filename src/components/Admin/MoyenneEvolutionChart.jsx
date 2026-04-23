import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function MoyenneEvolutionChart({ data }) {
  // transformation des données
  const labels = data.map(item => item.trimestre);
  const valeurs = data.map(item => item.moyenne);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Moyenne générale",
        data: valeurs,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        tension: 0.4, // rend la courbe fluide
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20, // car note sur 20
      },
    },
  };

    return <Line data={chartData} options={options} />;
}

export default MoyenneEvolutionChart;