import React from 'react';
import styled from 'styled-components';

import { WEIGHTS } from '../../constants';

const NavLink = ({ children, ...delegated }) => {
  return (
    <Wrapper {...delegated}>
      <MainText data-hover={children}>{children}</MainText>
      <HoverText data-hover={children}>{children}</HoverText>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  --hover-border-width: 2px;

  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  position: relative;
  overflow: hidden; // hide hover text below

  // show borders of hover effect
  padding: var(--hover-border-width);
  margin: calc(-1 * var(--hover-border-width));

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Text = styled.span`
  display: block;
  transform: translateY(0);
  position: relative;
  transition: transform 500ms;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    max-width: 0;
    border-bottom: var(--hover-border-width) solid var(--color-primary);
    color: var(--color-primary);
    content: attr(data-hover);
    -webkit-transition: max-width 0.5s;
    -moz-transition: max-width 0.5s;
    transition: max-width 0.3s ease-out;
    transition-delay: 150ms;

    @media (prefers-reduced-motion: no-preference) {
      ${Wrapper}:hover & {
        max-width: 100%;
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    ${Wrapper}:hover & {
      transform: translateY(-100%);
      transition: transform 150ms;
    }
  }
`;

const MainText = styled(Text)``;

const HoverText = styled(Text)`
  position: absolute;
  font-weight: ${WEIGHTS.bold};
`;

export default NavLink;
