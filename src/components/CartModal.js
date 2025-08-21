import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increase, decrease, clear, selectItems, selectTotal } from '../store/cartSlice';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${(p) => (p.open ? 'flex' : 'none')};
  justify-content: flex-end;
  z-index: 9999;
`;

const Panel = styled.aside`
  width: 360px;
  height: 100%;
  background: #E66767;
  padding: 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
`;

const List = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 18px;
  gap: 16px;
  background: #FFFFFF;
  padding: 8px;
  align-items: center;
`;

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const Name = styled.p`
  margin: 0 0 4px 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #E66767;
`;

const Price = styled.p`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #E66767;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const QtyBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E66767;
  background: #FFEBD9;
  color: #E66767;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
`;

const Qty = styled.span`
  min-width: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #E66767;
`;

const Trash = styled.button`
  width: 18px;
  height: 18px;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 235, 217, 0.4);
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 14px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  height: 24px;
  background: #FFEBD9;
  color: #E66767;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  border: 0;
  cursor: pointer;
`;

const Close = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
  color: #FFFFFF;
  font-size: 20px;
  cursor: pointer;
`;

function toBRL(v) {
  return typeof v === 'number' ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
}

export default function CartModal({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  return (
    <Overlay open={open} onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>×</Close>
        <Title>Carrinho</Title>
        <List>
          {items.map((it) => (
            <Item key={it.id}>
              <Thumb src={it.img} alt={it.title} />
              <div>
                <Name>{it.title}</Name>
                <Price>{toBRL(it.price)}</Price>
                <QtyRow>
                  <QtyBtn onClick={() => dispatch(decrease(it.id))}>-</QtyBtn>
                  <Qty>{it.qty}</Qty>
                  <QtyBtn onClick={() => dispatch(increase(it.id))}>+</QtyBtn>
                </QtyRow>
              </div>
              <Trash onClick={() => dispatch(removeItem(it.id))}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18" stroke="#E66767" strokeWidth="2"/>
                  <path d="M8 6v-2h8v2" stroke="#E66767" strokeWidth="2"/>
                  <path d="M19 6l-1 14H6L5 6" stroke="#E66767" strokeWidth="2"/>
                  <path d="M10 11v6M14 11v6" stroke="#E66767" strokeWidth="2"/>
                </svg>
              </Trash>
            </Item>
          ))}
        </List>
        <Divider />
        <TotalRow>
          <span>Valor total</span>
          <span>{toBRL(total)}</span>
        </TotalRow>
        <CheckoutButton>Continuar com a entrega</CheckoutButton>
      </Panel>
    </Overlay>
  );
}
