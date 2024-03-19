import React, { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data as DiaryEntry[]);
    });
  }, []);


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryObject = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    };
    axios.post('http://localhost:3000/api/diaries', diaryObject).then(response => {
      setDiaries(diaries.concat(response.data as DiaryEntry));
    });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <h2>create new</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>diaries</h2>
      <div>
        {diaries.map((diary, i) => (
          <div key={i}>
            {diary.date}<br />
            visibility: {diary.visibility}<br />
            weather: {diary.weather} <br />
            comment: {diary.comment} <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;