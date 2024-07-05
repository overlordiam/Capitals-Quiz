import { unfilteredCapitalsObject } from './API'

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);


export const getCapital = (country: string, 
                unfilteredCountryAndCapitalsData: unfilteredCapitalsObject[]): string => {
    try {
        for (const capitalObject of unfilteredCountryAndCapitalsData) {
            if (capitalObject.name === country) { 
                        return capitalObject.capital
        }}
    } catch {
        console.log("nope")
    }
    return ""
    }

