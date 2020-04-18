export const JOKER = "JOKER";
type JOKER = "JOKER";

type Face =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13";

type TileFace = Face | JOKER;

type Color = "RED" | "BLACK" | "BLUE" | "ORANGE";

type TileColor = Color | JOKER;

export class Tile {
  private _face: TileFace;
  private _color: TileColor;

  constructor({ face, color }: { face: TileFace; color: TileColor }) {
    this._face = face;
    this._color = color;
  }

  get face(): TileFace {
    return this._face;
  }

  get color(): TileColor {
    return this._color;
  }
}

export const buildBag: () => Tile[] = () => {
  const bag = [
    new Tile({ color: JOKER, face: JOKER }),
    new Tile({ color: JOKER, face: JOKER })
  ];

  for (let color of colors) {
    for (let face of faces) {
      // Two of each tile.
      bag.push(new Tile({ color, face }));
      bag.push(new Tile({ color, face }));
    }
  }

  return bag;
};

export const colors: Color[] = ["RED", "BLACK", "BLUE", "ORANGE"];
export const faces: Face[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13"
];
