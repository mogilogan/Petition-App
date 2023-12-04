const sspData = {
  "SSP_L&O": {
    SP_EAST: {
      SHO: [
        "SHO_GRANDBAZAR",
        "SHO_ODEANSALAI",
        "SHO_ORLEANPET",
        "SHO_KALAPET",
        "SHO_MUTHIALPET",
      ],
      CI: ["CI_MUTHIALPET"],
    },

    SP_NORTH: {
      SHO: [
        "SHO_LAWSPET",
        "SHO_METTUPALAYAM",
        "SHO_SHO_REDDIARPALAYAM",
        "SHO_DNAGAR",
        "SHO_SEDARAPET",
      ],
      CI: ["CI_METTUPALAYAM", "CI_DNAGAR"],
    },

    SP_YANAM: {
      SHO: ["SHO_YANAM"],
      CI: ["CI_YANAM"],
    },

    SP_MAHE: {
      SHO: ["SHO_MAHE", "SHO_PALLOOR"],
      CI: ["CI_MAHE"],
    },

    SP_ARS: {
      CI: ["CI_ARS"],
    },

    SP_ANS: {
      CI: ["CI_ANS"],
    },

    SP_COASTALSECURITY: {
      INSPECTOR: [
        "INSPECTOR_COASTALPUDUCHERRY",
        "INSPECTOR_COASTALKARAIKAL",
        "INSPECTOR_COASTALYANAM",
        "INSPECTOR_COASTALMAHE",
      ],
    },

    SP_WEST: {
      SHO: [
        "SHO_VILLIANUR",
        "SHO_MANGALAM",
        "SHO_SHO_NETTAPAKKAM",
        "SHO_THIRUDHUVANAI",
        "SHO_THIRUKKANUR",
        "SHO_KATTERIKUPPAM",
      ],
      CI: ["CI_VILLIANUR", "CI_NETTAPAAKAM", "CI_THIRUKKANUR"],
    },

    SP_SOUTH: {
      SHO: [
        "SHO_MUDALIYARPET",
        "SHO_BAHOUR",
        "SHO_SHO_KARAIKALAMPAKKAM",
        "SHO_PRIYANKUPPAM",
        "SHO_THAVALAKUPPAM",
      ],
      CI: ["CI_BAHOUR", "CI_PIRIYANKUPPAM"],
    },
  },
  SSP_CRI: {
    SP_CIDRB: {
      INSPECTOR: ["INSPECTOR_CRB", "INSPECTOR_CID"],
    },

    SP_SB: {
      INSPECTOR: ["INSPECTOR_SBPDY", "INSPECTOR_SBPDY!", "INSPECTOR_SBKKL"],
    },

    SP_SIGMASECURITY: {
      INSPECTOR: ["INSPECTOR_1", "INSPECTOR_2", "INSPECTOR_3"],
    },

    SP_SIGMAINTELLIGENCE: {},
    SP_PCR: {
      INSPECTOR: ["INSPECTOR_1"],
    },
  },
  SSP_HQ: {
    SP_HQ: {},
    SP_CHIEFSTORES: {
      INSPECTOR: ["INSPECTOR_CS"],
    },

    SP_PAP: {
      INSPECTOR: ["INSPECTORPAP_1", "INSPECTORPAP_2", "INSPECTORPAP_3"],
    },

    SP_MT: {
      INSPECTOR: ["INSPECTOR_MT"],
    },

    SP_HG: {
      INSPECTOR: ["INSPECTOR_HG"],
    },

    "SP_PTS&WELFARE": {
      INSPECTOR: ["INSPECTOR_PTS"],
    },
  },
  SSP_TRAFFIC: [
    {
      SP_NE: {
        SHO: ["TRAFFIC_SHO_EAST", "TRAFFIC_SHO_NORTH", "TRAFFIC_ENG_CELL"],
      },
    },
    {
      SP_SW: {
        SHO: ["TRAFFIC_SHO_SOUTH", "TRAFFIC_SHO_WEST"],
      },
    },
    {
      SP_CYPER_PS: {
        CI: ["INSPECTOR_1", "INSPECTOR_2"],
      },
    },
    {
      SP_CCTNS: {},
    },
    {
      "SP_WIRELESS&CCR": {
        CI: ["INSPECTOR_1", "INSPECTOR_2"],
      },
    },
  ],
};

export { sspData };
