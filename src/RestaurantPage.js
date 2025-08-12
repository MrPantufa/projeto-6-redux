// src/pages/RestaurantPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  position: relative;
  width: 1366px;
  margin: 0 auto;
  background: #FFF8F2;
  min-height: 1624px;
`;

const PageHeader = styled.div`
  position: absolute;
  width: 2031.812866px;
  height: 186px;
  top: -23px;
  left: 0;
  background: url('/assets/fundo.png') center/cover no-repeat;
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

const CartStatus = styled.span`
  position: absolute;
  width: 256px;
  height: 21px;
  top: 59px;
  left: 939px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  color: #E66767;
  text-align: right;
`;

const BannerImage = styled.img`
  position: absolute;
  width: 1366px;
  height: 280px;
  top: 162px;
  left: 0;
`;

const BannerTitle = styled.h3`
  position: absolute;
  width: 101px;
  height: 33.25px;
  top: 187px;
  left: 170px;
  margin: 0;
  font: 100 32px Roboto, sans-serif;
  line-height: 33.25px;
  color: #FFF;
`;

const RestaurantName = styled.h4`
  position: absolute;
  width: 676px;
  height: 33.25px;
  top: 376.75px;
  left: 170px;
  margin: 0;
  font: 900 32px Roboto, sans-serif;
  line-height: 33.25px;
  color: #FFF;
`;

// Container do menu (área branca)
const MenuContainer = styled.div`
  position: absolute;
  width: 1024px;
  height: 708px;
  top: 498px;
  left: 171px;
  background: #FFF;
  padding: 0;
  box-sizing: border-box;
`;

// Grid 3x2
const CardsWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 320px);
  grid-template-rows: repeat(2, 338px);
  column-gap: 16px;
  row-gap: 16px;
  justify-content: space-between;
  align-content: space-between;
`;

// Card
const OrderCard = styled.div`
  position: relative;
  width: 320px;
  height: 338px;
  background: #E66767;
  overflow: hidden;
`;

// Conteúdo do card (mantendo medidas)
const ProductImage = styled.img`
  position: absolute;
  width: 304px;
  height: 167px;
  top: 8px;
  left: 8px;
  object-fit: cover;
`;

const ProductTitle = styled.span`
  position: absolute;
  top: 183px;
  left: 8px;
  font: 900 16px Roboto, sans-serif;
  line-height: 19px;
  color: #FFEDB9;
  white-space: nowrap;
`;

const ProductDescription = styled.p`
  position: absolute;
  width: 304px;
  top: 210px;
  left: 8px;
  margin: 0;
  font: 400 14px Roboto, sans-serif;
  line-height: 22px;
  color: #FFEDB9;
`;

const OrderButtonBar = styled.button`
  position: absolute;
  width: 304px;
  height: 24px;
  top: 306px;
  left: 8px;
  background: #FFEDB9;
  border: 0;
  cursor: pointer;
`;

const OrderButtonLabel = styled.span`
  position: absolute;
  top: 4px;
  left: 83.24px;
  font: 700 14px Roboto, sans-serif;
  line-height: 16px;
  color: #E66767;
  white-space: nowrap;
`;

// Footer fixo conforme Figma
const FooterWrapper = styled.div`
  position: absolute;
  width: 1366px;
  height: 298px;
  top: 1326px;
  left: -1px;
  opacity: 1;
`;

/* ===== Modal de Compra ===== */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 720px;
  max-width: 90vw;
  background: #E66767;
  border: 2px solid #FFEDB9;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  color: #FFEDB9;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: 0;
  font-size: 18px;
  color: #FFEDB9;
  cursor: pointer;
`;

const ModalRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 16px;
`;

const ModalImg = styled.img`
  width: 200px;
  height: 180px;
  object-fit: cover;
  border: 1px solid #FFEDB9;
`;

const ModalTitle = styled.h5`
  margin: 0 0 8px 0;
  font: 900 20px Roboto, sans-serif;
  color: #FFEDB9;
`;

const ModalText = styled.p`
  margin: 0 0 8px 0;
  font: 400 14px Roboto, sans-serif;
  line-height: 20px;
`;

const ModalMeta = styled.div`
  margin-top: 8px;
  font: 700 14px Roboto, sans-serif;
