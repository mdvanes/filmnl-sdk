import got from "got";
import * as htmlparser2 from "htmlparser2";
import * as cheerio from "cheerio";
import { ROOT_URL } from "./constants.js";

export interface Provider {
  name?: string;
  href?: string;
}

export interface Providers {
  title: string;
  trailerHref?: string;
  providers: Provider[];
}

/**
 * Get the providers where you can view this movie or tv show.
 * @param href String href has shape /film/my-movie or /serie/my-tv-show and can be retrieved with `find()`
 * @returns
 */
export const getProviders = async (href: string): Promise<Providers> => {
  const response = await got(`${ROOT_URL}/${href}`);
  const { body } = response;
  const dom = htmlparser2.parseDocument(body);

  const $ = cheerio.load(dom);
  const listItems = $(".provider");

  const providers = listItems.toArray().map<Provider>((listItem) => {
    const providerlink = $(listItem).find(".providerlink");
    return {
      name: providerlink.data("retailer")?.toString(),
      href: providerlink.attr("href")?.toString(),
    };
  });

  const trailerHref = $(".trailer").data("href");

  return {
    title: $("h1.hidemobile").text(),
    trailerHref: trailerHref
      ? `https://www.youtube.com/watch?v=${trailerHref}`
      : undefined,
    providers,
  };
};
