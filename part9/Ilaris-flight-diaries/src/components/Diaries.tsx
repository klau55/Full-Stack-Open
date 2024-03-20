import { DiaryEntry } from '../types';

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
    return (
        <div>
        {diaries.map((diary, i) => (
          <div key={i}>
            {diary.date}<br />
            visibility: {diary.visibility}<br />
            weather: {diary.weather} <br />
            {diary.comment && (
              <>
                comment: {diary.comment} <br />
                <br />
              </>
            )}
            <br />
          </div>
        ))}
      </div>
    )
}
export default Diaries;