// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: absolute;
  top: 1850px;
  left: 0;
  width: 1366px;
  height: 298px;
  background-image: url('/assets/footer.png');
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(0deg);
  opacity: 1;
`;

const Logo = styled.img`
  position: absolute;
  top: 40px;      /* 1890px – 1850px = 40px */
  left: 621px;
  width: 125px;
  height: 57.5px;
  transform: rotate(0deg);
  opacity: 1;
`;

const Socials = styled.img`
  position: absolute;
  top: 130px;     /* 1980px – 1850px = 130px */
  left: 639px;
  width: 88px;
  height: 24px;
  transform: rotate(0deg);
  opacity: 1;
`;

const Disclaimer = styled.div`
  position: absolute;
  top: 234px;     /* 2084px – 1850px = 234px */
  left: 444px;
  width: 480px;
  height: 24px;
  transform: rotate(0deg);
  opacity: 1;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  color: #E66767;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Logo src="/assets/logo.png" alt="Logo" />
      <Socials src="/assets/redes sociais.png" alt="Redes Sociais" />
      <Disclaimer>
        A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
      </Disclaimer>
    </FooterWrapper>
  );
}
