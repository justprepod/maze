const sleep = ms => new Promise(r => setTimeout(r, ms));

function getRandomEvenNumber(a, b) {
    // Ensure the range is valid
    if (a > b) return null;

    // Adjust 'a' if it's odd to make it even
    if (a % 2 !== 0) a++;

    // Adjust 'b' if it's odd to make it even
    if (b % 2 !== 0) b--;

    // Generate a random even number in the range
    const evenCount = (b - a) / 2 + 1; // Total even numbers in range
    const randomIndex = Math.floor(Math.random() * evenCount);
    
    return a + randomIndex * 2;
}

function getRandomOddNumber(a, b) {
    // Ensure the range is valid
    if (a > b) return null;

    // Adjust 'a' if it's even to make it odd
    if (a % 2 === 0) a++;

    // Adjust 'b' if it's even to make it odd
    if (b % 2 === 0) b--;

    // Generate a random odd number in the range
    const oddCount = (b - a) / 2 + 1; // Total odd numbers in range
    const randomIndex = Math.floor(Math.random() * oddCount);
    
    return a + randomIndex * 2;
}

function getRandomEvenInRange(a, b) {
    // Function to generate a normally distributed random number
    function normalRandom(mean, stdDev) {
        let u1 = Math.random();
        let u2 = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z * stdDev + mean;
    }

    // Calculate mean and standard deviation for the range
    const mean = (a + b) / 2;
    const stdDev = (b - a) / 6; // Roughly 99.7% of values within a..b

    let randomNum;
    do {
        randomNum = Math.round(normalRandom(mean, stdDev));
    } while (randomNum < a || randomNum > b || randomNum % 2 !== 0);

    return randomNum;
}

function getRandomOddInRange(a, b) {
    // Function to generate a normally distributed random number
    function normalRandom(mean, stdDev) {
        let u1 = Math.random();
        let u2 = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z * stdDev + mean;
    }

    // Calculate mean and standard deviation for the range
    const mean = (a + b) / 2;
    const stdDev = (b - a) / 6; // Roughly 99.7% of values within a..b

    let randomNum;
    do {
        randomNum = Math.round(normalRandom(mean, stdDev));
    } while (randomNum < a || randomNum > b || randomNum % 2 !== 1);

    return randomNum;
}

function getRandomBool() {
    return Math.random() > 0.5;
}