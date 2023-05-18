import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "./types/Item";

const port = 8000;
const backendUrl = `http://localhost:${port}`;
const baseUrl = `${backendUrl}/todos`;

export async function getDay(date: string) {
  const url = `${baseUrl}?date=${date}`;
  return await axios.get(url);
}

export async function getItem(id?: number) {
  if (id) {
    const url = `${baseUrl}/${id}`;
    return await axios.get(url);
  }

  return await axios.get(baseUrl);
}

export async function setItem(item: TodoItem) {
  const { id } = item;
  const url = `${baseUrl}/${id}`;

  axios.put(url, item);
}

export async function createItem(text: string, done: boolean, date: string) {
  const id = uuidv4();
  const url = `${baseUrl}`;
  const item: TodoItem = { id, text, done, date };
  await axios.post(url, item);
  return item;
}

export async function deleteItem(id: string) {
  const url = `${baseUrl}/${id}`;
  axios.delete(url);
}
