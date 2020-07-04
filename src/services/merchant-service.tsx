import api from './api';
import { MerchantModel } from '../model/merchant-model';

export async function getMerchant(): Promise<MerchantModel[]> {
    return api.get('merchant')
        .then(response => {
            return response.data;
        })     
}