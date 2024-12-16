
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function Home(){
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    return (
    <>
        <div className="d-flex mt-5 flex-column justify-content-center align-items-center">

        
             
                <h1>Welcome to Zuitt Movies</h1> 
                <p> Grab your popcorn and let the magic begin!</p>

                {(user.id !== null)?
                    (user.isAdmin)?
                    <Navigate to='/adminDashboard'/>
                    :
                    <Button onClick={() => navigate('/movies')}> Go to Movies</Button>
                :
                <a href="/login">Login to get started</a>}

             
             
        </div>
    </>
    )
}