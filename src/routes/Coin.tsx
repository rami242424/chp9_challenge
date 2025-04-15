import { useState } from "react";
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

    return (
        <Container>
            <Header>
                {/* <Title>{location.state.name}</Title> */}
                <Title>{ state?.name || "Loading..." }</Title>
            </Header>
            {loading ? <Loader>...loading</Loader> : null}
        </Container>
    );
}

export default Coin;