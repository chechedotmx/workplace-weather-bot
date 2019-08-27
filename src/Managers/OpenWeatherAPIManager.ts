import { WeatherEntry } from "../BusinessObjects/WeatherEntry";

export class OpenWeatherAPIManager {
    uri: string;
    appId: string;
    constructor(appId: string) {
        this.appId = appId;
        this.uri = "http://api.openweathermap.org";
    }

    public getForecastByCity = async (city: string) => {
        try {
            let cityUriEncoded = encodeURIComponent(city);
            let response = await fetch(
                `${this.uri}/data/2.5/forecast?q=${city}&units=imperial&APPID=${this.appId}`,
                { method: 'POST' }
            );
            return await response.text();
        } catch (error) {
            throw error
        }
    }

    public static fToC = (fahrenheit: number): number => {
        let fTemp = fahrenheit;
        let fToCel = (fTemp - 32) * 5 / 9;
        return fToCel;
    }
    public getForecastByCityNTimes = async (city: string, n: number): Promise<Array<WeatherEntry>> => {
        let json = await this.getForecastByCity(city);
        return this.getNextWeathers(n, json)
    }

    private getNextWeathers = (i: number, apidata: string): Array<WeatherEntry> => {
        let object = JSON.parse(apidata);
        let weathers = new Array<WeatherEntry>();
        for (let index = 0; index < i; index++) {
            const element = object.list[index];
            weathers.push(
                new WeatherEntry(element.main.temp, element.weather[0].main, element.weather[0].description, element.weather[0].icon)
            )
        }
        return weathers;
    }

}