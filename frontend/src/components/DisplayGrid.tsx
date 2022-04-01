import { Grid } from "@nextui-org/react";
import Nft from "../models/nft";
import Display from "./Display";

const DisplayGrid = ({ nfts }: { nfts: Nft[] }) => {
    return (
        <Grid.Container gap={2}>
            {nfts.map(nft => (
                <Grid key={nft.combination.join()} xs={6} sm={4} md={3} xl={2}>
                    <Display nft={nft} />
                </Grid>
            ))}
        </Grid.Container>
    )
}

export default DisplayGrid