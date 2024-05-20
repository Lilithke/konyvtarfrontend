import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookForm from "./BookForm";



function App() {
const [books, setBooks] = useState([]);
const url = "http://localhost:8000/api/books";


const readAllBooks = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setBooks(data.data);
}

useEffect(() => {
  readAllBooks();
}, []);

  return (<>
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#newbook">Új könyv felvétele</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://petrik.hu/">Petrik honlap</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <h1>Petrik Könyvtár Nyilvántartó</h1>
        </div>
      </div>
    </header>
    <main className="container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      {books.map(book => <BookCard key={book.id} book={book}/>)}
    </div>
    <div className="mt-3" id="newbook">
     <BookForm onSuccess ={readAllBooks}/>
    </div>
    </main>
    <footer className="container">
      <p> Készítete: Szűcsné Bocsi Éva Julianna</p>
    </footer>

  </>);
}

export default App;