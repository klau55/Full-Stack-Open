const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p><b>total of {sum} excercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
    
      part={parts[0]}
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>
    


const Course = ({course, parts}) =>
{
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}
export default Course