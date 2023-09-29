import { OptionsOfTextResponseBody } from "got";

export const getPostOptions = (body: string): OptionsOfTextResponseBody => ({
  body,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": body.length.toString(),
  },
});
