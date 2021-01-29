import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';


const apis = require('../apis/apis')

export const DataTable = (props) => {

    const [result, setResult] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await apis.postApiCall('/game/gameResult', {
                    individual: props.individual,
                })
                setResult(data);
            } catch (err) {
                // console.log(err)
                if (err === 'Unauthorized' || err === 'Forbidden') {
                    localStorage.removeItem('user');
                    // console.log(err)
                }
                props.setIsLogin(false);
            }
        }
        fetchData();
    }, [props])

    return (
        <div className="col-10">
            {(props.individual === true)?<>
            <div className="col-12 text-left">
                <h5 className="display-5">Personal High Score : {(result.length === 0 )? <>NA</>:<>{result[0].points}</>}</h5>
            </div>
            </>:<></>}
            <Table striped bordered hover className="col-12">
                <thead>
                <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {result.map(data => {
                    return (
                        <tr key={data.index}>
                            <td>{data.position}</td>
                            <td>{data.name}</td>
                            <td>{data.points}</td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
        </div>
    );
};

