import { TStar } from './Star.types';

// source https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B8_%D0%A1%D0%BE%D0%BB%D0%BD%D1%86%D0%B0
// G2 - Sol
// set for dark background
/** spectral classes of the start */
export const starClass: TStar[] = [
  {
    spectralClass: 'F0',
    color: `rgb(224,230,254)`,
    radius: 1.64,
    habitableZone: 2.55,
  },
  {
    spectralClass: 'F2',
    color: `rgb(233,236,254)`,
    radius: 1.46,
    habitableZone: 2.07,
  },
  {
    spectralClass: 'F5',
    color: `rgb(241,240,254)`,
    radius: 1.44,
    habitableZone: 1.79,
  },
  {
    spectralClass: 'F8',
    color: `rgb(248,243,250)`,
    radius: 1.26,
    habitableZone: 1.45,
  },
  {
    spectralClass: 'G0',
    color: `rgb(250,241,244)`,
    radius: 1.13,
    habitableZone: 1.22,
  },
  {
    spectralClass: 'G2',
    color: `rgb(251,240,240)`,
    radius: 1.02,
    habitableZone: 1.05,
  },
  {
    spectralClass: 'G5',
    color: `rgb(253,238,230)`,
    radius: 0.893,
    habitableZone: 0.89,
  },
  {
    spectralClass: 'G8',
    color: `rgb(255,234,220)`,
    radius: 0.875,
    habitableZone: 0.81,
  },
  {
    spectralClass: 'K0',
    color: `rgb(255,229,208)`,
    radius: 0.786,
    habitableZone: 0.65,
  },
  {
    spectralClass: 'K1',
    color: `rgb(255,227,204)`,
    radius: 0.788,
    habitableZone: 0.61,
  },
  {
    spectralClass: 'K2',
    color: `rgb(255,224,197)`,
    radius: 0.75,
    habitableZone: 0.54,
  },
  {
    spectralClass: 'K3',
    color: `rgb(255,223,190)`,
    radius: 0.762,
    habitableZone: 0.51,
  },
  {
    spectralClass: 'K4',
    color: `rgb(255,222,187)`,
    radius: 0.692,
    habitableZone: 0.43,
  },
  {
    spectralClass: 'K5',
    color: `rgb(255,218,183)`,
    radius: 0.684,
    habitableZone: 0.39,
  },
  {
    spectralClass: 'K7',
    color: `rgb(255,211,168)`,
    radius: 0.641,
    habitableZone: 0.32,
  },
];

/*
hz - habitable zone
class mass  radius  hz
F0	  1,600	1,640	  2,55
F2	  1,520	1,460	  2,07
F5	  1,400	1,440	  1,79
F8	  1,190	1,260	  1,45
G0	  1,050	1,130	  1,22
G2	  0,998	1,020	  1,05
G5	  0,920	0,893	  0,89
G8	  0,842	0,875	  0,81
K0	  0,790	0,786	  0,65
K1	  0,766	0,788	  0,61
K2	  0,742	0,750	  0,54
K3	  0,718	0,762	  0,51
K4	  0,694	0,692	  0,43
K5	  0,670	0,684	  0,39
K7	  0,606	0,641	  0,32
*/
