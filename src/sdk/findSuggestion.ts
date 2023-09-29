import got from "got";
import * as htmlparser2 from "htmlparser2";
import * as cheerio from "cheerio";
import { ROOT_URL } from "./constants.js";
// import { request } from "https";

export const findSuggestion = async (keyword: string): Promise<string> => {
  const body = `query=${keyword}`;
  const response = await got.post(`${ROOT_URL}/search/findSuggestion`, {
    // json: false,
    // searchParams: { query: "captain" },
    // json: { "query=captain": "captain" },
    // body: encodeURIComponent("query=captain"),
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": body.length.toString(),
    },
  });
  // console.log(response.body);
  // console.log(response);
  // const { body } = response;
  const dom = htmlparser2.parseDocument(response.body);

  const $ = cheerio.load(dom);
  // console.log($("ul > li").text());
  const foo = $("ul > li"); // $("ul").children("li");
  for (const f of foo) {
    console.log($(f).text());
  }

  // const ul = // @ts-expect-error
  //   dom.children.find((c) => c.name === "ul");

  // if (!ul) {
  //   return "";
  // }

  // // @ts-expect-error
  // const li = ul.children;

  // // @t s-expect-error
  // console.log(li);

  // WORKS
  // const postData = "query=captain";
  // const req = request(
  //   {
  //     hostname: `www.film.nl`,
  //     port: 443,
  //     path: "/search/findSuggestion",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Content-Length": postData.length,
  //     },
  //   },
  //   (res) => {
  //     console.log("statusCode:", res.statusCode);
  //     console.log("headers:", res.headers);

  //     res.on("data", (d) => {
  //       process.stdout.write(d);
  //     });
  //   }
  // );

  // req.on("error", (e) => {
  //   console.error(e);
  // });

  // req.write(postData);
  // req.end();

  return "a";
};

// POST	https://www.film.nl/search/findSuggestion
// query	"captain"
// <div id='quicksearch_results_close'>Suggesties sluiten</div><ul><li>Captain America (1990)</li><li>Captain America: Civil war (2016)</li><li>Captain America: The First Avenger (2011)</li><li>Captain America: The Winter Soldier (2014)</li><li>Captain Blood (1935)</li><li>Captain Corelli's Mandolin (2001)</li><li>Captain Fall (2023)</li><li>Captain Fantastic (2016)</li><li>Captain Fish (2014)</li><li>Captain Horatio Hornblower (1951)</li><li>Captain Marvel (2019)</li><li>Captain Nova (2021)</li><li>Captain Phillips (2013)</li><li>Captain Underpants Epic Choice-o-Rama (2020)</li><li>Captain Underpants: Mega Blissmas (2020)</li><li>Captain Underpants: The First Epic Movie (2017)</li><li>Captain Volkonogov Escaped (2021)</li><li>Captains (2022)</li><li>Captains Courageous (1996)</li><li>Alatriste (2006)</li><li>De heldenverhalen van Kapitein Onderbroek (2018)</li><li>Der Hauptmann (2017)</li><li>Harlock Space Pirate (2013)</li><li>Iron Man and Captain America: Heroes United (2014)</li><li>Kapitein Morten en de Spinnenkoningin (2018)</li><li>Kapitein Rob en het geheim van professor Lupardi (2007)</li><li>Kapitein Sabeltand en de Magische Diamant (2019)</li></ul>

// curl 'https://www.film.nl/search/findSuggestion' -X POST --data-raw 'query=captain'
