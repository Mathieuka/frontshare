/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */



// /* ---------- *** Functional Object *** ---------- */

// type CarFunction = (spec: { color: string }) => CarInstance;

// const car: CarFunction = (spec: { color: string }): CarInstance => {
//   const carInstance: CarInstance = {};
//   carInstance.getColor = function (): string {
//     return spec.color;
//   };
//   return carInstance;
// };

// interface CarInstance {
//   getColor?: () => string;
// }

// const blueCar: CarInstance = car({ color: "blue" });
// /* we can't modify the prototype car */
// // blueCar.getColor = "tpm" // Typescript throw an Error

// console.log("Car instance => ", blueCar.getColor && blueCar.getColor());





// /* ---------- *** Shadowing *** ---------- */

// interface OtherCar {
//   getColor?: () => string;
//   color?: string;
//   __proto__: { getColor: () => string };
// }

// // We take easily advantage of the concept of shadowing
// const otherCar: OtherCar = Object.create(blueCar);

// otherCar.getColor = function (): string {
//   if (this.color) {
//     return this.color;
//   }
//   return this.__proto__.getColor(); // fallback in prototype
// };

// // otherCar.color = "white";

// console.log("blueCar instance => ", otherCar.getColor());





// /* ---------- *** Partial & Curing *** ---------- */

// *** Partial *** 

// const planes = ["plane1", "plane2", "plane3", "plane4"];
// const removeElementNth = (elements: string[] | undefined[]) => (nth: number) => {
//   if (nth > 0 && nth < elements.length) {
//     elements[nth] = undefined;
//     return `Element ${nth} removed`;
//   }
//   return "oops";
// };

// const removeAPlane = removeElementNth(planes);

// console.log(removeAPlane(3)); // "Element 3 removed"
// console.log(planes); // [ 'plane1', 'plane2', 'plane3', undefined ]





// *** Curring ***

// const verifyURLProtocol = (url: string): boolean => /https:/.test(url);

// const URLRoot = "https://";

// const buildURL = (APIRoot: string) => (firstURLPart: string) => {
//   const firstPart = APIRoot + firstURLPart;
//   return (secondURLPart: string) => {
//     const secondPart = firstPart + secondURLPart;
//     return (verifyFn: (url: string) => boolean) => {
//       const isHttps: boolean = verifyFn(secondPart);
//       return (token: string) => {
//         if (isHttps) {
//           return secondPart + token;
//         }
//         throw Error("Error :: ssl...");
//       };
//     };
//   };
// };

// // Sequentially
// const inFirst = buildURL(URLRoot)("first-part-");

// const inSecond = inFirst("second-part-")(verifyURLProtocol);

// const inLast = inSecond("123456");

// console.log(inLast);
