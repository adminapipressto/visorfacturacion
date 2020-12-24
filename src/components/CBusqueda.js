import React, {useState, useEffect, useContext} from 'react'; 
import { useHistory } from  'react-router-dom';
import { CpeContext } from '../context/cpeContext';
import { useForm } from "react-hook-form";
import { getCPE, getTipoCPE, getTipoDOC } from '../services/service';
import Swal from 'sweetalert2';
import './css/main.css';

export const CBusqueda = () => {
    const { setDataCpe } = useContext(CpeContext);
    let { register, handleSubmit, errors} = useForm();
    const history = useHistory();

    const [tipoCPE, setTipoCPE] = useState([]); 
    const [tipoDOC, setTipoDOC] = useState([]); 

    const showTipoCPE = async() => {
        let data = await getTipoCPE(); 
        setTipoCPE(data);
    }

    const showTipoDOC = async() => {
        let data = await getTipoDOC(); 
        setTipoDOC(data);
    }

    useEffect(() => {
        showTipoCPE();
        showTipoDOC();
    }, [])

    let validateSelect = (value) => {
        if(value === "0"){
            return false;
        }else{
            return true;
        }
    }


    const manejarSubmit = async (data) => {    
 
        let datoscpe = await getCPE(data);

        if (datoscpe.status === false){
            // No Existe el CPE
            Swal.fire({
                icon: "error",
                title: `El comprobante ${data.serieCpe}-${data.numeroCpe} no ha sido informado`,
                showConfirmButton: false,
                timer: 3000
            }) 
        }else{
            console.log(datoscpe.content)
            setDataCpe(datoscpe.content)
            // return history.push('/result'); 
        }
        //Mostramos el alert
        // Swal.fire({
        //     icon: "success",
        //     title: "Registro correcto",
        //     showConfirmButton: false,
        //     timer: 1000
        // })

        // regresamos a la pagina principal
        // return history.push('/category');     
    }


    return (
        <div className="d-flex justify-content-center"> 
            <form onSubmit={handleSubmit(manejarSubmit)}>  
                    <div style={{width: '620px', marginTop: '1rem', marginBottom: '1rem'}}>
                        <div className="card mt-3">
                        <div className="card-body" style={{paddingTop:'10px', paddingBottom: '0px'}}>
                                <h2 className="card-title">
                                    Busqueda de Comprobante Electrónico
                                </h2> 

                                <div className="form-group">
                                    <label htmlFor="rucEmisor">RUC del Emisor:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="rucEmisor"
                                    name="rucEmisor"
                                    ref={register({required:true, minLength:11, maxLength:11})}
                                    />
                                    {errors.rucEmisor && errors.rucEmisor.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el Ruc del Emisor</small>
                                    )}
                                    {
                                        errors.rucEmisor && errors.rucEmisor.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El Ruc del Emisor debe ser de 11 digitos</small>
                                        )
                                    }
                                    {
                                        errors.rucEmisor && errors.rucEmisor.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El Ruc del Emisor debe ser de 11 digitos</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Tipo de Documento del Receptor:</label>
                                    <select name="tipoDocReceptor" className="form-control" 
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Tipo de Documento</option> 
                                        {
                                            tipoDOC.map((elm,i) => (
                                                <option key={i} value={elm.tipodocId}>{elm.tipodocCod}-{elm.tipodocDesc}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.tipoDocReceptor && errors.tipoDocReceptor.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar un Tipo de Documento del Receptor</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="rucReceptor">RUC del Receptor:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="rucReceptor"
                                    name="rucReceptor"
                                    ref={register({required:true, minLength:8, maxLength:11})}
                                    />
                                    {errors.rucReceptor && errors.rucReceptor.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el Ruc del Receptor</small>
                                    )}
                                    {
                                        errors.rucReceptor && errors.rucReceptor.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El Ruc del Emisor debe tener mínimo 8 digitos</small>
                                        )
                                    }
                                    {
                                        errors.rucReceptor && errors.rucReceptor.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El Ruc del Emisor debe tener máximo 11 digitos</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Tipo de Comprobante:</label>
                                    <select name="tipoCpe" className="form-control" 
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Tipo de Comprobante</option> 
                                        {
                                            tipoCPE.map((elm,i) => (
                                                <option key={i} value={elm.tipocpeId}>{elm.tipocpeCod}-{elm.tipocpeDesc}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.tipoCpe && errors.tipoCpe.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar un Tipo de Comprobante</small>
                                        )
                                    }
                                </div>
 
                                <div className="form-group">
                                    <label>Serie - Número:</label>
                                    <div className="input-group">
                                        <input
                                        type="text"
                                        className="form-control mr-2"
                                        id="serieCpe"
                                        name="serieCpe" 
                                        ref={register({required:true, minLength:4, maxLength:4})}
                                        />
 
                                        <input
                                        type="text"
                                        className="form-control mr-2"
                                        id="numeroCpe"
                                        name="numeroCpe" 
                                        ref={register({required:true, minLength:1, maxLength:8})}
                                        /> 

                                    </div>
                                    <div>
                                        {errors.serieCpe && errors.serieCpe.type === 'required' && (
                                        <small className="text-danger font-weight-bold">Debe ingresar la Serie del Comprobante</small>
                                        )}
                                        {
                                            errors.serieCpe && errors.serieCpe.type === "minLength" && (
                                                <small className="text-danger font-weight-bold">La serie del comprobante debe ser de 4 digitos</small>
                                            )
                                        }
                                        {
                                            errors.serieCpe && errors.serieCpe.type === "maxLength" && (
                                                <small className="text-danger font-weight-bold">La serie del comprobante debe ser de 4 digitos</small>
                                            )
                                        }

                                        {errors.numeroCpe && errors.numeroCpe.type === 'required' && (
                                        <small className="text-danger font-weight-bold">Debe ingresar el Número del Comprobante</small>
                                        )}
                                        {
                                            errors.numeroCpe && errors.numeroCpe.type === "minLength" && (
                                                <small className="text-danger font-weight-bold">La Número del comprobante debe tener mínimo 1 digito</small>
                                            )
                                        }
                                        {
                                            errors.numeroCpe && errors.numeroCpe.type === "maxLength" && (
                                                <small className="text-danger font-weight-bold">La Número del comprobante debe tener máximo 8 digitos</small>
                                            )
                                        }
                                    </div>
 
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fechaCpe">Fecha del Comprobante:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="fechaCpe"
                                    name="fechaCpe" 
                                    ref={register({required:true})}
                                    />
                                    {errors.fechaCpe && errors.fechaCpe.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar la Fecha del Comprobante</small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="importeCpe">Importe Total del Comprobante:</label>
                                    <div className="input-group">
                                        <span className="input-group-text">S/</span>
                                        <input
                                        type="number"
                                        className="form-control"
                                        id="importeCpe"
                                        name="importeCpe" 
                                        step="any"
                                        ref={register({required:true,min:1})}
                                        /> 
                                    </div>
                                    <div>
                                        {errors.importeCpe && errors.importeCpe.type === 'required' && (
                                        <small className="text-danger font-weight-bold">Debe ingresar el Importe Total del Comprobante</small>
                                        )}
                                        {errors.importeCpe && errors.importeCpe.type === 'min' && (
                                        <small className="text-danger font-weight-bold">El Importe Total del Comprobante no puede ser menor a 1</small>
                                        )} 
                                    </div>
                                </div>
 
                            </div>
                        </div> 
                </div>
 
                <button type="submit" className="btn btn-info btn-block">Consultar</button>

            </form>
        </div>
    )
}