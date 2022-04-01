export default class Nft {

    static maxId = 0;

    combination: number[];

    id: number;

    price: number;

    constructor(combination: number[]) {
        this.combination = combination;
        this.id = ++Nft.maxId;

        this.price = 0;
        for (let i = 0; i < 6; i++) {
            this.price += Math.random();
        }
        this.price /= 2;
    }

}
