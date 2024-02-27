const calculateBmi = (a:number, b:number):string => {
    if (a < 100 || a > 250) return('*\n*\n\n⪩⪨  u too shmol or too big for this world :(    ༊*·˚ *ੈ\n\n*\n*\n');
    if (b < 30 || b > 200) return('*\n*\n\n⪩⪨   u too shmol or too big for this world :[    ༊*·˚ *ੈ\n\n*\n*\n');
    const res = b / ((a / 100) * (a / 100));
    var cat: string = '';
    if (res < 16)
        cat = 'Underweight (Severe thinness)';
    else if  (res > 16 && res < 17)
        cat = 'Underweight (Moderate thinness)';
    else if (res >= 17 && res < 18.5)
        cat = 'Underweight (Mild thinness)';
    else if (res > 18.4 && res < 25)
        cat = 'Normal range';
    else if (res >= 25 && res < 30)
        cat = 'Overweight (Pre-obese)';
    else if (res >= 30 && res < 35)
        cat = 'Obese (Class I)';
    else if (res >= 35 && res < 40)
        cat = 'Obese (Class II)';
    else if (res >= 40)
        cat = 'Obese (Class III)';
    else return ('error');
return (`*\n*\n\n ༊*·˚ *ੈ    your category is ${cat}    ✩‧₊˚ ˚ ༘♡ ⋆｡˚\n\n*\n*\n`)
}
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
console.log(calculateBmi(a, b))

export default calculateBmi;