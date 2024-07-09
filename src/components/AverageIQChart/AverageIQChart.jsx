import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './AverageIQChart.module.scss';

import usa from '../../img/flags/USA.svg';
import argentina from '../../img/flags/AR.svg';
import canada from '../../img/flags/CA.svg';
import estonia from '../../img/flags/EE.svg';
import uk from '../../img/flags/UK.svg';
import australia from '../../img/flags/AU.svg';
import china from '../../img/flags/CN.svg';
import india from '../../img/flags/IN.svg';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dataByAge = {
  datasets: [
    {
      label: 'Average IQ',
      data: [90, 105, 100, 95, 85],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
  labels: [
    '< 18 Years',
    '18-39 Years',
    '40-59 Years',
    '59-79 Years',
    '>80 Years',
  ],
};

const dataByCountry = [
  { country: 'USA', iq: 97, flag: usa },
  { country: 'Argentina', iq: 86, flag: argentina },
  { country: 'Canada', iq: 99, flag: canada },
  { country: 'Estonia', iq: 100, flag: estonia },
  { country: 'UK', iq: 99, flag: uk },
  { country: 'Australia', iq: 99, flag: australia },
  { country: 'China', iq: 105, flag: china },
  { country: 'India', iq: 76, flag: india },
];

const AverageIQChart = () => {
  return (
    <div className={styles.averageIQChart}>
      <h2>Some interesting facts</h2>
      <div className={styles.subtitle}>Average IQ by age</div>
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <Bar
            data={dataByAge}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className={styles.countryList}>
          {dataByCountry.map(item => (
            <div key={item.country} className={styles.countryItem}>
              <img
                src={item.flag}
                className={styles.flagPlaceholder}
                alt='flag'
              />
              <div className={styles.country}>{item.country}</div>
              <div>{item.iq}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AverageIQChart;
