export class CartModel {
    constructor(      

    ) {
        this.id = 0;
        this.menu_id = 0;
        this.category_name = "";
        this.name = "";
        this.photo = "";
        this.price = 0;
        this.quantity = 0;
    }

    public id: number;
    public menu_id: number;
    public category_name: string;        
    public name: string;
    public photo: string;
    public price: number;
    public quantity: number;
}

