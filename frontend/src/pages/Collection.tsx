import { useState } from "react";
import { Container, Pagination, Row, Text } from "@nextui-org/react";
import { MdVerified } from "react-icons/md";
import DisplayGrid from "../components/DisplayGrid";
import Nft from "../models/nft";
import images from "../resources/images.json";
import { imagesPerPage } from "../settings";

const nfts = images.map(img => new Nft(img))
    .sort((a, b) => b.price - a.price)

const Collection = () => {
    const [page, setPage] = useState(0);

    return (<>
        <Container>
            <Row justify="center" align="center">
                <Text h1>ScrapPunks</Text>
            </Row>
            <Row justify="center" align="center">
                <Text h5 color="$gray400">Created by <Text as="span" color="warning">The Farmer</Text></Text>
                <MdVerified color="var(--nextui-colors-warning)" style={{ marginInline: "0.5ch" }}/>
            </Row>
        </Container>
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
    </>)
}

export default Collection;
