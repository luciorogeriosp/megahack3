import api from './api';
import { CartModel } from '../model/cart-model';
import { OrderModel } from '../model/order-model';

export function process_payment(cart: CartModel[]): OrderModel {
    let item = new OrderModel();

    item.id = "6299";
    item.items = cart;

    return item;
}