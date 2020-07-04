export class MerchantModel {
    constructor(      

    ) {
        this.id = 0;
        this.createdAt = "";
        this.name = "";
        this.photo = "";
        this.latitude = "";
        this.longitude = "";
        this.adress = "";
        this.city = "";
        this.zipcode = "";
        this.state = "";
        this.phone = "";
        this.news = "";
        this.logo = "";
        this.capacity = 0;
        this.evaluation = 0;
        this.rating_security = 0;
        this.rating_food = 0;
        this.rating_cleaning = 0;
        this.rating_price = 0;
    }

    public id: number;
    public createdAt: string;
    public name: string;
    public photo: string;
    public latitude: string;
    public longitude: string;
    public adress: string;
    public city: string;
    public zipcode: string;
    public state: string;
    public phone: string;
    public news: string;
    public logo: string;
    public capacity: number;
    public evaluation: number;
    public rating_security: number;
    public rating_food: number;
    public rating_cleaning: number;
    public rating_price: number;
}

