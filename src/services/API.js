import axios from "axios";

const api = axios.create({ baseURL: "https://mock-api.driven.com.br/api/v8/cineflex"});

// GET - Lista de filmes
export function getFilmes() {
  return api.get("/movies");
}

// GET - Lista de sessões de um filme
export function getSessoes(filmeId) {
  return api.get(`/movies/${filmeId}/showtimes`);
}

// GET - Lista de assentos de uma sessão
export function getAssentos(sessaoId) {
  return api.get(`/showtimes/${sessaoId}/seats`);
}

// POST - Reservar assentos
export function postReserva({ ids, name, cpf }) {
  return api.post("/seats/book-many", { ids, name, cpf });
}