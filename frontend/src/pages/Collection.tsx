import { useState } from "react";
import { Container, Pagination, Row } from "@nextui-org/react";
import DisplayGrid from "../components/DisplayGrid";
import Nft from "../models/nft";
import images from "../resources/images.json";
import { imagesPerPage } from "../settings";

const nfts = images.map(img => new Nft(img))
    .sort((a, b) => b.price - a.price)

const Collection = () => {
    const [page, setPage] = useState(0);

    return (
        <Container fluid>
            <DisplayGrid nfts={nfts.slice(page * imagesPerPage, (page + 1) * imagesPerPage)} />
            <Row justify="center" align="center">
                <Pagination
                    page={page + 1}
                    total={Math.ceil(nfts.length / imagesPerPage)}
                    onChange={page => setPage(page - 1)}
                />
            </Row>
        </Container>
    )
}

export default Collection;
