interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
    const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
    if (average < target / 2) {
        return {
            periodLength: dailyHours.length,
            trainingDays: dailyHours.filter(h => h > 0).length,
            success: false,
            rating: 1,
            ratingDescription: 'you suck at this',
            target: target,
            average: average
        };
    }
    if (average < target) {
        return {
            periodLength: dailyHours.length,
            trainingDays: dailyHours.filter(h => h > 0).length,
            success: false,
            rating: 2,
            ratingDescription: 'not too good but not too bad',
            target: target,
            average: average
        };
    }
    if (average === target) {
        return {
            periodLength: dailyHours.length,
            trainingDays: dailyHours.filter(h => h > 0).length,
            success: true,
            rating: 2,
            ratingDescription: 'good job right on target',
            target: target,
            average: average
        };
    }
    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(h => h > 0).length,
        success: true,
        rating: 3,
        ratingDescription: 'you are a beast',
        target: target,
        average: average
    };
};
const parseArgs = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const nums = args.slice(3).map(a => Number(a));
    if (nums.some(a => isNaN(a))) throw new Error('Provided values were not numbers!');
    return nums;
};
try {
    const args = parseArgs(process.argv);
    console.log(calculateExercises(args, Number(process.argv[2])));
} catch (error: unknown) {
    let errorMessage = 'Somethin wron: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
export default calculateExercises;