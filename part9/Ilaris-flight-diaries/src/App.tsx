import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import axios, {AxiosError} from 'axios';
import DiaryForm from './components/DiaryForm';
import diaryService from './services/diaryService';
import Diaries from './components/Diaries';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data as DiaryEntry[]);
    });
  }, []);

  const setNotification = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }

  const addDiary = (diary: NewDiaryEntry) => {
    diaryService.create(diary).then(returnedDiary => {
      setDiaries(diaries.concat(returnedDiary));
    }
    ).catch((error: AxiosError) => {
      if (error.response) {
        setNotification(String(error.response.data));
      } else {
        setNotification(error.message);
      }
    });
  }

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
      <DiaryForm addDiary={addDiary}/>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;