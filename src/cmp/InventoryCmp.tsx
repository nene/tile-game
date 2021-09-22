import styled from "styled-components";
import { GameItem } from "../game/items/GameItem";
import { Sprite } from "../game/Sprite";

export const InventoryCmp = ({ items }: { items: GameItem[] }) => (
  <InventoryContainer>
    {items.map((item, i) => (
      <InventorySlot active={true} key={i}>
        <InventoryItem sprite={item.getSprite()} />
      </InventorySlot>
    ))}
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

const InventoryItem = styled.span<{ sprite: Sprite }>`
  display: block;
  image-rendering: crisp-edges;
  background-image: url(${({ sprite }) => sprite.image.src});
  background-repeat: no-repeat;
  background-position-x: ${({ sprite }) => -sprite.coord[0] * 4}px;
  background-position-y: ${({ sprite }) => -sprite.coord[1] * 4}px;
  background-size: ${({ sprite }) =>
    [sprite.sheetSize[0], sprite.sheetSize[1]]
      .map((x) => x * 4 + "px")
      .join(" ")};
  width: 64px;
  height: 64px;
`;
