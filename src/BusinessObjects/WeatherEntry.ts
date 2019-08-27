import { OpenWeatherAPIManager } from "../Managers/OpenWeatherAPIManager";

export class WeatherEntry {
    farenheit: number;
    celsius: number;
    category: string;
    description: string;
    icon: string;

    constructor(farenheit: number, category: string, description: string, icon: string) {
        this.farenheit = farenheit;
        this.celsius = OpenWeatherAPIManager.fToC(farenheit);
        this.category = category;
        this.description = description;
        this.icon = icon;
    }

    /**
     * name
     */
    public toMarkDown(celsius: boolean) {
        return `${celsius ? this.celsius.toFixed(2) : this.farenheit.toFixed(2)} ${celsius ? "Celsius" : "Farenheit"} with **${this.category}** (${this.description}) `;
    }

}