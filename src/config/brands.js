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
        hasCustomText: true,
      },
      {
        id: 'access-interview-long',
        name: 'Access Interview (long)',
        image: '/pngs/int-long.png',
        hasCustomText: true,
        hasCustomSecondText: true,
        textTargetPositionTopRatio: 0.842,
      },
      {
        id: 'access-exclusive',
        name: 'Access Exclusive',
        image: '/pngs/E.png',
        fontSize: 150,
        text: 'EXCLUSIVE',
      },
      {
        id: 'access-daily',
        name: 'Access Daily',
        image: '/pngs/daily.png',
      },
      {
        id: 'access-award-season',
        name: 'Access Award Season',
        image: '/pngs/award.png',
      },
      {
        id: 'access-reality-nightcap',
        name: 'Access Reality Nightcap',
        image: '/pngs/night.png',
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