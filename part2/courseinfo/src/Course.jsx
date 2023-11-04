const Header = ({ header }) => <h2>{header}</h2>

const Total = ({ sum }) => {
 const total = sum.reduce((sum,part) => sum + part.exercises, 0)
  return(
  <p><b>total of {total} excercises</b></p>
  )
}
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </>

    


const Course = ({ courses }) => (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
      <div key={course.id}>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts} />
      </div>
      ))}
    </>
)

export default Course