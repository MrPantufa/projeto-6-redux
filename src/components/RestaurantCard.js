// src/components/RestaurantCard.js
import React from 'react';
import { Link } from 'react-router-dom';       // ✅ importe Link
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  width: 472px;
  height: 398px;
  border: 1px solid #E66767;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
`;

const RestaurantImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 472px;
  height: 217px;
  object-fit: cover;
`;

const CardBackground = styled.div`
  position: absolute;
  top: 217px;
  left: 0;
  width: 472px;
  height: 181px;
  background: #FFFFFF;
  border: 1px solid #E66767;
  border-top: none;
  box-sizing: border-box;
`;

const HighlightBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 266px;
  width: 121px;
  height: 26px;
  background: #E66767;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HighlightText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 395px;
  width: 61px;
  height: 26px;
  background: #E66767;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
`;

const TitleRatingRow = styled.div`
  position: absolute;
  top: 225px;
  left: 8px;
  width: 456px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #E66767;
`;

const RatingText = styled.span`
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  color: #E66767;
`;

const Star = styled.img`
  width: 21px;
  height: 21px;
`;

const Description = styled.p`
  position: absolute;
  top: 262px;
  left: 8px;
  width: 456px;
  height: 88px;
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #E66767;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 366px;
  left: 8px;
  width: 82px;
  height: 24px;
  background: #E66767;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
`;

export default function RestaurantCard({
  imgSrc = "/assets/sushi.png",
  title = 'Hioki Sushi',
  description = '',
  rating = '0.0',
  highlightText = 'Destaque',
  categoryText = '',
  showHighlight = false,
}) {
  // cria o slug a partir do título
  const slug = encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase());

  return (
    <Card>
      <RestaurantImage src={imgSrc} alt={title} />
      <CardBackground />
      {showHighlight && (
        <HighlightBadge>
          <HighlightText>{highlightText}</HighlightText>
        </HighlightBadge>
      )}
      <CategoryBadge>
        <CategoryText>{categoryText}</CategoryText>
      </CategoryBadge>
      <TitleRatingRow>
        <Title>{title}</Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <RatingText>{rating}</RatingText>
          <Star src="/assets/estrela.png" alt="Estrela" />
        </div>
      </TitleRatingRow>
      <Description>{description}</Description>

      {/* Aqui envolvemos o botão no Link para /restaurant/:id */}
      <Link to={`/restaurant/${slug}`} style={{ textDecoration: 'none' }}>
        <ButtonWrapper>
          <ButtonText>Saiba mais</ButtonText>
        </ButtonWrapper>
      </Link>
    </Card>
  );
}
