import React, { useState } from 'react';
import { NewDiaryEntry } from '../types';

type AppProps = {
    addDiary: (NewDiaryEntry: NewDiaryEntry) => void
  };



const DiaryForm = ({addDiary}: AppProps) => {
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const diaryObject: NewDiaryEntry = {
            date,
            comment,
            visibility,
            weather
        };
        addDiary(diaryObject);
        setDate('');
        setComment('');
        setVisibility('');
        setWeather('');
    };

    return (
        
        <form onSubmit={diaryCreation}>
            <h2>Add new entry</h2>
            <p>
                <label>
                    date <input type='date' name='myDate' value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
            </p>
            <p>
                visibility
                <label>
                    <input type='radio' name='myRadio' value='great' checked={visibility === 'great'} onChange={(e) => setVisibility(e.target.value)} />
                    great
                </label>
                <label>
                    <input type='radio' name='myRadio' value='good' checked={visibility === 'good'} onChange={(e) => setVisibility(e.target.value)} />
                    good
                </label>
                <label>
                    <input type='radio' name='myRadio' value='ok' checked={visibility === 'ok'} onChange={(e) => setVisibility(e.target.value)} />
                    ok
                </label>
                <label>
                    <input type='radio' name='myRadio' value='poor' checked={visibility === 'poor'} onChange={(e) => setVisibility(e.target.value)} />
                    poor
                </label>
            </p>
            <p>
                weather
                <label>
                    <input type='radio' name='myRadio2' value='sunny' checked={weather === 'sunny'} onChange={(e) => setWeather(e.target.value)} />
                    sunny
                </label>
                <label>
                    <input type='radio' name='myRadio2' value='cloudy' checked={weather === 'cloudy'} onChange={(e) => setWeather(e.target.value)} />
                    cloudy
                </label>
                <label>
                    <input type='radio' name='myRadio2' value='rainy' checked={weather === 'rainy'} onChange={(e) => setWeather(e.target.value)} />
                    rainy
                </label>
                <label>
                    <input type='radio' name='myRadio2' value='windy' checked={weather === 'windy'} onChange={(e) => setWeather(e.target.value)} />
                    windy
                </label>
                <label>
                    <input type='radio' name='myRadio2' value='stormy' checked={weather === 'stormy'} onChange={(e) => setWeather(e.target.value)} />
                    stormy
                </label>
            </p>
            <p>
                <label>
                    comment <input name='myInput' value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
            </p>
            <button type="submit">add</button>
        </form>
    );
};
export default DiaryForm;
