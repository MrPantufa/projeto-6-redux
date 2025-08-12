// src/pages/RestaurantPage.js
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
  width: auto;
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
  width: auto;
  height: 33.25px;
  top: 376.75px;
  left: 170px;
  margin: 0;
  font: 900 32px Roboto, sans-serif;
  line-height: 33.25px;
  color: #FFF;
`;

const MenuContainer = styled.div`
  position: absolute;
  width: 1024px;
  top: 498px;
  left: 171px;
  background: #FFF;
  padding: 0;
  box-sizing: border-box;
`;

const CardsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 320px);
  grid-auto-rows: 338px;
  gap: 16px;
`;

const OrderCard = styled.div`
  position: relative;
  width: 320px;
  height: 338px;
  background: #E66767;
  overflow: hidden;
`;

const ProductImage = styled.img`
  position: absolute;
  width: 304px;
  height: 167px;
  top: 8px;
  left: 8px;
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const OrderButtonBar = styled.div`
  position: absolute;
  width: 304px;
  height: 24px;
  bottom: 8px;
  left: 8px;
  background: #FFEDB9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const OrderButtonLabel = styled.span`
  font: 700 14px Roboto, sans-serif;
  line-height: 16px;
  color: #E66767;
  white-space: nowrap;
`;

const FooterWrapper = styled.div`
  position: absolute;
  width: 1366px;
  height: 298px;
  top: 1326px;
  left: -1px;
  opacity: 1;
`;
/* ====== FIM ESTILOS ====== */

/* Helpers de slug */
const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeSlug = (value) => slugify(decodeURIComponent(String(value || '')));

export default function RestaurantPage() {
  const params = useParams();
  const slugParam = normalizeSlug(
    params.id ||
      params.slug ||
      params.restaurant ||
      params.nome ||
      params.restaurante ||
      Object.values(params)[0]
  );

  const [bannerTitle, setBannerTitle] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const res = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        const json = await res.json();

        // A API pode vir como { restaurantes: [...] } ou como []
        const restaurantes = Array.isArray(json) ? json : json?.restaurantes || [];

        // 1) tenta por r.slug
        let found =
          restaurantes.find((r) => r.slug && normalizeSlug(r.slug) === slugParam);

        // 2) tenta por título exato normalizado
        if (!found) {
          found = restaurantes.find((r) => normalizeSlug(r.titulo) === slugParam);
        }

        // 3) tenta "parecido" (includes) — ajuda com variações de hífen/acentos
        if (!found) {
          found = restaurantes.find((r) =>
            normalizeSlug(r.titulo).includes(slugParam)
          );
        }

        // 4) fallback: usa o primeiro para não ficar vazio
        if (!found) {
          found = restaurantes[0];
        }

        if (!cancel && found) {
          setBannerTitle(found.tipo || '');
          setRestaurantName(found.titulo || '');

          const items = (found.cardapio || []).map((item) => ({
            img: item.foto,
            title: item.nome,
            description: item.descricao
          }));

          setCards(items);
        }
      } catch (e) {
        if (!cancel) {
          setBannerTitle('');
          setRestaurantName('');
          setCards([]);
        }
      }
    }

    load();
    return () => {
      cancel = true;
    };
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
      <RestaurantName>{restaurantName}</RestaurantName>

      <MenuContainer>
        <CardsWrapper>
          {cards.map(({ img, title, description }, i) => (
            <OrderCard key={i}>
              <ProductImage src={img} alt={title} />
              <ProductTitle>{title}</ProductTitle>
              <ProductDescription>{description}</ProductDescription>
              <OrderButtonBar>
                <OrderButtonLabel>Mais Detalhes</OrderButtonLabel>
              </OrderButtonBar>
            </OrderCard>
          ))}
        </CardsWrapper>
      </MenuContainer>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}
