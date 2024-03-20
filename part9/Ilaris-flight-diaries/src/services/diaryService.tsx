import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data as DiaryEntry[];
};

const create = async (object: NewDiaryEntry) => {
    const newObject = {
        id: Math.floor(Math.random() * 999),
        date: object.date,
        visibility: object.visibility,
        weather: object.weather,
        comment: object.comment
    }
  const response = await axios.post(baseUrl, newObject);
  return response.data as DiaryEntry;
};

export default { getAll, create };