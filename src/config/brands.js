const brands = [
  {
    id: 'access-hollywood',
    name: 'Access Hollywood',
    segments: [
      {
        id: 'access-standard',
        name: 'Access Standard',
        image: '/pngs/standard.png',
      },
      {
        id: 'access-royals',
        name: 'Access Royals',
        image: '/pngs/royals.png',
      },
      {
        id: 'access-interview-short',
        name: 'Access Interview (short)',
        image: '/pngs/int-short.png',
        fontSize: 180,
        textTargetPositionTopRatio: 0.865,
        hasCustomText: true,
        textXPosition: 307,
        letterSpacing: 0.0,
      },
      {
        id: 'access-interview-long',
        name: 'Access Interview (long)',
        image: '/pngs/int-long.png',
        hasCustomText: true,
        fontSize: 120,
        hasCustomSecondText: true,
        textTargetPositionTopRatio: 0.838,
        textXPosition: 369,
        letterSpacing: 0.0,
      },
      {
        id: 'access-exclusive',
        name: 'Access Exclusive',
        image: '/pngs/E.png',
        fontSize: 210,
        textTargetPositionTopRatio: 0.858,
        hasCustomText: true,
        text: 'EXCLUSIVE',
        textXPosition: 300,
        letterSpacing: 0.0,
      },
      {
        id: 'access-daily',
        name: 'Access Daily',
        image: '/pngs/daily.png',
      },
      {
        id: 'access-award-season',
        name: 'Access Award Season',
        image: '/pngs/awards-new.png',
      },
      {
        id: 'access-reality-nightcap',
        name: 'Access Reality Nightcap',
        image: '/pngs/H.png',
      },
      {
        id: 'access-housewives-nightcap',
        name: 'Access Housewives Nightcap',
        image: '/pngs/housewives.png',
      },
    ],
  },
];

export default brands;