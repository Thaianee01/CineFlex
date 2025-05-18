//Rotas entre página
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Filmes from './components/Filmes';
import Sessao from './components/Sessao';
import Assentos from './components/Assentos';
import Reserva from "./components/Reserva";

import styled from "styled-components";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Filmes />} />
          <Route path="/sessoes/:idFilme" element={<Sessao />} />
          <Route path="/assentos/:idSessao" element={<Assentos />} />
          <Route path="/sucesso" element={<Reserva />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: #212226;
  width: 100%;
  height: calc(100vh - 67px); 
  margin-top: 67px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;