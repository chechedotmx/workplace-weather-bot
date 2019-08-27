import { OpenWeatherAPIManager } from "../Managers/OpenWeatherAPIManager";
import { WorkplaceAPIManager } from "../Managers/WorkplaceAPIManager";
import { WeatherEntry } from "../BusinessObjects/WeatherEntry";

export class WeatherBotManagerConfig {
    public openWeatherApiKey: string;
    public city: string;
    public workplaceAccessToken: string;
    public workplaceAppSecret: string;
    public workplaceGroupID: string;
}

export class WeatherBotManager {
    config: WeatherBotManagerConfig;

    constructor(config: WeatherBotManagerConfig) {
        this.config = config;
    }

    public publishWeather = async (): Promise<void> => {
        const wApi = new OpenWeatherAPIManager(this.config.openWeatherApiKey);
        let entries = await wApi.getForecastByCityNTimes(this.config.city, 3);
        let message = this.createMarkDownMessage(entries);
        console.log("Message :" + message);
        const fAPI = new WorkplaceAPIManager(this.config.workplaceAccessToken, this.config.workplaceAppSecret);
        let response = await fAPI.postMessageInGroup(message, this.config.workplaceGroupID, "https://openweathermap.org/city/" + encodeURI(this.config.city));
        console.log("Response :" + response);
    }

    private createMarkDownMessage = (entries: Array<WeatherEntry>) => {
        let message = "This would be the **weather** for the day: "

        for (let index = 0; index < entries.length; index++) {
            const element = entries[index];
            if (index === 0)
                message += `The actual weather is ${element.toMarkDown(true)},`;
            else
                message += `In ${index * 3} hours the weather would be ${element.toMarkDown(true)}`;
        }
        return message;
    }

}