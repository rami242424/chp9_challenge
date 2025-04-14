import styled from "styled-components";

interface ICircleprops {
    bgColor: string;
    borderColor?: string;
    text?: string;
}
const Container = styled.div<ICircleprops>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%;
    border : 4px solid ${(props) => props.borderColor ?? "pink"}
`;

function Circle({bgColor, borderColor, text = "기본값이야"}:ICircleprops){
    return (
        <div>
            <Container bgColor={bgColor} borderColor={borderColor}>{text}</Container>
        </div>
    )
}

export default Circle;
