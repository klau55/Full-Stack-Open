export interface DiaryEntry {
    date: string;
    visibility: string;
    weather: string;
    comment: string;
    id: number;
  }
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;