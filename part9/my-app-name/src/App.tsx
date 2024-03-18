const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBaseDes extends CoursePartBase{
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartBaseDes {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBaseDes {
    backgroundMaterial: string;
    kind: "background"
  }
  interface CoursePartSpecial extends CoursePartBaseDes {
    requirements: string[];
    kind: "special"
  }

  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const Header = (props: { name: string }) => {
    return <h1>{props.name}</h1>;
  };

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }
  const Part = (props: { part: CoursePart }) => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div>
            <p style={{ fontWeight: 'bold' }}>{props.part.name} {props.part.exerciseCount}</p>
            <p>{props.part.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <p>{props.part.name} {props.part.exerciseCount}</p>
            <p>project exercises {props.part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p>{props.part.name} {props.part.exerciseCount}</p>
            <p>{props.part.description}</p>
            <p>required background material: {props.part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>{props.part.name} {props.part.exerciseCount}</p>
            <p>{props.part.description}</p>
            <p>required skills: {props.part.requirements.join(', ')}</p>
          </div>
        );
      default:
        return assertNever(props.part);
    }
  }

  const Content = (props: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {props.courseParts.map((part, index) => {
          return <Part key={index} part={part} />;
        })}
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