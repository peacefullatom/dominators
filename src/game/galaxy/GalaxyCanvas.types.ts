export type TGalaxyCanvasLayers = {
  background?: boolean;
  wormholes?: boolean;
  systems?: boolean;
  controls?: boolean;
  popups?: boolean;
};

export type TGalaxyCanvas = {
  interactive?: boolean;
  width: number;
  height: number;
  layers?: TGalaxyCanvasLayers;
  select: (view: string) => void;
};
