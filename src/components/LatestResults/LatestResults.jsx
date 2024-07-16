import React, { useEffect, useState } from 'react';
import s from './LatestResults.module.scss';
import { resultsData } from './resultsData.js';

const LatestResults = () => {
  const [results, setResults] = useState(resultsData.slice(0, 8));

  useEffect(() => {
    const interval = setInterval(() => {
      setResults(prevResults => {
        const newResults = [...prevResults];
        const newEntry =
          resultsData[Math.floor(Math.random() * resultsData.length)];
        newResults.pop();
        newResults.unshift(newEntry);
        return newResults;
      });
    }, Math.random() * 1000 + 7000);

    return () => clearInterval(interval);
  }, []);

  const splitResults = () => {
    const column1 = results.slice(0, 4);
    const column2 = results.slice(4, 8);
    return [column1, column2];
  };

  const [column1, column2] = splitResults();

  return (
    <div className={s.latestResults}>
      <h2>Latest results</h2>
      <div className={s.resultsList}>
        <div className={s.column}>
          {column1.map((result, index) => (
            <div key={index} className={s.resultItem}>
              <div className={s.flagAndName}>
                <img
                  src={result.flag}
                  alt={`${result.name} flag`}
                  className={s.flag}
                />
                <div>
                  <p className={s.name}>{result.name}</p>
                  <p className={s.timeAgo}>a min ago</p>
                </div>
              </div>
              <div className={s.iqScore}>
                <span>IQ</span>
                <strong>{result.iqScore}</strong>
              </div>
            </div>
          ))}
        </div>
        <div className={s.column}>
          {column2.map((result, index) => (
            <div key={index} className={s.resultItem}>
              <div className={s.flagAndName}>
                <img
                  src={result.flag}
                  alt={`${result.name} flag`}
                  className={s.flag}
                />
                <div>
                  <p className={s.name}>{result.name}</p>
                  <p className={s.timeAgo}>a min ago</p>
                </div>
              </div>
              <div className={s.iqScore}>
                <span>IQ</span>
                <strong>{result.iqScore}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestResults;
