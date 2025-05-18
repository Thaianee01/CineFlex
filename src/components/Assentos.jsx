import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Assentos() {
    const { idSessao } = useParams();
    const navigate = useNavigate();

    const [sessao, setSessao] = useState(null);
    const [selecionados, setSelecionados] = useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    //buscar assentos
    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
            .then(resposta => setSessao(resposta.data))
            .catch(erro => console.error("Erro ao buscar assentos:", erro));
    }, [idSessao]);

    //selecionar assentos
    function selecionarAssento(assento) {
        if (!assento.isAvailable) return alert("Esse assento não está disponível");

        setSelecionados(prevSelecionados => {
            if (prevSelecionados.includes(assento.id)) {
                return prevSelecionados.filter(id => id !== assento.id); // Remove seleção
            } else {
                return [...prevSelecionados, assento.id]; // Adiciona seleção
            }
        });
    }

    function fazerReserva(e) {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        // Validação básica
        if (selecionados.length === 0) return alert("Selecione pelo menos um assento!");
        if (!nome || !cpf) return alert("Preencha todos os dados pessoais!");

        //Dados do assento selecionado
        const Reserva = {
            ids: selecionados,
            name: nome,
            cpf: cpf
        };

        // Enviando para a API
        axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", Reserva)
            .then(() => {
                const assentosSelecionados = sessao.seats.filter(s => selecionados.includes(s.id));

                navigate("/sucesso", {
                    state: {
                        nome,
                        cpf,
                        assentos: assentosSelecionados,
                        filme: sessao.movie.title,
                        data: sessao.day.date,
                        hora: sessao.name
                    }
                });
            })
            .catch(erro => {
                console.error("Erro na reserva:", erro);
                alert("Ocorreu um erro ao fazer a reserva!");
            });
    }

    if (!sessao) return <Container>Carregando assentos...</Container>;

    return (
        <Container>
            <Titulo>Selecione o(s) assento(s)</Titulo>

            <ListaAssentos>
                {sessao.seats.map(assento => {
                    //definir o status do assento
                    let status;
                    if (assento.isAvailable === false) {
                        status = 'indisponivel';
                    } else if (selecionados.includes(assento.id)) {
                        status = 'selecionado';
                    } else {
                        status = 'disponivel';
                    }

                    return (
                        <Assento
                            key={assento.id}
                            $status={status} //props
                            onClick={() => selecionarAssento(assento)}
                            disabled={!assento.isAvailable}
                        >
                            {assento.name}
                        </Assento>
                    );
                })}
            </ListaAssentos>
            <Divisor />
            <Form onSubmit={fazerReserva}>
                <label>Nome do comprador:</label>
                <input
                    type="text"
                    value={nome}
                    placeholder="Digite o seu nome..."
                    onChange={e => setNome(e.target.value)}
                    required
                />

                <label>CPF do comprador:</label>
                <input
                    type="text"
                    value={cpf}
                    placeholder="Digite o seu CPF..."
                    onChange={e => setCpf(e.target.value)}
                    required
                />

                <button type="submit">Reservar assento(s)</button>
            </Form>
        </Container>
    );
}

//style
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    gap: 24px;
    padding: 16px 0;
    overflow-y: auto;
`;

const Assento = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px;
    transition: all 0.2s;
    color: #2B2D36;

    background-color: ${props =>
        props.$status === "indisponivel" ? "#2B2D36" :
            props.$status === "selecionado" ? "#FADBC5" :
                "#9DB899"};
    
    border: ${props =>
        props.$status === "selecionado" ? "2px solid #EE897F" : "none"};
`;

const Titulo = styled.h2`
  color: white;
  font-family: 'Sarala', sans-serif;
  font-size: 24px;
  font-weight: 400;
  padding: 20px;
`;

const ListaAssentos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
  gap: 10px;
  width: 75%;
  margin: 0 auto;
`;

const Divisor = styled.hr`
  width: 80%;
  border: none;
  height: 1px;
  background-color: #4E5A65;
  margin: 24px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    margin: 0 auto;

    input {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        background-color: #EE897F;
        color: #2B2D36;
        padding: 12px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
    }
`;
