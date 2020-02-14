// source https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B8_%D0%A1%D0%BE%D0%BB%D0%BD%D1%86%D0%B0
// G2 - Sol
/** spectral classes of the start */
export const enum starClass {
  F0 = 'F0',
  F2 = 'F2',
  F5 = 'F5',
  F8 = 'F8',
  G0 = 'G0',
  G2 = 'G2',
  G5 = 'G5',
  G8 = 'G8',
  K0 = 'K0',
  K1 = 'K1',
  K2 = 'K2',
  K3 = 'K3',
  K4 = 'K4',
  K5 = 'K5',
  K7 = 'K7',
}

/** list of star radiuses */
export const enum starRadius {
  F0 = 1.64,
  F2 = 1.46,
  F5 = 1.44,
  F8 = 1.26,
  G0 = 1.13,
  G2 = 1.02,
  G5 = 0.893,
  G8 = 0.875,
  K0 = 0.786,
  K1 = 0.788,
  K2 = 0.75,
  K3 = 0.762,
  K4 = 0.692,
  K5 = 0.684,
  K7 = 0.641,
}

/** list of habitable zones */
export const enum starHabitableZone {
  F0 = 2.55,
  F2 = 2.07,
  F5 = 1.79,
  F8 = 1.45,
  G0 = 1.22,
  G2 = 1.05,
  G5 = 0.89,
  G8 = 0.81,
  K0 = 0.65,
  K1 = 0.61,
  K2 = 0.54,
  K3 = 0.51,
  K4 = 0.43,
  K5 = 0.39,
  K7 = 0.32,
}

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
