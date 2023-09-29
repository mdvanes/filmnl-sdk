import { getProviders, find } from "./src/filmnl-sdk.js";
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

const assertGetProviders = async () => {
  const providersResult = await getProviders("film/blast-from-the-past");

  expect(
    "trailerHref",
    providersResult.trailerHref,
    "https://www.youtube.com/watch?v=Xq29uTtKW4M"
  );
  expect("length", providersResult.providers.length, 3);
};

const run = async () => {
  await assertFindBlast();
  await assertFindBlastFromThePast();
  await assertGetProviders();

  const findResult = await find("blast from the past");
  console.info(chalk.yellow("findResult:"), findResult[0]);
  if (findResult[0]?.href) {
    const providersResult = await getProviders(findResult[0].href);
    console.info(chalk.cyan("providersResult:"), providersResult);
  }
};

run();
