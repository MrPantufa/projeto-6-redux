// src/components/Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: relative;
  top: -24px;
  left: 0;
  width: 2031.8128662109375px;
  height: 384px;
  background-image: url('/assets/fundo.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(0deg);
  opacity: 1;
  z-index: 10;
`;

const Logo = styled.img`
  position: absolute;
  top: 40px;
  left: 621px;
  width: 125px;
  height: 57.5px;
  transform: rotate(0deg);
  opacity: 1;
`;

const BannerText = styled.div`
  position: absolute;
  top: 236px;
  left: 414px;
  width: 539px;
  height: 84px;
  background: transparent;
  transform: rotate(0deg);
  opacity: 1;

  /* preserva espaços e quebras como no Figma */
  white-space: pre;
  text-align: left;

  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #E66767;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo src="/assets/logo.png" alt="Logo" />
      <BannerText>
{` Viva experiências gastronômicas
       no conforto da sua casa`}
      </BannerText>
    </HeaderWrapper>
  );
}