`;

const ModalCTA = styled.button`
  margin-top: 12px;
  background: #FFEDB9;
  color: #E66767;
  font: 700 14px Roboto, sans-serif;
  border: 0;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

export default function RestaurantPage() {
  const { id } = useParams();

  // estados para dados via AJAX
  const [bannerTitle, setBannerTitle] = useState('Italiana');
  const [restaurantName, setRestaurantName] = useState('La Dolce Vita Trattoria');
  const [cards, setCards] = useState(
    Array.from({ length: 6 }).map(() => ({
      img: '/assets/pizza.png',
      title: 'Pizza Marguerita',
      description:
        'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
      price: undefined,
      portion: undefined
    }))
  );

  // Modal
  const [selected, setSelected] = useState(null); // {img,title,description,price,portion}

  // Fetch AJAX para preencher conteúdo
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        const json = await res.json();

        // tenta achar pelo slug == id; se não houver slug, normaliza pelo título
        const norm = (s) =>
          String(s || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');

        let restaurant =
          json.find((r) => r.slug ? r.slug === id : norm(r.titulo) === id) ||
          json.find((r) => norm(r.titulo) === id) ||
          null;

        // fallback: se não achou pelo id, mantém o comportamento italiano padrão
        if (!restaurant) return;

        // banner
        setBannerTitle(restaurant.tipo || bannerTitle);
        setRestaurantName(restaurant.titulo || restaurantName);

        // cardápio -> cards
        if (Array.isArray(restaurant.cardapio) && restaurant.cardapio.length) {
          const apiCards = restaurant.cardapio.slice(0, 6).map((item) => ({
            img: item.foto || '/assets/pizza.png',
            title: item.nome || '',
            description: item.descricao || '',
            price: item.preco,
            portion: item.porcao
          }));

          // regra pedida: no restaurante japonês (hioki-sushi) trocar SOMENTE a imagem para /assets/sushi.png
          if (id === 'hioki-sushi') {
            setBannerTitle('Japonesa');
            setRestaurantName('Hioki Sushi');
            setCards(
              apiCards.map((c) => ({
                ...c,
                img: '/assets/sushi.png'
              }))
            );
          } else {
            setCards(apiCards);
          }
        }
      } catch (e) {
        // em caso de erro, mantém os dados padrões
        console.error('Erro ao carregar restaurantes:', e);
      }
    };

    load();
  }, [id]);

  return (
    <PageContainer>
      <PageHeader>
        <Logo src="/assets/logo.png" alt="logo" />
        <HeaderLink to="/">Restaurantes</HeaderLink>
        <CartStatus>0 produto(s) no carrinho</CartStatus>
      </PageHeader>

      <BannerImage src="/assets/imagemfundo.png" alt="banner" />
      <BannerTitle>{bannerTitle}</BannerTitle>
      <RestaurantName>{restaurantName}</RestaurantName>

      <MenuContainer>
        <CardsWrapper>
          {cards.map(({ img, title, description, price, portion }, i) => (
            <OrderCard key={i}>
              <ProductImage src={img} alt={title} />
              <ProductTitle>{title}</ProductTitle>
              <ProductDescription>{description}</ProductDescription>

              {/* Botão abre a modal */}
              <OrderButtonBar onClick={() => setSelected({ img, title, description, price, portion })}>
                <OrderButtonLabel>Comprar o produto</OrderButtonLabel>
              </OrderButtonBar>
            </OrderCard>
          ))}
        </CardsWrapper>
      </MenuContainer>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>

      {/* Modal */}
      {selected && (
        <ModalOverlay onClick={() => setSelected(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <ModalClose onClick={() => setSelected(null)}>✖</ModalClose>
            <ModalRow>
              <ModalImg src={selected.img} alt={selected.title} />
              <div>
                <ModalTitle>{selected.title}</ModalTitle>
                <ModalText>{selected.description}</ModalText>
                {selected.portion && <ModalMeta>Porção: {selected.portion}</ModalMeta>}
                {selected.price !== undefined && (
                  <ModalMeta>Preço: R$ {Number(selected.price).toFixed(2).replace('.', ',')}</ModalMeta>
                )}
                <ModalCTA onClick={() => setSelected(null)}>Adicionar ao carrinho</ModalCTA>
              </div>
            </ModalRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}
