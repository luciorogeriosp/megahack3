import api from './api';
import { MerchantModel } from '../model/merchant-model';

export async function getMerchant(): Promise<MerchantModel[]> {
    return api.get('merchant')
        .then(response => {
            return response.data;
        })
}

export async function getMerchantById(id: number): Promise<MerchantModel> {
    return api.get('merchant/' + id)
        .then(response => {
            return response.data;
        })
}