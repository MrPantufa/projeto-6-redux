// src/pages/DeliveryPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3000;
`;

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background: #E66767;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;

  font-family: 'Roboto', sans-serif;
  z-index: 3001;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  color: #fff;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
`;

const Label = styled.label`
  margin: 0 0 4px 0;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
`;

const Input = styled.input`
  /* garante que nenhum reset global esconda os inputs */
  all: revert;

  width: 344px;
  height: 32px;
  padding: 0 8px;
  box-sizing: border-box;

  background: #FFEBD9;
  color: #E66767;
  font-weight: 700;
  font-size: 14px;
  line-height: 32px;

  border: none;
  outline: none;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const InputHalf = styled(Input)`
  width: 164px;
`;

const Button = styled.button`
  all: revert;

  width: 344px;
  height: 24px;

  background: #FFEBD9;
  color: #E66767;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`;

export default function DeliveryPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* escurece o fundo */}
      <Backdrop />

      {/* painel vermelho */}
      <Panel>
        <Title>Entrega</Title>

        <Label>Quem irá receber</Label>
        <Input defaultValue="João Paulo de Souza" />

        <Label>Endereço</Label>
        <Input />

        <Label>Cidade</Label>
        <Input />

        <Row>
          <div>
            <Label>CEP</Label>
            <InputHalf />
          </div>
          <div>
            <Label>Número</Label>
            <InputHalf />
          </div>
        </Row>

        <Label>Complemento (opcional)</Label>
        <Input />

        <Button>Continuar com o pagamento</Button>
        <Button onClick={() => navigate(-1)}>Voltar para o carrinho</Button>
      </Panel>
    </>
  );
}
