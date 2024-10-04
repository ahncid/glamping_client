// 1. Destrukturering
// Destrukturering er en syntaks i JavaScript, der gør det muligt at "pakke" værdier ud fra arrays eller objekter
// og tildele dem til individuelle variabler.
// Dette gør koden mere læselig og effektiv.

// Eksempel med objekt:
const person = { name: "John", age: 30 };
// Destrukturering af objektet 'person'
const { name, age } = person;
console.log(name); // Output: "John"
console.log(age); // Output: 30

// Eksempel med array:
const numbers = [1, 2, 3];
// Destrukturering af arrayet 'numbers'
const [first, second] = numbers;
console.log(first); // Output: 1
console.log(second); // Output: 2

// 2. Boolean
// En boolean er en datatype, der kun kan have to værdier: true eller false. Det bruges ofte til at kontrollere tilstande eller logik.
const isLoggedIn = true; // Boolean værdi
if (isLoggedIn) {
  console.log("User is logged in.");
} else {
  console.log("User is not logged in.");
}

// 3. Array
// Et array er en datastruktur, der kan indeholde flere værdier i en enkelt variabel.
// Værdierne inde i et array kan være af forskellige typer, såsom tal, strenge eller objekter.
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // Output: "apple"

// 4. Objekt
// Et objekt er en samling af egenskaber (key-value-par).
// Egenskaberne kan have forskellige datatyper som værdier, herunder tal, strenge, arrays, funktioner eller andre objekter.
const car = {
  make: "Tesla",
  model: "Model S",
  year: 2020,
};
console.log(car.make); // Output: "Tesla"

// 5. Ternary Operator
// En ternary operator er en kort form for en if-else-betingelse, der evaluerer en betingelse og returnerer en værdi baseret på,
// om betingelsen er true eller false.
const age = 18;
const canDrive = age >= 18 ? "Yes, can drive" : "No, cannot drive";
console.log(canDrive); // Output: "Yes, can drive"

// 6. Function
// En funktion er et blok af kode, der kan udføres, når den kaldes. Funktionen kan modtage parametre og returnere værdier.
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: "Hello, Alice!"

// 7. Arrow Function
// En arrow function er en kortere syntaks til at skrive funktioner i JavaScript. Det er en mere moderne måde at definere funktioner på.
const sum = (a, b) => a + b;
console.log(sum(5, 3)); // Output: 8
