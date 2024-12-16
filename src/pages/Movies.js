import UserContext from '../context/UserContext';
import {useState, useEffect, useContext} from 'react';
import { Navigate, useNavigate , Link} from 'react-router-dom';

import {Container, Row, Col, Card, Button} from 'react-bootstrap';



export default function Movies(){
    const {user} = useContext(UserContext);
    const navigate = useNavigate(); 
    // console.log(user);
    const [movies, setMovies] = useState([]);

    const fetchData = () => {
        let fetchUrl = "https://movieapp-api-lms1.onrender.com/movies/getMovies";

        fetch(fetchUrl, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data.movies);
            setMovies(data.movies);

        });
    }

    useEffect(() => {
        fetchData();

    }, []);


    return (

        <>
            
            <div className="container mt-2 d-flex flex-column justify-content-center align-items-center">
            <h1>MOVIES</h1>
                
                <Row>
                    {movies.length > 0 ? 
                    
                    ( movies.map((movie, index) => (
                       
                        <Col key={index} sm={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <img src="https://img.freepik.com/free-vector/retro-cinema-background_52683-1701.jpg?t=st=1734358760~exp=1734362360~hmac=e6ca509bea1c4ec087aa52306fa8bc120e1e26ede23f279100bdf2ffc15dba40&w=826" className='img-fluid mb-3'></img>
                                    <Card.Title className='text-center'>{movie.title}</Card.Title>
                                    
                                    <Link className="btn btn-primary d-block" to = {`/getMovie/${movie._id}`}>View Details</Link>
                                    {/* <Button>edit</Button> */}
                                </Card.Body>
                                
                            </Card>
                            
                        </Col>
                    ))) 
                    : 
                    (
                    <p>No workouts found</p>
                    )}
                </Row>
            </div>
        </>
    )
}