const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header = (props: { name: string }) => {
    return <h1>{props.name}</h1>;
  };

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  };

  const Content = (props: { courseParts: CoursePartBase[] }) => {
    return (
      <div>
        {props.courseParts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    );
  };
  const Total = (props: {totalExercises: number }) => {
    return (
      <p>
        Number of exercises {props.totalExercises}
      </p>
    );
  };

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


  return (
    <div>
    <Header name={courseName} />
    <Content courseParts={courseParts}/>
    <Total totalExercises={totalExercises}/>
  </div>
  );
};

export default App;