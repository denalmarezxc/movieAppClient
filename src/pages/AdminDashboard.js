import {Table, Button, Modal ,Form} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import {Notyf} from 'notyf';

import UserContext from '../context/UserContext';

import { useState, useContext, useEffect } from 'react';

export default function AdminDashboard(){
    const {user} = useContext(UserContext);
    const [movies, setMovies] = useState([]);
    const notyf = new Notyf();

    const [showModal, setShowModal] = useState(false); 
    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        description: '',
        year: '',
        genre: '',
    });



    // console.log(user)
    const fetchData = () => {
        fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies',{
            headers:{
                "Content-Type" : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
        .then(data => {
            // console.log(data.movies)
            setMovies(data.movies)
    
        })
    }

    useEffect(() => {
        fetchData();

    }, []);

     // Handle modal open/close
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewMovie({
      title: '',
      director: '',
      description: '',
      year: '',
      genre: '',
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Submit new movie to API
  const handleAddMovie = () => {
    fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newMovie),
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (data) {
          // Refresh movies list and close modal
          notyf.success('Movie successfully added');
          fetchData();
          handleCloseModal();
        } else {
          notyf.error('Failed to add movie');
        }
      })
      .catch(err => console.error('Error adding movie:', err));
  };

    

    return(
        (user.isAdmin)?
        <>
            <div className='my-3 d-flex flex-column justify-content-center align-items-center'>
                <h1>ADMIN DASHBOARD</h1>
                <Button variant="primary" onClick={handleShowModal}>Add Movie</Button>
            </div>
            
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Description</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th rowSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* input here the mapped data */}
                    {movies.map((movie,index) =>(
                        // console.log(movie)
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.description}</td>
                            <td>{movie.year}</td>
                            <td>{movie.genre}</td>
                            <td className='d-flex gap-2'><Button variant="dark">edit</Button>
                            <Button variant="danger">delete</Button></td>
                        </tr>
                    ))}
                    
                </tbody>
             </Table>{/* Add Movie Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formMovieTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter movie title"
                  name="title"
                  value={newMovie.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMovieDirector">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter director's name"
                  name="director"
                  value={newMovie.director}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMovieDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter movie description"
                  name="description"
                  value={newMovie.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMovieYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter release year"
                  name="year"
                  value={newMovie.year}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMovieGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter genre"
                  name="genre"
                  value={newMovie.genre}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddMovie}>
              Add Movie
            </Button>
          </Modal.Footer>
        </Modal>
      </>
        :
        <Navigate to="/"/>
        

    )
}