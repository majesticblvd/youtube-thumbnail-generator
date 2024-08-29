const brands = [
  {
    id: 'access-hollywood',
    name: 'Access Hollywood',
    minYPosition: 0.60,
    maxYPosition: 0.90,
    minXPosition: 0,
    maxXPosition: 400,
    segments: [
      {
        id: 'access-standard',
        name: 'Access Standard',
        image: '/pngs/access/standard-star.png',
      },
      {
        id: 'access-standard-b',
        name: 'Access Standard B',
        image: '/pngs/access/standard-b.png',
      },
      {
        id: 'access-royals',
        name: 'Access Royals',
        image: '/pngs/access/royals.png',
      },
      {
        id: 'access-interview-short',
        name: 'Access Interview (short)',
        image: '/pngs/access/int-short.png',
        fontSize: 180,
        normalFontSize: 180,
        smallFontSize: 120,
        textTargetPositionTopRatio: 0.758,
        hasCustomText: true,
        extraWidth: 50,
        textXPosition: 295,
        letterSpacing: 0.0,
      },
      {
        id: 'access-interview-short-b',
        name: 'Access Interview (short) B',
        image: '/pngs/access/interview-short-b.png',
        dynamicBG: true,
        fontSize: 153,
        normalFontSize: 153,
        smallFontSize: 143,
        textTargetPositionTopRatio: 0.817,
        hasCustomText: true,
        textXPosition: 10,
        letterSpacing: 0.0,
        rightShift: 60, // this will move the text to the right by 60px
        extraWidth: 250, // this will increase the width of the background canvas that the text is drawn on to 
        upwardShift: 10, // this will move the text up by 50px
        pngOverlay: true,
      },
      {
        id: 'access-interview-long',
        name: 'Access Interview (long)',
        image: '/pngs/access/int-long.png',
        hasCustomText: true,
        fontSize: 120,
        normalFontSize: 120,
        smallFontSize: 100,
        hasCustomSecondText: true,
        textTargetPositionTopRatio: 0.712,
        textXPosition: 355,
        extraWidth: 50,
        letterSpacing: 0.0,
        negLineGap: 35, // this is the gap between the lines. increase to move the lines closer together
      },
      {
        id: 'access-exclusive',
        name: 'Access Exclusive',
        image: '/pngs/access/E.png',
        fontSize: 210,
        textTargetPositionTopRatio: 0.736,
        hasCustomText: false,
        text: 'EXCLUSIVE',
        textXPosition: 300,
        letterSpacing: 2.1,
        negLineGap: 35, // this is the gap between the lines. increase to move the lines closer together
      },
      {
        id: 'access-exclusive-b',
        name: 'Access Exclusive B',
        image: '/pngs/access/exclusive-b.png',
      },
      {
        id: 'access-daily',
        name: 'Access Daily',
        image: '/pngs/access/daily.png',
      },
      {
        id: 'access-award-season',
        name: 'Access Award Season',
        image: '/pngs/access/awards-new.png',
      },
      {
        id: 'access-reality-nightcap',
        name: 'Access Reality Nightcap',
        image: '/pngs/access/H.png',
      },
      {
        id: 'access-housewives-nightcap',
        name: 'Access Housewives Nightcap',
        image: '/pngs/access/housewives.png',
      },
      {
        id: 'access-behind-the-easel',
        name: 'Access Behind the Easel',
        image: '/pngs/access/behind_the_easel_full.png',
      },
      {
        id: 'access-espanol',
        name: 'Access Español',
        image: '/pngs/access/Espanol_Star.png',
      },
      {
        id: 'access-espanol-label',
        name: 'Access Español Label',
        image: '/pngs/access/Espanol_Star_Label.png',
      },
      {
        id: 'access-olympics',
        name: 'Access Olympics',
        image: '/pngs/access/Paris_Olympics_C.png',
      },
      {
        id: 'access-olympics-interview',
        name: 'Access Olympics Interview',
        image: '/pngs/access/Paris_Olympics_H.png',
        dynamicBG: true,
        fontSize: 153,
        normalFontSize: 153,
        smallFontSize: 143,
        textTargetPositionTopRatio: 0.817,
        hasCustomText: true,
        textXPosition: 10,
        letterSpacing: 0.0,
        rightShift: 70, // this will move the text to the right by 60px
        extraWidth: 250, // this will increase the width of the background canvas that the text is drawn on to 
        upwardShift: 10, // this will move the text up by 50px
        pngOverlay: true,
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
        image: '/pngs/wilkos/SW_Side_Element_A.png',
        hasCustomText: true,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/wilkos/SW_Side_Element_Live.png'
      },
      {
        id: 'wayback-b',
        name: 'Wayback B',
        image: '/pngs/wilkos/SW_Side_Element_D.png',
        hasCustomText: true,
        fontSize: 170,
        normalFontSize: 170,
        smallFontSize: 160,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.305,
        textXPosition: 25,
        canvasWidth: 870, // max width of the canvas before making the text wrap
        negLineGap: 65, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/wilkos/SW_Side_Element_Live.png'
      },
      {
        id: 'wayback-c',
        name: 'Wayback C',
        image: '/pngs/wilkos/wilkos-wayback-c.png',
        hasCustomText: true,
        fontSize: 170,
        normalFontSize: 170,
        smallFontSize: 160,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.305,
        textXPosition: 25,
        canvasWidth: 870, // max width of the canvas before making the text wrap
        negLineGap: 65, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/wilkos/SW_Side_Element_Live.png'
      },
      {
        id: 'new-a',
        name: 'New A',
        image: '/pngs/wilkos/SW_Side_Element_B.png',
        hasCustomText: true,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/wilkos/SW_Side_Element_Live.png'
      },
      {
        id: 'new-b',
        name: 'New B',
        image: '/pngs/wilkos/SW_Side_Element_B1.png',
        hasCustomText: true,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: true,
        icon: '/pngs/wilkos/SW_Side_Element_Live.png'
      }

    ]
  },
  {
    id: 'karamo',
    name: 'Karamo Show',
    minYPosition: -0.02,
    maxYPosition: 0.50,
    minXPosition: 0,
    maxXPosition: 110,
    segments: [
      {
        id: 'standard-a',
        name: 'Standard A',
        image: '/pngs/karamo/karamo-standard-a.png',
        hasCustomText: true,
        fontSize: 122,
        normalFontSize: 122,
        smallFontSize: 110,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.06,
        textXPosition: 1,
        extraWidth: 40,
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: false,
        textCenter: true,
      },
      {
        id: 'standard-b',
        name: 'Standard B',
        image: '/pngs/karamo/karamo-standard-b.png',
        hasCustomText: true,
        fontSize: 128,
        normalFontSize: 128,
        smallFontSize: 120,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.035 ,
        textXPosition: 1,
        extraWidth: 40,
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: false,
        textCenter: true,
      },
      {
        id: 'reacts',
        name: 'Reacts',
        image: '/pngs/karamo/karamo-reacts.png',
        hasCustomText: false,
        fontSize: 145,
        normalFontSize: 145,
        smallFontSize: 130,
        letterSpacing: 1.0,
        textTargetPositionTopRatio: 0.01,
        textXPosition: 25,
        canvasWidth: 800, // max width of the canvas before making the text wrap
        negLineGap: 50, // this is the gap between the lines. increase to move the lines closer together
        hasIcon: false,
      },
    ]
  }
];

export default brands;