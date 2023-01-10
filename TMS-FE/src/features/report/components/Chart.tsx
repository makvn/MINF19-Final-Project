import { useEffect, useState } from 'react';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IReportChart } from '../api/reports';
import { keys, map, values } from 'lodash';
import { formatChart } from '@/utils/format';

interface ChartProps {
  dataChart?: {
    booking: IReportChart;
    user: IReportChart;
  };
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      text: 'Dashboard User & Booking ',
      display: true,
    },
  },
};

export const Chart = (props: ChartProps) => {
  const { dataChart } = props;
  const [chart, setDataChart] = useState<any>();

  useEffect(() => {
    const labels = keys(dataChart?.user);
    const users = values(dataChart?.user);
    const bookings = values(dataChart?.booking);

    console.log({ users, labels, bookings });
    setDataChart({
      labels: map(labels, (e) => formatChart(e)),
      datasets: [
        {
          label: 'User',
          data: users,
          backgroundColor: 'blue',
        },
        {
          label: 'Booking',
          data: bookings,
          backgroundColor: 'green',
        },
      ],
    });
  }, [dataChart]);
  return (
    <div>
      <div className="card shadow bg-white rounded ">{dataChart ? <Bar options={options} data={chart} /> : null}</div>
    </div>
  );
};
