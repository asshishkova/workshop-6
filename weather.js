// Recommended order for your solution:
// 1. Install the dotenv package.
// 2. Add a dotenv file, put the API key in dotenv and print it.
// 3. Install the node-fetch package.
// 4. Create a method that calls the API to get temperature using node-fetch.
// 5. Install the commander package.
// 6. Create a basic commander skeleton without the actions implementation (just the metadata and commands configuration).
// 7. Implement the first command, including the optional arguments.
// 8. BONUS - Implement the second command.

// Commander usage example for your reference:
import { Command } from "commander";
import { myLogger } from "mondayu-logger-assh";
import { AsyncWeather } from "@cicciosgamino/openweather-apis";
import 'dotenv/config';
// dotenv.config();
const apiKey = process.env.WEATHER_API_KEY;
const weatherInitializer = new AsyncWeather();
const weatherAPI = await weatherInitializer;
weatherAPI.setApiKey(apiKey);

const program = new Command();
program
  .name("weather")
  .description("show the weather")
  .version("1.0.0");

program
  .command("get-temp")
  .description("Type the city")
  .argument("<string>", "city")
  .option("-c, --color <string>", "Result color", "white")
  .action(async (city) => {
    weatherAPI.setCity(city);
    const temp = await weatherAPI.getTemperature();
    myLogger.log(`It's ${temp} degrees in ${city}`);
  });

program.parse();
