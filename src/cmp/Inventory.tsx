import beer from "../game/sprites/beer.png";
import styled from "styled-components";

export const Inventory = () => (
  <p>
    <InventoryItem src={beer} alt="beer" />
  </p>
);

const InventoryItem = styled.img`
  image-rendering: crisp-edges;
  width: 40px;
  height: 40px;
  background-color: #c1a471;
  padding: 4px;
  border: 4px solid #c4b382;
`;
