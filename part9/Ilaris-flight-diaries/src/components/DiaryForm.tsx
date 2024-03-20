import React, { useState } from 'react';
import { NewDiaryEntry } from '../types';

type AppProps = {
    addDiary: (NewDiaryEntry: NewDiaryEntry) => void
  };



const DiaryForm = ({addDiary}: AppProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const diaryCreation = (event: React.SyntheticEvent) => {

    event.preventDefault();
    const diaryObject = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
        };
    addDiary(diaryObject);
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
    }

return (
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
);
};
export default DiaryForm;