import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFilmes } from "../services/API";
import { Link } from "react-router-dom";

export default function Filmes() {
  const [filmes, setFilmes] = useState(null); //------------------------------------------ Dados ainda não carregados

  useEffect(() => {   //-------------------------------------------------------------------Executa 1x
    getFilmes()      //--------------------------------------------------------------------Array da api
      .then(resposta => setFilmes(resposta.data))
      .catch(erro => console.error("Erro ao carregar filmes:", erro));
  }, []);

  if (filmes === null) {
    return <Loading>Carregando filmes...</Loading>;
  }

  return (
    <ListaFilmes>
      <Title>Em cartaz</Title>

      <CardsContainer>
        {filmes.map(filme => (
          <FilmeCard key={filme.id}>
            <Link to={`/sessoes/${filme.id}`}>
              <img src={filme.posterURL} alt={filme.title} />
            </Link>
          </FilmeCard>
        ))}
      </CardsContainer>
    </ListaFilmes>
  )
}

// Styled-components

const Loading = styled.p`
  font-size: 24px;
  font-weight: 600;
  color:rgb(255, 255, 255);
  text-align: center;

`;

const ListaFilmes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

const Title = styled.h2`
  color: white;
  font-family: 'Sarala', sans-serif;
  font-size: 24px;
  font-weight: 400;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const FilmeCard = styled.div`
  width: 145px;
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  img {
    width: 100%;
    border-radius: 8px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;