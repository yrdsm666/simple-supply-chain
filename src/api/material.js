import request from '../utils/request';
//import {env} from '../config/index'

export const getMaterial=(query) => {
    console.log('get all material');
    return request({
        //url: '/register_fail.json',
        url: './material_simple.json',
        method: 'get',
        params: query,
    })
}

export const modifyMaterial=(query) => {
    console.log('modify a material');
    return request({
        //url: '/register_fail.json',
        url: './material.json',
        method: 'post',
        data: query,
    })
}

export const addMaterial=(query) => {
    console.log('add a material');
    return request({
        //url: '/register_fail.json',
        url: './addMaterial.json',
        method: 'post',
        data: query,
    })
}

export const deleteMyMaterial=(query) => {
    console.log('delete a material');
    console.log(query);
    return request({
        //url: '/register_fail.json',
        url: './deleteMaterial.json',
        method: 'delete',
        params: query,
    })
}
