import { useParams } from "react-router-dom";


interface ICoinProps {
    coinId : string,
}

function Coin () {
    // 방법1
    // const params = useParams<ICoinProps>();
    // console.log(params);
    // return <h1>i am coin 💥💥{params.coinId}</h1>
    // 방법2
    const { coinId } = useParams<ICoinProps>();
    return <h1>i am coin 💥💥{coinId}</h1>
}

export default Coin;