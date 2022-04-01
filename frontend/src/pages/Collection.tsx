import { Container } from "@nextui-org/react";
import DisplayGrid from "../components/DisplayGrid";
import Nft from "../models/nft";
import images from "../resources/images.json";

const nfts = images.map(img => new Nft(img));

const Collection = () => {
    return (
        <Container fluid>
            <DisplayGrid nfts={nfts.slice(0, 100)}/>
        </Container>
    )
}

export default Collection;
