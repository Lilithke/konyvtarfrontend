import PropTypes from "prop-types";
import { useRef, useState } from "react";

function BookForm(props) {
    const {onSuccess} = props;
    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const publish_yearRef = useRef(null);
    const page_countRef = useRef(null);
    const url = "http://localhost:8000/api/books";
    const [error, setError] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        createBook();
        
    }
    const createBook = async() =>{
      const book = {
        title: titleRef.current.value,
        author: authorRef.current.value,
        publish_year: publish_yearRef.current.value,
        page_count: page_countRef.current.value,
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(book),
        headers: {"Content-Type":"application/json",
            "Accept":"application/json",
        }
      });
      if (response.ok) {
        clearForm();
        onSuccess();
      } else{
        const data = await response.json();
        setError(data.message);
      }

    }

    const clearForm = () =>{
        titleRef.current.value ="";
        authorRef.current.value ="";
        publish_yearRef.current.value ="";
        page_countRef.current.value ="";
        setError("");
    }

    return( <form onSubmit={handleSubmit}>
        <h2>Új könyv felvétele</h2>
        {error != ""? (<div class="alert alert-danger" role="alert">
            {error}
        </div>
        ) :("")}
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Cím</label>
        <input type="text" id="title" className="form-control" ref={titleRef}/>
        </div>
        <div className="mb-3">
        <label htmlFor="author" className="form-label">Szerző</label>
        <input type="text" id="author" className="form-control" ref={authorRef}/>
        </div>
        <div className="mb-3">
        <label htmlFor="publish_year" className="form-label">Kiadási év</label>
        <input type="number" id="publish_year" className="form-control" ref={publish_yearRef}/>
        </div>
        <div className="mb-3">
        <label htmlFor="page_count" className="form-label">Hossz(oldal)</label>
        <input type="number" id="page_count" className="form-control" ref={page_countRef}/>
        </div>
        <button className="btn btn-primary" type="submit">Új könyv</button>
       
    </form>);
}

BookForm.propTypes = {
    onSuccess: PropTypes.func.isRequired
}

export default BookForm;