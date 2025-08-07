// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

const HomeWrapper = styled.div`
  position: relative;
  width: 1366px;
  height: 2148px;
  background: #FFF8F2;
  margin: 0 auto;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 440px;
  left: 171px;
  width: 1024px;
  height: 1290px;
  border: 1px solid #E66767;
  box-sizing: border-box;
  transform: rotate(0deg);
  opacity: 1;

  display: grid;
  grid-template-columns: repeat(2, 472px);
  grid-auto-rows: 398px;
  column-gap: 32px;
  row-gap: 32px;
  padding: 16px;
`;

export default function Home() {
  const restaurants = [
    {
      imgSrc: '/assets/sushi.png',
      title: 'Hioki Sushi',
      description: `Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.
Experimente o Japão sem sair do lar com nosso delivery!`,
      rating: '4.9',
      highlightText: 'Destaque da semana',
      categoryText: 'Japonesa',
    },
    {
      imgSrc: '/assets/macarrao.png',
      title: 'La Dolce Vita Trattoria',
      description: `A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!`,
      rating: '4.6',
      
      categoryText: 'Italiana',
    },
    {
      imgSrc: '/assets/macarrao.png',
      title: 'La Dolce Vita Trattoria',
      description:
        'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
      rating: '4.6',
     
      categoryText: 'Italiana',
    },
    {
      imgSrc: '/assets/macarrao.png',
      title: 'La Dolce Vita Trattoria',
      description: `A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!`,
      rating: '4.6',
      
      categoryText: 'Italiana',
    },
    {
      imgSrc: '/assets/macarrao.png',
      title: 'La Dolce Vita Trattoria',
      description:
        'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
      rating: '4.6',
      
      categoryText: 'Italiana',
    },
    {
      imgSrc: '/assets/macarrao.png',
      title: 'La Dolce Vita Trattoria',
      description: `A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!`,
      rating: '4.6',
      
      categoryText: 'Italiana',
    },
  ];

  return (
    <HomeWrapper>
      <Header />
      <MenuContainer>
        {restaurants.map((r, idx) => (
          <RestaurantCard
            key={idx}
            imgSrc={r.imgSrc}
            title={r.title}
            description={r.description}
            rating={r.rating}
            highlightText={r.highlightText}
            categoryText={r.categoryText}
            showHighlight={idx === 0}
          />
        ))}
      </MenuContainer>
      <Footer />
    </HomeWrapper>
  );
}
