import { WeatherBotManager } from "./Managers/WeatherBotManager";

const wbm = new WeatherBotManager({
    openWeatherApiKey: "xxxxxxxxxx",
    city: "Mexico City",
    workplaceAccessToken: "xxxxxxxxxx",
    workplaceAppSecret: "xxxxxxxxxx",
    workplaceGroupID: "xxxxxxxxxx"
});

wbm.publishWeather().then(value => {
    // @ts-ignore: Unreachable code error
    callback(null, [{ respuesta: "ok" }]);
}
).catch(err => {
    // @ts-ignore: Unreachable code error
    callback(null, [{ error: err.toString() }]);
}
);