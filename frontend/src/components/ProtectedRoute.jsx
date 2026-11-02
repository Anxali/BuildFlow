import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        async function checkAuth(){

            try{
                const response = await fetch(
                    "http://localhost:3000/api/auth/current",
                    {
                        credentials: "include"
                    }
                );

                if(response.ok){
                    setIsAuthenticated(true);
                }else{
                    setIsAuthenticated(false);
                }

            }catch(error){
                console.log("Error checking authentication:", error);
                setIsAuthenticated(false);
            }finally{
                setLoading(false);
            }

        }
        checkAuth();
    },[]);

    if(loading){
        return <div>Checking login status...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRoute;