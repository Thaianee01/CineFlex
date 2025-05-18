import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

export default function Reserva() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            navigate("/");
        }
    }, [state, navigate]);

    if (!state) return null;

    return (
        <Container>
            <Title>Pedido finalizado!</Title>

            <Info>
                <Section>
                    <Subtitulo>Filme e sessão</Subtitulo>
                    <Texto>{state.filme}</Texto>
                    <Texto>{state.data} - {state.hora}</Texto>
                </Section>

                <Section>
                    <Subtitulo>Ingressos</Subtitulo>
                    {state.assentos.map(assento => (
                        <Texto key={assento.id}>Assento {assento.name}</Texto>
                    ))}
                </Section>

                <Section>
                    <Subtitulo>Comprador</Subtitulo>
                    <Texto>Nome: {state.nome}</Texto>
                    <Texto>CPF: {state.cpf}</Texto>
                </Section>
            </Info>

            <Finalizar>
                <Button onClick={() => navigate("/")}>Voltar para Tela Inicial</Button>
            </Finalizar>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: white;
`;

const Title = styled.h2`
  color: #9DB899;
  text-align: center;
  font-family: 'Sarala', sans-serif;
  font-size: 24px;
  font-weight: 400;
  padding: 20px;
  margin-top: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  padding: 24px;
  border-radius: 8px;
  background-color: #2B2D36;
  gap: 20px;
`;

const Section = styled.div`
  width: 100%;
`;

const Subtitulo = styled.h3`
  color: #EE897F;
  font-family: 'Sarala', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  border-bottom: 2px solid #4E5A65;
  padding-bottom: 4px;
  width: 100%;
`;

const Texto = styled.p`
  color: #FFFFFF;
  font-family: 'Sarala', sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin: 4px 0;
`;

const Finalizar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 30px auto 0;
`;


const Button = styled.button`
  width: 70%;
  margin: 0 auto;
  padding: 12px 24px;
  background-color: #EE897F;
  color: #2B2D36;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;
