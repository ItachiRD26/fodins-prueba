// src/app/ministerio/lib/api.ts
import { Post, BibleQuote, Message } from "@/app/ministerio/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Funciones para Posts
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
}

export async function createPost(post: Post): Promise<Post> {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function updatePost(id: string, post: Post): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
}

// Funciones para Citas Bíblicas
export async function getQuotes(): Promise<BibleQuote[]> {
  const res = await fetch(`${API_URL}/quotes`);
  return res.json();
}

export async function getQuote(id: string): Promise<BibleQuote> {
  const res = await fetch(`${API_URL}/quotes/${id}`);
  return res.json();
}

export async function createQuote(quote: BibleQuote): Promise<BibleQuote> {
  const res = await fetch(`${API_URL}/quotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });
  return res.json();
}

export async function updateQuote(id: string, quote: BibleQuote): Promise<BibleQuote> {
  const res = await fetch(`${API_URL}/quotes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });
  return res.json();
}

export async function deleteQuote(id: string): Promise<void> {
  await fetch(`${API_URL}/quotes/${id}`, {
    method: "DELETE",
  });
}

// Funciones para Mensajes
export async function getMessages(): Promise<Message[]> {
  const res = await fetch(`${API_URL}/messages`);
  return res.json();
}

export async function getMessage(id: string): Promise<Message> {
  const res = await fetch(`${API_URL}/messages/${id}`);
  return res.json();
}

export async function createMessage(message: Message): Promise<Message> {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return res.json();
}

export async function updateMessage(id: string, message: Message): Promise<Message> {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return res.json();
}

export async function deleteMessage(id: string): Promise<void> {
  await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
  });
}