class AgeError extends Error {
    constructor(message) {
        super(message);
        this.name = "AgeError";
    }
}

class ZooError extends Error {
    constructor(message) {
        super(message);
        this.name = "ZooError";
    }
}

class Animal {
    constructor(name, age) {
        if (!name) {
            throw new Error('Имя не может быть пустым');
        }
        if (age < 0) {
            throw new AgeError('Возраст не может быть отрицательным');
        }
        this.name = name;
        this.age = age;
    }

    info() {
        return `${this.name}, ${this.age} years`;
    }

    voice() {
        return '...';
    }

    speak() {
        return `${this.name}: ${this.voice()}`;
    }
}

class Cat extends Animal {
    voice() {
        return 'Мяу';
    }
}

class Dog extends Animal {
    constructor(name, age, breed) {
        super(name, age);
        this.breed = breed;
    }

    info() {
        return `${super.info()}, breed - ${this.breed}`;
    }

    voice() {
        return 'Гав';
    }
}

class Parrot extends Animal {
    constructor(name, age, word) {
        super(name, age);
        this.word = word;
    }

    info() {
        return `${super.info()}, word - ${this.word}`;
    }

    voice() {
        return 'Привет! Привет!';
    }
}

class Zoo {
    #animals = [];

    add(animal) {
        if (!(animal instanceof Animal)) {
            throw new ZooError('Это не животное');
        }
        if (this.#animals.some(a => a.name === animal.name)) {
            throw new ZooError(`${animal.name} уже есть`);
        }
        this.#animals.push(animal);
    }

    showAll() {
        for (const a of this.#animals) {
            console.log(a.info());
        }
    }

    get size() {
        return this.#animals.length;
    }

    oldest() {
        if (this.#animals.length === 0) {
            return null;
        }

        let oldest = this.#animals[0];
        for (const animal of this.#animals) {
            if (animal.age > oldest.age) {
                oldest = animal;
            }
        }
        return oldest;
    }
}

const cat = new Cat('Барсик', 4, 'Шотландец')
const rex = new Dog('Рекс', 6, 'Овчарка');
const parrot = new Parrot('Кеша', 2, 'Привет');
const list = [cat, rex, parrot];

for (const a of list) {
    console.log(a.speak());
}

try {
    new Dog('', 3, 'Хаски');
} catch (e) {
    console.log(e.message);
} finally {
    console.log('Проверка завершена');
}

const zoo = new Zoo();
const tests = [cat, rex, cat, { name: 'Fake' }];

for (const item of tests) {
    try {
        zoo.add(item);
        console.log(`${item.name} в зоопарке`);
    } catch (e) {
        console.log(`${e.name}: ${e.message}`);
    }
}

console.log(`Животных: ${zoo.size} | старший: ${zoo.oldest().name}`);
console.log(zoo.oldest() instanceof Animal);