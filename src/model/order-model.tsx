import { CartModel } from './cart-model';
import { MechantModel, MerchantModel } from './merchant-model';

export class OrderModel {
    constructor(      

    ) {
        this.items = [];
        this.id = "";
        this.merchant = new MerchantModel();
    }

    public items: CartModel[];
    public id: string;
    public merchant: MerchantModel;
}

