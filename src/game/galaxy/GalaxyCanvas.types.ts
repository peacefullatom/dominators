export type TGalaxyCanvasLayers = {
  background?: boolean;
  wormholes?: boolean;
  systems?: boolean;
  popups?: boolean;
};

export type TGalaxyCanvas = {
  width: number;
  height: number;
  layers?: TGalaxyCanvasLayers;
};
