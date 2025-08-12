// src/pages/RestaurantPage.js
import React, { useEffect, useMemo, useState } from 'react';
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

  /* evita invadir o botão */
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

/* ---------- OVERLAY e MODAL ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const DetailsCard = styled.div`
  position: fixed;
  width: 1024px;
  height: 344px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #E66767;
  opacity: 1;
  z-index: 1001;
`;

const DetailImage = styled.img`
  position: absolute;
  width: 280px;
  height: 280px;
  top: 32px;
  left: 32px;
  object-fit: cover;
`;

const DetailTitle = styled.h3`
  position: absolute;
  top: 32px;
  left: 336px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
  text-align: center;
  white-space: nowrap;
  width: auto;
  max-width: 640px;
  overflow: visible;
`;

const DetailDescription = styled.p`
  position: absolute;
  width: 656px;
  height: 176px;
  top: 70px;
  left: 336px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  overflow: hidden;
  white-space: pre-line; /* mantém a quebra antes do "Serve:" */
`;

/* Botão — 218x24, fundo #FFEBD9 */
const AddToCartButton = styled.button`
  position: absolute;
  top: 260px;  /* logo abaixo do texto */
  left: 336px;
  width: 218px;
  height: 24px;
  background-color: #FFEBD9;
  border: none;
  padding: 0;
  cursor: pointer;
`;

/* Texto interno — 204x16, top:4px; left:7px; Roboto 700 14px; 1 linha; central; sem corte */
const AddToCartText = styled.span`
  position: absolute;
  top: 4px;
  left: 7px; /* ~6.95px do Figma */
  width: 204px;
  height: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px; /* 100% */
  color: #E66767;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
/* ---------- FIM OVERLAY/MODAL ---------- */

const FooterWrapper = styled.div`
  position: absolute;
  width: 1366px;
  height: 298px;
  top: 1326px;
  left: -1px;
  opacity: 1;
`;
/* ====== FIM ESTILOS ====== */

/* Helpers de slug e moeda */
const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeSlug = (value) => slugify(decodeURIComponent(String(value || '')));
const toBRL = (v) =>
  typeof v === 'number'
    ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : v;

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
  const [openIndex, setOpenIndex] = useState(null); // <- controla a modal

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const res = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        const json = await res.json();
        const restaurantes = Array.isArray(json) ? json : json?.restaurantes || [];

        // match robusto por slug do objeto ou slug do título
        let found =
          restaurantes.find((r) => r.slug && normalizeSlug(r.slug) === slugParam) ||
          restaurantes.find((r) => normalizeSlug(r.titulo) === slugParam);

        // fallback: parecido
        if (!found) {
          found = restaurantes.find((r) => normalizeSlug(r.titulo).includes(slugParam));
        }

        // fallback: primeiro restaurante (evita tela vazia)
        if (!found) found = restaurantes[0];

        if (!cancel && found) {
          setBannerTitle(found.tipo || '');
          setRestaurantName(found.titulo || '');

          const items = (found.cardapio || []).map((item) => ({
            img: item.foto,
            title: item.nome,
            description: item.descricao || '',
            serve: item.porcao || 'Serve: de 2 a 3 pessoas',
            priceNumber: typeof item.preco === 'number' ? item.preco : null,
            priceText:
              typeof item.preco === 'number' ? toBRL(item.preco) : 'R$ 60,90'
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

  // Descrição longa conforme tipo + serve do item aberto
  const detalheDescricao = useMemo(() => {
    if (!cards.length || openIndex === null) return '';
    const serveText = cards[openIndex]?.serve || 'Serve: de 2 a 3 pessoas';
    const isJaponesa = String(bannerTitle || '').toLowerCase().includes('jap');

    const base = isJaponesa
      ? 'Um combinado de sushi clássico preparado com peixes frescos e arroz temperado no ponto ideal. Texturas delicadas e equilíbrio entre doce, ácido e umami, realçados por shoyu suave, wasabi e gengibre. Uma escolha versátil que agrada iniciantes e apreciadores da culinária japonesa.'
      : 'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.';

    return `${base}\n\n${serveText}`;
  }, [bannerTitle, cards, openIndex]);

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

              {/* Botão abre a modal */}
              <OrderButtonBar onClick={() => setOpenIndex(i)}>
                <OrderButtonLabel>Mais Detalhes</OrderButtonLabel>
              </OrderButtonBar>
            </OrderCard>
          ))}
        </CardsWrapper>
      </MenuContainer>

      {/* Modal em sobreposição */}
      {openIndex !== null && cards[openIndex] && (
        <Overlay>
          <DetailsCard>
            <CloseIcon
              src="/assets/close.png"
              alt="Fechar"
              onClick={() => setOpenIndex(null)}
            />

            <DetailImage
              src={cards[openIndex].img}
              alt={cards[openIndex].title}
            />

            <DetailTitle>{cards[openIndex].title}</DetailTitle>

            <DetailDescription>{detalheDescricao}</DetailDescription>

            <AddToCartButton>
              <AddToCartText>
                Adicionar ao carrinho - {cards[openIndex].priceText || 'R$ 60,90'}
              </AddToCartText>
            </AddToCartButton>
          </DetailsCard>
        </Overlay>
      )}

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}
