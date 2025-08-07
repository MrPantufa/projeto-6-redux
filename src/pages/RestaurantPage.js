// src/pages/RestaurantPage.js
import React from 'react';
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
`;

const OrderButtonBar = styled.div`
  position: absolute;
  width: 304px;
  height: 24px;
  top: 306px;
  left: 8px;
  background: #FFEDB9;
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

const FooterWrapper = styled.div`
  position: absolute;
  width: 1366px;
  height: 298px;
  top: 1326px;
  left: -1px;
  opacity: 1;
`;

export default function RestaurantPage() {
  const { id } = useParams();

  // Dados padrões para o italiano
  let bannerTitle = 'Italiana';
  let restaurantName = 'La Dolce Vita Trattoria';
  let cards = Array.from({ length: 6 }).map(() => ({
    img: '/assets/pizza.png',
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
  }));

  // Se for o Hioki Sushi (id === 'hioki-sushi'), sobrepor apenas imagem, título e descrição
  if (id === 'hioki-sushi') {
    bannerTitle = 'Japonesa';
    restaurantName = 'Hioki Sushi';
    cards = Array.from({ length: 6 }).map(() => ({
      img: '/assets/sushi.png',
      title: 'Sushi Tradicional',
      description:
        'Delicado sushi de salmão fresco com arroz temperado, wasabi e gengibre. Uma explosão de sabor à moda japonesa!',
    }));
  }

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
                <OrderButtonLabel>Adicionar ao carrinho</OrderButtonLabel>
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
