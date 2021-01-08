import {FetchGet} from '../BackConfig';

export const getTipoCPE = async () => {
    let content = await FetchGet(`tipocpe`);

    if (content.status === false){
        console.log('Ocurrió un error al obtener los datos del servidor')
    }else{
        return content.content;
    }
    
}

export const getTipoDOC = async () => {
    let content = await FetchGet(`tipodoc`);

    if (content.status === false){
        console.log('Ocurrió un error al obtener los datos del servidor')
    }else{
        return content.content;
    }
}

export const getCPE = async (data) => {
    console.log(data) 
    let content = await FetchGet(`consultarcpe/${data.rucEmisor}/${data.tipoDocReceptor}/${data.rucReceptor}/${data.tipoCpe}/${data.serieCpe}/${data.numeroCpe}/${data.fechaCpe}/${data.importeCpe}`);
    return content;
}
