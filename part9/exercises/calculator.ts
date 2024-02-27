type Operation = 'multiply' | 'add' | 'divide'

const calculator = (a: number, b: number, op: Operation): number | string => {
    switch (op) {
        case 'multiply':
            return a * b;
        case "divide":
            if (b === 0) throw new Error('Cant by 0');
            return a / b;
        case "add":
            return a + b;
        default:
            throw new Error('Invalid operation');
    }
}
try {
    console.log(calculator(1, 0, 'divide'));
} catch (error: unknown) {
    let errorMessage = 'Somethin wron: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}