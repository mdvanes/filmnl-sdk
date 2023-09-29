import { getProviders, findSuggestion, find } from "./src/filmnl-sdk.js";
import chalk from "chalk";

const assertFindBlast = async () => {
  const findResult = await find("blast");

  console.assert(
    findResult.length === 7,
    chalk.red.bold(`length is "%s" not 7`),
    findResult.length
  );
  console.assert(
    findResult[0].title === "Blast",
    chalk.red.bold(`title is "%s", expected "Blast"`),
    findResult[0].title
  );
  expect("href", findResult[0].href, "film/blast");
};

const expect = (label: string, value: unknown, expected: unknown) => {
  console.assert(
    value === expected,
    chalk.red.bold(`${label} is "%s" , expected "${expected}"`),
    value
  );
};

const assertFindBlastFromThePast = async () => {
  const findResult = await find("blast from the past");

  expect("length", findResult.length, 1);
  expect("title", findResult[0].title, "Blast from the Past");
  expect("href", findResult[0].href, "film/blast-from-the-past");
};

const run = async () => {
  //   const result = await getItemById("captain-america-the-first-avenger");
  //   console.log(result);

  // await findSuggestion("captain");

  await assertFindBlast();
  await assertFindBlastFromThePast();

  const findResult = await find("blast from the past");
  console.info(chalk.yellow("findResult:"), findResult[0]);
  if (findResult[0]?.href) {
    const providersResult = await getProviders(findResult[0].href);
    console.info(chalk.cyan("providersResult:"), providersResult);
  }
};

run();
