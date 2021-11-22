export const constants = {
  gasoline: {
    price: 6.9,
    density: 0.75,
    co2Factor: 3.7,
    ethanolVolume: 0.82,
  },
  gnv: {
    price: 3.8,
    gasolineEconomy: 1.29,
  },
};

const { co2Factor, density, ethanolVolume } = constants.gasoline;

const kgCO2perGasolineLiter = 1 * co2Factor * density * ethanolVolume;

const decimalAdjust = (number) => {
  return Number(Number(number).toFixed(2));
};

const getCosume = {
  gasolineLiters: ({ kmL, avgKm }) => {
    return decimalAdjust(avgKm / kmL);
  },
  gnvM3: ({ avgKm, kmM3 }) => {
    return decimalAdjust(avgKm / kmM3);
  },
};

const gnvConversion = {
  gnvM3fromGasolineKmL: ({ gasolineKmL }) => {
    return decimalAdjust(gasolineKmL / 1.29);
  },
  gnvCo2FromGasoline: ({ gasolineCo2Emission }) => {
    return decimalAdjust(gasolineCo2Emission - gasolineCo2Emission * 0.2);
  },
};

const calcGasoline = ({ avgKm, cityKmL, roadKmL, price }) => {
  const cityLiters = getCosume.gasolineLiters({
    avgKm: avgKm,
    kmL: cityKmL,
  });

  const roadLiters = getCosume.gasolineLiters({
    avgKm: avgKm,
    kmL: roadKmL,
  });

  const gasoline = {
    city: {
      liters: cityLiters,
      cost: decimalAdjust(cityLiters * price),
      co2: decimalAdjust(kgCO2perGasolineLiter * avgKm),
    },
    road: {
      liters: roadLiters,
      cost: decimalAdjust(roadLiters * price),
      co2: decimalAdjust(kgCO2perGasolineLiter * avgKm),
    },
    price,
  };

  return gasoline;
};

const calcGnv = ({ cityKmL, roadKmL, gasoline, avgKm, price }) => {
  const gnvKmM3 = {
    city: gnvConversion.gnvM3fromGasolineKmL({
      gasolineKmL: cityKmL,
    }),
    road: gnvConversion.gnvM3fromGasolineKmL({
      gasolineKmL: roadKmL,
    }),
  };

  const cityM3 = getCosume.gnvM3({ avgKm, kmM3: gnvKmM3.city });
  const roadM3 = getCosume.gnvM3({ avgKm, kmM3: gnvKmM3.road });

  const gnv = {
    city: {
      m3: cityM3,
      cost: decimalAdjust(cityM3 * price),
      co2: gnvConversion.gnvCo2FromGasoline({
        gasolineCo2Emission: gasoline.city.co2,
      }),
    },
    road: {
      m3: roadM3,
      cost: decimalAdjust(roadM3 * price),
      co2: gnvConversion.gnvCo2FromGasoline({
        gasolineCo2Emission: gasoline.road.co2,
      }),
    },
    price,
  };

  return gnv;
};

const defaultData = {
  avgKmDay: 0,
  cityKmL: 0,
  roadKmL: 0,
};

export const defaultPrices = {
  gasoline: constants.gasoline.price,
  gnv: constants.gnv.price,
};

const calc = ({ days = 1, data = defaultData, prices = defaultPrices }) => {
  const { cityKmL, roadKmL, avgKmDay } = data;

  const avgKm = days * avgKmDay;

  const gasoline = calcGasoline({
    avgKm,
    cityKmL,
    roadKmL,
    days,
    price: prices.gasoline,
  });

  const gnv = calcGnv({
    avgKm,
    days,
    cityKmL,
    roadKmL,
    gasoline,
    price: prices.gnv,
  });

  return { gasoline, gnv, days };
};

export default calc;
