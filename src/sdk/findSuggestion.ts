import got from "got";
import * as htmlparser2 from "htmlparser2";
import * as cheerio from "cheerio";
import { ROOT_URL } from "./constants.js";
import { getPostOptions } from "./util.js";

export const findSuggestion = async (keyword: string): Promise<string[]> => {
  const body = `query=${keyword}`;
  const response = await got.post(
    `${ROOT_URL}/search/findSuggestion`,
    getPostOptions(body)
  );

  const dom = htmlparser2.parseDocument(response.body);

  const $ = cheerio.load(dom);
  const listItems = $("ul > li");

  return listItems.toArray().map<string>((listItem) => $(listItem).text());
};
