import { getCapital, shuffleArray } from "./utils"

export type unfilteredCapitalsObject = {
    name: string,
    capital: string, 
    iso2: string, 
    iso3: string
}

export type unfilteredCitiesObject = {
    cities: string[],
    country: string,
    iso2: string,
    iso3: string
}

export type filteredCapitalsObject = {
    country: string,
    capital: string, 
}

export type filteredCitiesObject = {
    cities: string[],
    country: string,
}

export type finalDataObject = {
    question: string,
    country: string,
    capital: string,
    cities: string[],
}

export const fetchData = async () => {
    const countryAndCapitals = "https://countriesnow.space/api/v0.1/countries/capital"
    const countryAndCities = "https://countriesnow.space/api/v0.1/countries"

    const countryAndCapitalsDataObject = await (await fetch(countryAndCapitals)).json()
    const unfilteredCountryAndCitiesDataObject = await (await fetch(countryAndCities)).json()

    const unfilteredCountryAndCapitalsData = countryAndCapitalsDataObject.data  
    const unfilteredCountryAndCitiesData = unfilteredCountryAndCitiesDataObject.data  

    const list_of_countries: string[] = []

    const filteredCountryAndCapitalsData: filteredCapitalsObject[] = []
    const filteredCountryAndCitiesData: filteredCitiesObject[] = []


    unfilteredCountryAndCitiesData.forEach((countryObject: unfilteredCitiesObject) => {
        list_of_countries.push(countryObject.country)
        filteredCountryAndCitiesData.push({
            country: countryObject.country,
            cities: countryObject.cities.filter((city) => city !== getCapital(countryObject.country, unfilteredCountryAndCapitalsData))
        })
    });


    unfilteredCountryAndCapitalsData.forEach((countryObject: unfilteredCapitalsObject) => {
        if (list_of_countries.includes(countryObject.name)) {
            filteredCountryAndCapitalsData.push({
                country: countryObject.name,
                capital: countryObject.capital
            })
        }
    })
    

    const finalData = filteredCountryAndCitiesData.map((data) => ({
        question: "The capital of " + data.country + " is?",
        country: data.country,
        capital: getCapital(data.country, unfilteredCountryAndCapitalsData),
        cities: shuffleArray([...shuffleArray(data.cities).slice(0,3), 
                getCapital(data.country, unfilteredCountryAndCapitalsData)])
    }))
    console.log(finalData)
    return finalData
}