import request from '../utils/request';
//import {env} from '../config/index'

export const getMaterial=(query) => {
    console.log('get all material');
    return request({
        url: '/material_simple.json',
        method: 'get',
        params: query,
    })
}

export const modifyMaterial=(query) => {
    console.log('modify a material');
    return request({
        url: '/material.json',
        method: 'post',
        data: query,
    })
}

export const addMaterial=(query) => {
    console.log('add a material');
    return request({
        url: '/addMaterial.json',
        method: 'post',
        data: query,
    })
}

export const deleteMyMaterial=(query) => {
    console.log('delete a material');
    console.log(query);
    return request({
        url: '/deleteMaterial.json',
        method: 'post',
        data: query,
    })
}
