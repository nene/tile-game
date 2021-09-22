import beer from "../game/sprites/beer.png";
import styled from "styled-components";

export const Inventory = () => (
  <InventoryContainer>
    <InventorySlot active={true}>
      <InventoryItem />
    </InventorySlot>
    <InventorySlot />
    <InventorySlot />
    <InventorySlot />
    <InventorySlot />
  </InventoryContainer>
);

const InventoryContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InventorySlot = styled.span<{ active?: boolean }>`
  display: inline-block;
  border: 4px solid ${({ active }) => (active ? "#663931" : "#c4b382")};
  background-color: ${({ active }) => (active ? "#8f563b" : "#c1a471")};
  width: 64px;
  height: 64px;
  padding: 4px;
  margin-right: 4px;
`;

const InventoryItem = styled.span`
  display: block;
  image-rendering: crisp-edges;
  background-image: url(${beer});
  background-repeat: no-repeat;
  background-position-x: -64px;
  background-position-y: 0px;
  background-size: 128px 64px;
  width: 64px;
  height: 64px;
`;
