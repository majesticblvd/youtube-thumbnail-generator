const brands = [
  {
    id: 'access-hollywood',
    name: 'Access Hollywood',
    minYPosition: 0.60,
    maxYPosition: 0.80,
    minXPosition: 260,
    maxXPosition: 400,
    segments: [
      {
        id: 'access-standard',
        name: 'Access Standard',
        image: '/pngs/standard-star.png',
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
        normalFontSize: 180,
        smallFontSize: 120,
        textTargetPositionTopRatio: 0.758,
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
        normalFontSize: 120,
        smallFontSize: 100,
        hasCustomSecondText: true,
        textTargetPositionTopRatio: 0.712,
        textXPosition: 369,
        letterSpacing: 0.0,
        negLineGap: 35, // this is the gap between the lines. increase to move the lines closer together
      },
      {
        id: 'access-exclusive',
        name: 'Access Exclusive',
        image: '/pngs/E.png',
        fontSize: 210,
        textTargetPositionTopRatio: 0.736,
        hasCustomText: false,
        text: 'EXCLUSIVE',
        textXPosition: 300,
        letterSpacing: 2.1,
        negLineGap: 35, // this is the gap between the lines. increase to move the lines closer together
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
      {
        id: 'access-behind-the-easel',
        name: 'Access Behind the Easel',
        image: '/pngs/behind_the_easel_full.png',
      },
      {
        id: 'access-espanol',
        name: 'Access Español',
        image: '/pngs/Espanol_Star.png',
      },
      {
        id: 'access-espanol-label',
        name: 'Access Español Label',
        image: '/pngs/Espanol_Star_Label.png',
      },
    ],
  },
  {
    id: 'Steve Wilkos',
    name: 'Steve Wilkos',
    minYPosition: -0.02,
    maxYPosition: 0.50,
    minXPosition: 0,
    maxXPosition: 110,
    segments: [
      {
        id: 'wayback-a',
        name: 'Wayback A',
        image: '/pngs/SW_Side_Element_A.png',
        hasCustomText: true,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/SW_Side_Element_Live.png'
      },
      {
        id: 'wayback-b',
        name: 'Wayback B',
        image: '/pngs/SW_Side_Element_D.png',
        hasCustomText: true,
        fontSize: 170,
        normalFontSize: 145,
        smallFontSize: 130,
        textTargetPositionTopRatio: 0.325,
        textXPosition: 85,
        canvasWidth: 870, // max width of the canvas before making the text wrap
        negLineGap: 65, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/SW_Side_Element_Live.png'
      },
      {
        id: 'new-a',
        name: 'New A',
        image: '/pngs/SW_Side_Element_B.png',
        hasCustomText: true,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/SW_Side_Element_Live.png'
      },
      {
        id: 'new-b',
        name: 'New B',
        image: '/pngs/SW_Side_Element_B1.png',
        hasCustomText: true,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/SW_Side_Element_Live.png'
      }

    ]
  }
];

export default brands;