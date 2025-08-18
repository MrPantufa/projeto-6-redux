// src/components/RestaurantCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  width: 472px;
  height: 398px;
  border: 1px solid #E66767;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  background: #FFFFFF;
`;

const RestaurantImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 472px;
  height: 217px;
  object-fit: cover;
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
  top: 232px;
  left: 8px;
  width: 456px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  color: #E66767;
`;

const RatingText = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #E66767;
  margin-right: 4px;
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 16px;        /* alinhamento conforme Figma */
  bottom: 16px;      /* fixa no rodapé do card */
  width: 82px;       /* conforme Figma */
  height: 24px;      /* conforme Figma */
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
  imgSrc,
  title,
  description,
  rating,
  highlightText,
  categoryText,
  slug,
  showHighlight
}) {
  return (
    <Card>
      <RestaurantImage src={imgSrc} alt={title} />

      {showHighlight && (
        <HighlightBadge>
          <HighlightText>{highlightText || 'Destaque'}</HighlightText>
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

      <Link to={`/restaurant/${slug}`} style={{ textDecoration: 'none' }}>
        <ButtonWrapper>
          <ButtonText>Saiba mais</ButtonText>
        </ButtonWrapper>
      </Link>
    </Card>
  );
}
