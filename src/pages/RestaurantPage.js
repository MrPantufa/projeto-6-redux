import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { CART_ADD, CART_REMOVE } from '../store/cartSlice';

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  background: #FFF8F2;
  min-height: 1624px;
`;

const PageHeader = styled.div`
  position: relative;

  /* full-bleed: ocupa 100% da viewport */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  height: 136px;

  /* pattern deve repetir (não cover) */
  background: url('/assets/fundo.png') top center repeat;
  background-size: auto;
`;

const Logo = styled.img`
  position: absolute;
  top: 40px;
  left: calc((100vw - 1366px) / 2 + 621px);
  width: 125px;
  height: 57.5px;
`;





const HeaderLink = styled(Link)`
  position: absolute;
  top: 59px;
  left: 171px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  color: #E66767;
  text-align: center;
  cursor: pointer;
`;

const CartStatus = styled.div`
  position: absolute;
  top: 59px;
  right: 171px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #E66767;
  cursor: pointer;
`;

const BannerImage = styled.img`
  position: absolute;

  /* full-bleed para o banner */
  width: 100vw;
  left: 50%;
  margin-left: -50vw;

  height: 280px;
  top: 136px;
  object-fit: cover;
`;

const BannerTitle = styled.h1`
  position: absolute;
  top: 208px;
  left: 171px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: #FFFFFF;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 416px;
  left: 0;
  width: 100%;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 32px;
  width: 1024px;
  margin: 40px auto 0;
`;

const OrderCard = styled.div`
  position: relative;
  width: 320px;
  height: 338px;
  background: #E66767;
  border: 1px solid #E66767;
  padding: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const OrderImage = styled.img`
  width: 304px;
  height: 167px;
  object-fit: cover;
  background: #fff;
`;

const OrderTitle = styled.h3`
  margin: 8px 0 4px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 16px;
  color: #FFFFFF;
`;

const OrderDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 1.4;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const OrderButtonBar = styled.button`
  width: 304px;
  height: 24px;
  margin-top: auto;
  align-self: center;
  background: #FFEBD9;
  color: #E66767;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  border: 0;
  outline: 0;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1000;
`;

const DetailsCard = styled.div`
  position: absolute;
  width: 1024px;
  min-height: 344px;
  background: #E66767;
  top: 128px;
  left: 50%;
  transform: translateX(-50%);
  padding: 32px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const DetailImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  background: #fff;
`;

const DetailTitle = styled.h2`
  margin: 0 0 8px 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: #FFFFFF;
`;

const DetailDescription = styled.p`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 1.4;
`;

const DetailServe = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #FFFFFF;
`;

const AddToCartButton = styled.button`
  width: 304px;
  height: 24px;
  background: #FFEBD9;
  color: #E66767;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  margin: 80px 0;
`;

const CartOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
`;

const CartPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background: #E66767;
  opacity: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto; /* permite rolar quando ficar muito cheio */
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 32px;
`;

const Spacer = styled.div`
  width: 1px; /* não ocupa largura; só altura */
  height: ${(p) => p.h || 0}px;
`;

const CartItem = styled.div`
  position: relative;
  width: 344px;
  height: 100px;
  background: #FFEBD9;
  border: 1px solid #F0C6B6;
  padding: 8px;
`;

const CartThumb = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 8px;
  left: 16px;
  object-fit: cover;
`;

const CartName = styled.div`
  position: absolute;
  width: 140px;
  height: 21px;
  top: 8px;
  left: 104px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 18px;
  color: #E66767;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
`;

const CartPrice = styled.div`
  position: absolute;
  width: 67px;
  height: 22px;
  top: 64px;
  left: 104px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #E66767;
`;

const TrashIcon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 76px;
  right: 16px;
  opacity: 1;
  cursor: pointer;
  user-select: none;
`;

const CartTotalRow = styled.div`
  width: 344px;
  height: 16px;
  background: #E66767;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #FFEBD9;
`;

const ProceedButton = styled.button`
  width: 344px;
  height: 24px;
  margin-top: 8px;
  background: #FFEBD9;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  color: #E66767;
  border: none;
  outline: 0;
  cursor: pointer;
