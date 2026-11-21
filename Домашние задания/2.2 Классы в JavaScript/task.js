class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(value) {
    this._state = Math.min(100, Math.max(0, value));
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find(book => book[type] === value) || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(book => book.name === bookName);
    if (index === -1) {
      return null;
    }
    return this.books.splice(index, 1)[0];
  }
}

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (!Number.isFinite(mark) || mark < 2 || mark > 5) {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(this.marks, subject)) {
      Object.defineProperty(this.marks, subject, {
        value: [],
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!Object.prototype.hasOwnProperty.call(this.marks, subject)) {
      return 0;
    }
    const marks = this.marks[subject];
    if (marks.length === 0) {
      return 0;
    }
    return marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    if (subjects.length === 0) {
      return 0;
    }
    const sum = subjects.reduce((total, subject) => {
      return total + this.getAverageBySubject(subject);
    }, 0);
    return sum / subjects.length;
  }
}

{
  const library = new Library("Районная библиотека");
  library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
  library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
  library.addBook(new DetectiveBook("Артур Конан Дойл", "Собака Баскервилей", 1902, 256));
  library.addBook(new Magazine("Мурзилка", 1924, 60));

  let bookFrom1919 = library.findBookBy("releaseDate", 1919);
  if (bookFrom1919 === null) {
    bookFrom1919 = new NovelBook("Герман Гессе", "Демиан", 1919, 200);
    library.addBook(bookFrom1919);
  }
  console.log("Книга 1919 года:", library.findBookBy("releaseDate", 1919));

  const borrowedBook = library.giveBookByName("Пикник на обочине");
  console.log("Выдана книга:", borrowedBook.name);
  borrowedBook.state = 25;
  console.log("Состояние после повреждения:", borrowedBook.state);
  borrowedBook.fix();
  console.log("Состояние после восстановления:", borrowedBook.state);
  library.addBook(borrowedBook);
  console.log("Книга возвращена:", library.books.includes(borrowedBook));
}

{
  const student = new Student("Олег Никифоров");
  console.log("Средний балл без оценок:", student.getAverage());
  student.addMark(5, "химия");
  student.addMark(5, "химия");
  student.addMark(5, "физика");
  student.addMark(4, "физика");
  student.addMark(6, "физика");
  student.addMark("5", "физика");
  console.log("Оценки по физике:", student.marks["физика"]);
  console.log("Средний балл по физике:", student.getAverageBySubject("физика"));
  console.log("Средний балл по биологии:", student.getAverageBySubject("биология"));
  console.log("Общий средний балл:", student.getAverage());
}
