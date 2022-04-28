import React from 'react';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';
import UnstyledButton from '../UnstyledButton';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <ImageOverlay>
            <Backdrop></Backdrop>
            <AddCartButton>Add to cart</AddCartButton>
          </ImageOverlay>
        </ImageWrapper>
        {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
        {variant === 'new-release' && <NewFlag>Just released!</NewFlag>}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color':
                variant === 'on-sale' ? 'var(--color-gray-700)' : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
  transition: transform 0.3s;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    ${Link}:hover &, ${Link}:focus & {
      transform: perspective(600px) rotateY(-30deg);
    }
  }
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
  position: relative;
`;

const ImageOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  will-change: transform;
  transform: translateY(-100%);
  display: grid;
  place-content: center;
  transition: 250ms ease-out;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    ${Link}:hover &, ${Link}:focus & {
      transform: translateY(0);
    }
  }
`;

const AddCartButton = styled(UnstyledButton)`
  color: white;
  border: 2px solid white;
  padding: 8px 16px;
  position: relative;
  text-transform: uppercase;
  font-size: 0.675rem;
  font-weight: 600;
  letter-spacing: 2px;
`;

const Backdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: black;
  opacity: 0;
  will-change: opacity;
  transition: 250ms ease;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    ${Link}:hover &, ${Link}:focus & {
      opacity: 0.7;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  transition: transform 350ms ease-in;
  will-change: transform; // prevent flicker, makes animation smoother
  transform-origin: 50% 75%; // set transform origin to center of shoe
  display: block; // prevent extra magic space below image

  // with hover-query this one does not apply to mobile devices
  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    ${Link}:hover &, ${Link}:focus & {
      transform: scale(1.1);
      transition: transform 150ms ease-out;
    }
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
  overflow: hidden;

  &::after {
    background: #fff;
    content: '';
    height: 155px;
    top: -50px;
    left: -75px;
    opacity: 0.2;
    position: absolute;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    transition-delay: 0ms;
    width: 50px;
    z-index: 1;

    @media (hover: hover) and (prefers-reduced-motion: no-preference) {
      ${Link}:hover &, ${Link}:focus & {
        left: 120%;
        transition-delay: 250ms;
      }
    }
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
