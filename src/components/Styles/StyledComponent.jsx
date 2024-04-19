import { Skeleton,keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from 'react-router-dom';
import { CustomeGray, LightBlue } from "../../constants/Color";

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1
});
{/*
  Hi
*/}
export const StyledLink = styled(LinkComponent)`
    text-decoration: none;
    padding: 1rem;
    border-radius:0.3rem;
    padding-left: 5rem;
    
    color: black;
    &:hover {
        background-color: rgba(0,0,0,0.1);
        
    }
`;

export const InputBox=styled("input")`
width:100%;
height: 100%;
border: none;
outline : none;
padding: 0 3rem;
background-color: ${LightBlue}

`

export const SearchField= styled("input")
`
padding:1rem 2rem;
width: 20vmax;
border: none;
outline:  none;
border-radius: 1.5rem;
background-color : #f1f1f1;
font-size:1.1rem;
`
export const CurveButton = styled("button")`
    padding: 1rem 1rem;

    border: none;
    outline: none;
    cursor: pointer;
    background-color: black;
    color: white;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
    }
    border-radius: 1.5rem;
 
    font-size: 1.1rem;
`;
 export const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
    animation: `${bounceAnimation} 1s infinite`,
  }));

