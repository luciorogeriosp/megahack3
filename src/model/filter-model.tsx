export class FilterModel {
    constructor(      
        id: number,
        name: string
    ) {
        this.name = name;
        this.id = id;
    }

    public id: number;
    public name: string;
}