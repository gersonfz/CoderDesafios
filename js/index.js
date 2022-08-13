class Usuario {
    constructor(name, lastname){
        this.name = name;
        this.lastname = lastname;
        this.book = 
        [
            {
                title: 'Lord of the rings: The Fellowship of the Ring',
                author: 'J.R.R. Tolkien'
            },
            {
                title: 'Lord of the rings: The Return of the King',
                author: 'J.R.R. Tolkien'
            },
            {
                title: 'A Game Of Thrones',
                author: 'George R.R. Martin'
            }
        ];
        this.pets = ['Tommy', 'Chanel'];
    }
    getFullName(){
        return `Bienvenido ${this.name} ${this.lastname}`;
    }
    addPets(pets){
        this.pets.push(pets)
    }
    countPets(){
        return this.pets.length;
    }
    addBook(title, author){
        this.book.push({title, author})
    }
    getBookNames(){
        return this.book.map(el => el.title);
    }
}


const usuario = new Usuario('Gerson', 'Fernandez');
console.log(usuario.getFullName());

console.log(usuario.countPets());

usuario.addPets('Nala');

console.log(usuario.countPets());

console.log(usuario.getBookNames());

usuario.addBook('Lord of the rings: The Two Towers', 'J.R.R. Tolkien')

console.log(usuario.getBookNames());
