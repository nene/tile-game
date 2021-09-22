import beer from "../game/sprites/beer.png";
import bottle from "../game/sprites/bottle.png";
import styled from "styled-components";
import { Coord } from "../game/Coord";

interface ItemSpriteSheet {
  src: string;
  size: Coord;
}

const beerSprites: ItemSpriteSheet = {
  src: beer,
  size: [1, 2],
};

const bottleSprites: ItemSpriteSheet = {
  src: bottle,
  size: [3, 2],
};

export const Inventory = () => (
  <InventoryContainer>
    <InventorySlot active={true}>
      <InventoryItem sprites={beerSprites} coord={[1, 0]} />
    </InventorySlot>
    <InventorySlot>
      <InventoryItem sprites={bottleSprites} coord={[1, 0]} />
    </InventorySlot>
    <InventorySlot>
      <InventoryItem sprites={bottleSprites} coord={[1, 1]} />
    </InventorySlot>
    <InventorySlot>
      <InventoryItem sprites={bottleSprites} coord={[1, 2]} />
    </InventorySlot>
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

const InventoryItem = styled.span<{ sprites: ItemSpriteSheet; coord: Coord }>`
  display: block;
  image-rendering: crisp-edges;
  background-image: url(${({ sprites }) => sprites.src});
  background-repeat: no-repeat;
  background-position-x: ${({ coord }) => -coord[0] * 16 * 4}px;
  background-position-y: ${({ coord }) => -coord[1] * 16 * 4}px;
  background-size: ${({ sprites }) =>
    sprites.size
      .map((x) => x * 16 * 4 + "px")
      .reverse()
      .join(" ")};
  width: 64px;
  height: 64px;
`;
