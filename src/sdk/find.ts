import got from "got";
import * as htmlparser2 from "htmlparser2";
import * as cheerio from "cheerio";
import { ROOT_URL } from "./constants.js";
import { getPostOptions } from "./util.js";

export interface FindResult {
  title: string;
  href: string;
  year?: number;
}

/**
 * Find movies and tv shows by keyword
 * @param keyword
 * @returns a list of results, including a href which is a unique identifier for an item
 */
export const find = async (keyword: string): Promise<FindResult[]> => {
  const body = `query=${keyword}`;
  const response = await got.post(
    `${ROOT_URL}/search/find`,
    getPostOptions(body)
  );

  const dom = htmlparser2.parseDocument(response.body);

  const $ = cheerio.load(dom);
  const listItems = $(".list .fromsearch");

  const results = listItems
    .toArray()
    .map<FindResult>((listItem): FindResult => {
      const yearStr = $(listItem).find(".year").text();
      const yearParsed = parseInt(yearStr, 10);
      const year = yearParsed && !isNaN(yearParsed) ? yearParsed : undefined;

      return {
        href: $(listItem).data("href")?.toString() ?? "",
        title: $(listItem).find(".title").text(),
        year,
      };
    });

  return results;
};
