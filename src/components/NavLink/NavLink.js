import React from 'react';
import styled from 'styled-components';

import { WEIGHTS } from '../../constants';

const NavLink = ({ children, ...delegated }) => {
  return (
    <Wrapper {...delegated}>
      <MainText>{children}</MainText>
      <HoverText>{children}</HoverText>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  position: relative;
  overflow: hidden; // hide hover text below

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Text = styled.span`
  display: block;
  transform: translateY(0);
  transition: transform 500ms;

  @media (prefers-reduced-motion: no-preference) {
    ${Wrapper}:hover & {
      transform: translateY(-100%);
      transition: transform 250ms;
    }
  }
`;

const MainText = styled(Text)``;

const HoverText = styled(Text)`
  position: absolute;
  font-weight: ${WEIGHTS.bold};
`;

export default NavLink;
