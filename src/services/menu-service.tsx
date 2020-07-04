import api from './api';
import { MenuModel } from '../model/menu-model';

export async function getMenu(merchantId: number): Promise<MenuModel[]> {
    return api.get('merchant/' + merchantId + '/menu')
        .then(response => {
            return response.data;
        })     
        .catch(error => {
            console.log(error.response)
        })        
}