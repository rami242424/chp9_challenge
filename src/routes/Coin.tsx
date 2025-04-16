import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin : 0 auto;
`;

const Header = styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`;

const Title = styled.div`
    font-size: 48px;
    color : ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;
interface ICoinProps {
    coinId : string,
}

interface RouteState {
    name: string,
}

interface ITag {
    coin_counter : number;
    ico_counter : number;
    id : string;
    name : string;
}

interface IInfoData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    logo : string;
    tags : ITag[];
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}


interface IPriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    }
}





function Coin () {
    // 방법1
    // const params = useParams<ICoinProps>();
    // console.log(params);
    // return <h1>i am coin 💥💥{params.coinId}</h1>
    // 방법2
const [loading, setLoading] = useState(true);
    const { coinId } = useParams<ICoinProps>();
    // 방법1
    //const location = useLocation<RouteState>();
    //console.log(location);
    // 방법2
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();

    useEffect(() => {
        (async() => {
            // const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
            // const json = await response.json();

            const infoData = await (await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            //console.log(infoData, "infoData값");
            setInfo(infoData);

            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setPriceInfo(priceData);
            // console.log(priceData, "priceData값");
            
            setLoading(false);




        })(); // 즉시실행
    }, []);

    return (
        <Container>
            <Header>
                {/* <Title>{location.state.name}</Title> */}
                <Title>{ state?.name || "Loading..." }</Title>
            </Header>
            {loading ? <Loader>loading...</Loader> : null}
        </Container>
    );
}

export default Coin;