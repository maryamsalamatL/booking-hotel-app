import { http, HttpResponse } from "msw";
import { bookmarks, hotels } from "./data";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const handlers = [
  http.get(`${BASE_URL}/bookmarks`, () => {
    return HttpResponse.json(bookmarks);
  }),
  http.delete(`${BASE_URL}/bookmarks/:id`, () => {
    return HttpResponse.json({ message: "successfully deleted" });
  }),
  http.get(`${BASE_URL}/hotels`, () => {
    return HttpResponse.json(hotels);
  }),
];
