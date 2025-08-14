// src/pages/Home.js
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

const HomeWrapper = styled.div`
  position: relative;
  width: 1366px;
  min-height: 100vh;
  background: #FFF8F2;
  margin: 0 auto;
`;

const MenuContainer = styled.div`
  position: relative;
  width: 1024px;
  margin: 0 auto;
  padding: 32px 16px;
  display: grid;
  grid-template-columns: repeat(2, 472px);
  grid-auto-rows: 398px;
  column-gap: 32px;
  row-gap: 32px;
`;

function normalizeSlug(v = '') {
  return String(v)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        const res = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        const json = await res.json();
        const data = Array.isArray(json) ? json : json?.restaurantes || [];
        if (!cancel) setRestaurants(data);
      } catch {
        if (!cancel) setRestaurants([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    load();
    return () => { cancel = true; };
  }, []);

  const items = useMemo(() => {
    return restaurants.map((r) => ({
      imgSrc: r.capa,
      title: r.titulo,
      description: r.descricao || '',
      rating: r.avaliacao,
      highlightText: r.destacado ? 'Destaque da semana' : '',
      categoryText: r.tipo,
      slug: r.slug ? normalizeSlug(r.slug) : normalizeSlug(r.titulo || '')
    }));
  }, [restaurants]);

  return (
    <HomeWrapper>
      <Header />
      <MenuContainer>
        {!loading && items.map((r, idx) => (
          <RestaurantCard
            key={r.slug || idx}
            imgSrc={r.imgSrc}
            title={r.title}
            description={r.description}
            rating={r.rating}
            highlightText={r.highlightText}
            categoryText={r.categoryText}
            slug={r.slug}
            showHighlight={idx === 0}
          />
        ))}
      </MenuContainer>
      <Footer />
    </HomeWrapper>
  );
}
