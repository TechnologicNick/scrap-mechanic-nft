import { useState } from "react";
import { Container, Pagination, Row, Text, Button, Col, Spacer } from "@nextui-org/react";
import { MdVerified } from "react-icons/md";
import DisplayGrid from "../components/DisplayGrid";
import Nft from "../models/nft";
import images from "../resources/images.json";
import { imagesPerPage } from "../settings";
import { FaEthereum } from "react-icons/fa";

const nfts = images.map(img => new Nft(img))
    .sort((a, b) => b.price - a.price)

const priceSum = nfts.map(nft => nft.price).reduce((a, b) => a + b);

const Stat = ({ title, subtitle }: { title: any, subtitle: any }) => {
    return (
        <Button css={{ height: "auto" }}>
            <Col>
                <Row justify="center" align="center">
                    <Text size={20} b>{title}</Text>
                </Row>
                <Row justify="center" css={{ height: 32 }}>
                    <Text size={14}>{subtitle}</Text>
                </Row>            
            </Col>
        </Button>
    )
}

const Collection = () => {
    const [page, setPage] = useState(0);

    return (<>
        <Container>
            <Row justify="center" align="center">
                <Text h1>ScrapPunks <MdVerified size={36} color="var(--nextui-colors-warning)" /></Text>
            </Row>
            <Row justify="center" align="center">
                <Text h5 color="$gray400">Created by <Text as="span" color="warning">The Trader <MdVerified /></Text></Text>
            </Row>
            <Spacer y={1} />
            <Row justify="center" align="center">
                <Button.Group color="warning" ghost>
                    <Stat title={nfts.length} subtitle="items" />
                    <Stat title={Math.round(nfts.length / 1.8 + Math.random() * 10)} subtitle="owners" />
                    <Stat title={(
                        <Row justify="center" align="center">
                            <FaEthereum />
                            {nfts[nfts.length - 1].price.toFixed(3)}
                        </Row>
                    )} subtitle="floor price" />
                    <Stat title={(
                        <Row justify="center" align="center">
                            <FaEthereum />
                            {((priceSum * (11.22 + Math.random())) / 1000).toFixed(1) + "K"}
                        </Row>
                    )} subtitle="volume traded" />
                </Button.Group>
            </Row>
            <Spacer y={1} />
            <Container xs css={{ textAlign: "center" }}>
                <Text>
                    Ever wondered what happened to all those caged farmers you sold for seeds? Turns out the
                    Trader has between collecting them in his barn. After almost two years of collecting, the
                    Trader is has turned them into NFTs!
                </Text>
            </Container>
            <Spacer y={3} />
        </Container>
        <Container fluid>
            <DisplayGrid nfts={nfts.slice(page * imagesPerPage, (page + 1) * imagesPerPage)} />
            <Spacer y={1} />
            <Row justify="center" align="center">
                <Pagination
                    color="warning"
                    page={page + 1}
                    total={Math.ceil(nfts.length / imagesPerPage)}
                    onChange={page => setPage(page - 1)}
                />
            </Row>
            <Spacer y={5} />
        </Container>
    </>)
}

export default Collection;
