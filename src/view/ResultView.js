import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import { CpeContext } from '../context/cpeContext';
import '../components/css/main.css';

export const ResultView = () => {
    const { cpe } = useContext(CpeContext);
    console.log("result", cpe)
    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '600px', marginTop: '5rem', marginBottom: '1rem'}}>

            <div className="card mt-3">
 
                <div className="card-body">

                    {
                        cpe.statusCdr === '0' 
                        ? 
                        (
                            <div>
                                <div className="mb-4">
                                    <h5 className="mensaje">{cpe.mensajeCdr}</h5> 
                                </div> 
                        
                                <a className="btn btn-info mr-2" href={cpe.XmlCpe}>Descargar XML</a>
                                <a className="btn btn-info mr-2" href={cpe.PdfCpe}>Descargar PDF</a>
                                <Link className="btn btn-info" to="/home">Volver a consultar</Link>
                            </div>
                        )
                        :
                        (
                            <div>
                                <div className="mb-4">
                                    <h5 className="rechazado mensaje">{cpe.mensajeCdr}</h5> 
                                </div> 
                        
                                <Link className="btn btn-info btn-block" to="/home">Volver a consultar</Link>
                            </div>
                        )
                    }

                </div>
            </div> 
        
            </div>
        </div>
    )
}
