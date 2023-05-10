import countries from 'world-countries';


const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: require(`world-countries/data/${country.cca3.toLocaleLowerCase()}.svg`),
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  console.log(formattedCountries)
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;