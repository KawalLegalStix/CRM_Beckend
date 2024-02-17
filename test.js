function show(){
    this.abc =  function(){
        console.log(this.name)
    }
}

const obj = {
    name: "Kawal"
}

show.call(obj)

obj.abc()

// // Define traits (mixins) as functions
// const canSwim = function () {
//     this.swim = function () {
//         console.log("Swimming!");
//     };

//     this.test = function() {
//         console.log("Testing Second Method")
//     }
// };

// const canFly = function () {
//     this.fly = function () {
//         console.log("Flying!");
//     };
// };

// // Create a class and use the traits
// class Duck {
//     constructor() {
//         // Mix in the traits
//         //Call method is used to mix the method with Duck Class
//         canSwim.call(this);
//         canFly.call(this);
//     }
// }

// // Create an instance of the class
// const duck = new Duck();

// // Use the traits
// duck.swim(); // Output: Swimming!
// duck.fly();  // Output: Flying!
// duck.test(); // Output: Testing Second Method