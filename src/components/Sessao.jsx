import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getSessoes } from "../services/API"; 

export default function Sessao() {
  const { idFilme } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    getSessoes(idFilme)
      .then(resposta => setFilme(resposta.data))
      .catch(erro => console.error("Erro ao carregar sessões:", erro));
  }, [idFilme]);

  if (!filme) {
    return <SessaoContainer> Carregando sessões...</SessaoContainer>;
  }

  return (
    <SessaoContainer>
      <Titulo>Selecione o horário </Titulo>

      {filme.days.map(dia => (
        <DiaContainer key={dia.id}>
          <Dia>{dia.weekday}, {dia.date}</Dia>

          <HorariosContainer>
            {dia.showtimes.map(sessao => (
              <Link to={`/assentos/${sessao.id}`} key={sessao.id}>
                <Horario>{sessao.name}</Horario>
              </Link>
            ))}
          </HorariosContainer>
        </DiaContainer>
      ))}
    </SessaoContainer>
  );
}

// Estilos
const SessaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 20px;
  background-color: #212226;
  color: white;
  gap: 20px;
`;

const Titulo = styled.div`
  font-size: 24px;
  font-weight: 400;
  padding: 20px;
  color:rgb(255, 255, 255);
  font-family: 'Sarala', sans-serif;
`;

const DiaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  padding: 24px;
  border-radius: 8px;
  background-color: #2B2D36;
  gap: 12px;
`;

const Dia = styled.h2`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid #4E5A65;
  font-family: 'Sarala', sans-serif;
  color: #FFFFFF;
`;

const HorariosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
`;

const Horario = styled.button`
  background-color: #2B2D36;
  color: #EE897F;
  border: 2px solid #EE897F;
  width: 84px;
  height: 41px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: #3a3d4a;
    color: #ffffff;
  }
`;