/*
  Написать класс Dog, который наследуется от класcа Animal. Класс Animal
  имеет метод getName (name можно передать в конструктор). Класс Dog             
  имеет метод bark (возвращает строку «Dog {dogname} is barking».
    Пример использования:
            var dog = new Dog (’Aban’);
            dog.getName () === ’Aban’; // true
            dog.bark () === ’Dog Aban is barking’; // true
*/

// ES5 with functions
function Animal(name) {
  this.name = name;
  this.getName = function() {
  
  return this.name;
}
  
};
function Dog(name) {
  Animal.call(this, name);
  
  this.bark = function() {
    return 'Dog ' + this.name + ' is barking';
  }
}

// ES5 with prototypes
function Animal(name) {
  this.name = name;
}

Animal.prototype.getName = function() {
  return this.name;
}

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return 'Dog ' + this.name + ' is barking';
}

// ES6
class Animal {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name;
  }
}
class Dog extends Animal {
  bark() {
    return `Dog ${this.name} is barking`;
  }
}