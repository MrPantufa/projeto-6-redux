import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

/* ====== ESTILOS ====== */
const PageContainer = styled.div`
  position: relative;
  width: 1366px;
  margin: 0 auto;
  background: #FFF8F2;
  min-height: 1624px;
`;

const PageHeader = styled.div`
  position: relative;
  width: 1366px;
  height: 136px;
  background: url('/assets/fundo.png') no-repeat center/cover;
`;

const Logo = styled.img`
  position: absolute;
  width: 125px;
  height: 57.5px;
  top: 40px;
  left: 621px;
`;

const HeaderLink = styled(Link)`
  all: unset;
  position: absolute;
  width: 109px;
  height: 21px;
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
`;

const BannerImage = styled.img`
  position: absolute;
  width: 1366px;
  height: 280px;
  top: 136px;
  left: 0;
  object-fit: cover;
`;

const BannerTitle = styled.h1`
  position: absolute;
  top: 228px;
  left: 171px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 32px;
  line-height: 38px;
  color: #FFFFFF;
  text-transform: lowercase;
`;

const MenuContainer = styled.div`
  position: relative;
  top: 416px;
  width: 1024px;
  margin: 0 auto 80px;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 32px;
`;

/* === CARD DE CADA PRATO (MENU) === */
const OrderCard = styled.div`
  position: relative;
  width: 320px;
  height: 338px;
  background: #E66767;
  border: 1px solid #E66767;
  padding: 8px;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

/* BOTÃO PADRÃO DEFINIDO */
const OrderButtonBar = styled.button`
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

const OrderButtonLabel = styled.span`
  font-size: 14px;
`;

/* ---------- OVERLAY e MODAL ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
  z-index: 1000;
`;

const DetailsCard = styled.div`
  width: 1024px;
  min-height: 344px;
  background: #E66767;
  border: 1px solid #E66767;
  position: relative;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  padding: 24px;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
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

const DetailTitle = styled.h3`
  margin: 0 0 8px;
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

/* BOTÃO DO MODAL NO PADRÃO DEFINIDO */
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

/* ====== HELPERS ====== */
// helper simples para formatar em Real
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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        const json = await res.json();
        const restaurantes = Array.isArray(json) ? json : json?.restaurantes || [];
        let found = restaurantes.find((r) => normalizeSlug(r.slug) === slugParam) || restaurantes[0];

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
        <CartStatus>0 produto(s) no carrinho</CartStatus>
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
              <OrderButtonBar onClick={() => setOpenIndex(i)}>
                <OrderButtonLabel>Adicionar ao carrinho</OrderButtonLabel>
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
                <AddToCartButton>
                  Adicionar ao carrinho
                  {cards[openIndex]?.priceText ? ` - ${cards[openIndex].priceText}` : ''}
                </AddToCartButton>
              </div>
            </div>
          </DetailsCard>
        </Overlay>
      )}

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}
