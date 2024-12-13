import { http, HttpResponse } from "msw";
import { bookmarks } from "./data";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const handlers = [
  http.get(`${BASE_URL}/bookmarks`, () => {
    return HttpResponse.json(bookmarks);
  }),
  http.delete(`${BASE_URL}/bookmarks/:id`, (res) => {
    return HttpResponse.json({ message: "successfully deleted" });
  }),
];