`;

const toBRL = (v) =>
  typeof v === 'number'
    ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : '';

function normalizeSlug(v = '') {
  return String(v)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function RestaurantPage() {
  const params = useParams();
  const slugParam = normalizeSlug(Object.values(params)[0]);

  const [bannerTitle, setBannerTitle] = useState('');
  const [cards, setCards] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const cartTotal = useSelector((state) =>
    (state.cart?.items ?? []).reduce((s, it) => s + (it.priceNumber || 0), 0)
  );

  function handleMoreDetails(index) {
    setOpenIndex(index);
  }

  function removeFromCart(idx) {
    dispatch({ type: CART_REMOVE, payload: idx });
  }

  function handleAddToCartFromModal() {
    if (openIndex === null) return;
    const item = cards[openIndex];
    if (!item) return;
    dispatch({ type: CART_ADD, payload: item });
    setOpenIndex(null);
    setCartOpen(true);
  }

  
  const BASE_TOP = 404;

  
  const ITEM_HEIGHT = 100;
  const ITEM_BORDER_Y = 2;  
  const ITEM_GAP = 12;

  
  const PANEL_PAD_TOP = 16;
  const LIST_PAD_TOP = 32;

  const n = cartItems.length;
  const listHeight =
    n > 0
      ? n * (ITEM_HEIGHT + ITEM_BORDER_Y) + Math.max(0, n - 1) * ITEM_GAP
      : 0;

  
  const spacerHeight = Math.max(
    0,
    BASE_TOP - (PANEL_PAD_TOP + LIST_PAD_TOP) - listHeight
  );
  // ------------------------------------------------------------

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        const json = await res.json();
        const restaurantes = Array.isArray(json) ? json : json?.restaurantes || [];
        let found =
          restaurantes.find((r) => normalizeSlug(r.slug) === slugParam) || restaurantes[0];

        if (found) {
          setBannerTitle(found.tipo || '');
          const items = (found.cardapio || []).map((item) => ({
            img: item.foto,
            title: item.nome,
            description: item.descricao || '',
            serve: item.porcao || 'Serve: de 2 a 3 pessoas',
            priceNumber: typeof item.preco === 'number' ? item.preco : null,
            priceText: typeof item.preco === 'number' ? toBRL(item.preco) : ''
          }));
          setCards(items);
        }
      } catch {
        setBannerTitle('');
        setCards([]);
      }
    }
    load();
  }, [slugParam]);

  return (
    <PageContainer>
      <PageHeader>
        <Logo src="/assets/logo.png" alt="logo" />
        <HeaderLink to="/">Restaurantes</HeaderLink>
        <CartStatus onClick={() => setCartOpen(true)}>
          {cartItems.length} produto(s) no carrinho
        </CartStatus>
      </PageHeader>

      <BannerImage src="/assets/imagemfundo.png" alt="banner" />
      <BannerTitle>{bannerTitle}</BannerTitle>

      <MenuContainer>
        <CardsWrapper>
          {cards.map((c, i) => (
            <OrderCard key={i}>
              <OrderImage src={c.img} alt={c.title} />
              <OrderTitle>{c.title}</OrderTitle>
              <OrderDescription>{c.description}</OrderDescription>
              <OrderButtonBar onClick={() => handleMoreDetails(i)}>
                Mais detalhes
              </OrderButtonBar>
            </OrderCard>
          ))}
        </CardsWrapper>
      </MenuContainer>

      {openIndex !== null && cards[openIndex] && (
        <Overlay>
          <DetailsCard>
            <CloseIcon src="/assets/close.png" alt="Fechar" onClick={() => setOpenIndex(null)} />
            <DetailImage src={cards[openIndex].img} alt={cards[openIndex].title} />
            <div>
              <DetailTitle>{cards[openIndex].title}</DetailTitle>
              <DetailDescription>{cards[openIndex]?.description || ''}</DetailDescription>
              <DetailServe>{cards[openIndex]?.serve}</DetailServe>
              <div style={{ marginTop: 16 }}>
                <AddToCartButton onClick={handleAddToCartFromModal}>
                  Adicionar ao carrinho
                  {cards[openIndex]?.priceText ? ` - ${cards[openIndex].priceText}` : ''}
                </AddToCartButton>
              </div>
            </div>
          </DetailsCard>
        </Overlay>
      )}

      {cartOpen && (
        <CartOverlay onClick={() => setCartOpen(false)}>
          <CartPanel onClick={(e) => e.stopPropagation()}>
            <CartList>
              {cartItems.map((it, idx) => (
                <CartItem key={idx}>
                  <CartThumb src={it.img} alt={it.title} />
                  <CartName>{it.title}</CartName>
                  <CartPrice>{it.priceText}</CartPrice>
                  <TrashIcon
                    src="/assets/lixeira.png"
                    alt="Remover"
                    onClick={() => removeFromCart(idx)}
                  />
                </CartItem>
              ))}
            </CartList>

            {/* Espaço dinâmico: garante a posição base e faz descer conforme entram itens */}
            <Spacer h={spacerHeight} />

            <CartTotalRow>
              <span>Valor total</span>
              <span>{toBRL(cartTotal)}</span>
            </CartTotalRow>

            <ProceedButton>
              Continuar com a entrega
            </ProceedButton>
          </CartPanel>
        </CartOverlay>
      )}

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}
