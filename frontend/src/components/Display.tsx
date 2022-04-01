import { Card, Col, Text } from "@nextui-org/react";
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
                />
            </Card.Body>
            <Card.Footer
                css={{
                    position: "relative",
                    bgColor: "#ffbe67",
                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    zIndex: 1,
                }}
            >
                {nft.combination.join()}
            </Card.Footer>
        </Card>
    )
}

export default Display;
