import { Card, Text, Row, Button, Col } from "@nextui-org/react";
import Nft from "../models/nft";
import { imagePath } from "../settings";

const Display = ({ nft }: { nft: Nft }) => {
    return (
        <Card hoverable cover>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                
            </Card.Header>
            <Card.Body>
                <Card.Image
                    src={`${imagePath}/${nft.combination.join()}.jpg`}
                    height="100%"
                    width="100%"
                    alt="NFT"
                    containerCss={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    css={{
                        aspectRatio: 960 / 1070,
                    }}
                />
            </Card.Body>
            <Card.Footer
                blur
                css={{
                    position: "absolute",
                    bgBlur: "#ffffff",
                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                }}
                >
                <Row>
                    <Col>
                        <Text color="black" size={12}>
                            ScrapPunks
                        </Text>
                        <Text color="black" size={16} b>
                            {nft.id}
                        </Text>
                    </Col>
                    <Col>
                        <Row justify="flex-end">
                            <Button flat auto rounded color="secondary">
                                <Text
                                    css={{ color: "inherit" }}
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                >
                                    Buy
                                </Text>
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default Display;
