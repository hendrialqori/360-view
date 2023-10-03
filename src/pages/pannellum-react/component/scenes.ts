export const scenes = {
  centre: {
    sceneName: "studioAcentre",
    slug: "centre",
    scenePanoImg: "/image-1.jpg",
    initPitch: -2.7342254361971903,
    initYaw: -71.59834061057227,
    hotSpotsArr: [
      {
        pitch:  -4.039972808417368,
        yaw: 14.996150879515156,
        transition: "lobby",
        type: "custom"
      },
      {
        pitch: -10,
        yaw: -75.95322066806996,
        transition: "control",
        type: "custom"
      },
      {
        pitch: -5.563298144923796,
        yaw: 153.60346485120957,
        transition: "amps",
        type: "custom"
      },
      {
        pitch:  29.541215457980197,
        yaw: 178.7713811459697,
        type: "info",
        text: "Sonor Signature Series",
        url: ""
      },
      {
        pitch: -64.1128471992752,
        yaw: 1.26214348193396,
        type: "info",
        text: "Sonor Signature Series",
        url: ""
      }
    ]
  },
  lobby: {
    sceneName: "lobby",
    slug: "lobby",
    scenePanoImg: "./images/lobby.jpeg",
    initPitch: 0.9281912889787105,
    initYaw: 126.87471048680484,
    hotSpotsArr: [
      {
        pitch: -1.2139652395569707,
        yaw: 170.02892314325766,
        transition: "centre",
        type: "custom"
      },
      {
        pitch: -1.6878199836975938,
        yaw: 97.03543091518348,
        transition: "studiob",
        type: "custom"
      },
      {
        pitch: 0.018403293588653363,
        yaw: 106.37870184669043,
        transition: "studioc",
        type: "custom"
      },
      {
        pitch: 1.5111661556071483,
        yaw: 116.08738619720158,
        transition: "kitchen",
        type: "custom"
      }
    ]
  },
  control: {
    sceneName: "studioAcontrol",
    slug: "control",
    scenePanoImg: "./images/studio-A_control.jpeg",
    initPitch: -19.039397382494883,
    initYaw: -6.074582550811249,
    hotSpotsArr: [
      {
        pitch: -0.6823584269296668,
        yaw: -48.057332810223606,
        transition: "centre",
        type: "custom"
      },
      {
        pitch: 0.8344510119563971,
        yaw: 26.559165217764185,
        transition: "lobby",
        type: "custom"
      },
      {
        pitch: 0.8344510119563971,
        yaw: 20.559165217764185,
        transition: "lobby",
        type: "custom"
      },
      {
        pitch: -39.63498815234347,
        yaw: 45.5933503369788,
        type: "info",
        text: "Mac Pro"
      }
    ]
  },
  amps: {
    sceneName: "studioAamps",
    slug: "amps",
    scenePanoImg: "./images/studio-A_amps.jpeg",
    initPitch: -14.67870461927905,
    initYaw: -4.15014513356831,
    hotSpotsArr: [
      {
        pitch: 5.415471053908403,
        yaw: 107.39929697097236,
        transition: "lobby",
        type: "custom"
      },
      {
        pitch: -2.5086127697264193,
        yaw: -118.71730610610837,
        transition: "centre",
        type: "custom"
      }
    ]
  },
  studiob: {
    sceneName: "studioB",
    slug: "studiob",
    scenePanoImg: "./images/studio-B.jpeg",
    initPitch: -15.786736656954153,
    initYaw: -39.455927353368175,
    hotSpotsArr: [
      {
        pitch: -5.769933454049382,
        yaw: -139.9868101390428,
        transition: "lobby",
        type: "custom"
      }
    ]
  },
  studioc: {
    sceneName: "studioC",
    slug: "studioc",
    scenePanoImg: "./images/studio-C.jpeg",
    initPitch: -17.401790016227125,
    initYaw: 95.4232590874534,
    hotSpotsArr: [
      {
        pitch: -5.507104189474294,
        yaw: 98.9641219316082,
        transition: "lobby",
        type: "custom"
      }
    ]
  },
  kitchen: {
    sceneName: "kitchen",
    slug: "kitchen",
    scenePanoImg: "./images/kitchen.jpeg",
    initPitch: -7.403534011791035,
    initYaw: -82.7456174211854,
    hotSpotsArr: [
      {
        pitch: -3.5175384513404873,
        yaw: 109.43983094512774,
        transition: "lobby",
        type: "custom"
      },
      {
        pitch: -2.098026320919447,
        yaw: 122.7445434586991,
        transition: "centre",
        type: "custom"
      }
    ]
  }
};
