import React, {useState} from 'react';
import {DataTable} from "./DataTable";

export const Standings = ({setIsLogin}) => {
    const [individual, setIndividual] = useState(true);
    const handleClick = (e)=>{
        // const value = e.target.value;
        if(e.target.value === 'myResult'){
            setIndividual(true)
        }else {
            setIndividual(false)
        }
    }
    return (
            <div className="row d-flex justify-content-center m-5">
                <div className="col-12">
                <button onClick={handleClick} value='myResult' className="btn btn-light col-md-4 col-6 m-2">My Results</button>
                <button onClick={handleClick} value='overall' className="btn btn-light col-md-4 col-6 m-2">Overall Standings</button>
                </div>
                {individual ? <DataTable individual={true}  setIsLogin={setIsLogin}/>: <DataTable individual={false} setIsLogin={setIsLogin}/>}
            </div>

    );
};

