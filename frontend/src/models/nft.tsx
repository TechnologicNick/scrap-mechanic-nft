export default class Nft {

    static maxId = 0;

    combination: number[];

    id: number;

    constructor(combination: number[]) {
        this.combination = combination;
        this.id = ++Nft.maxId;
    }

}
