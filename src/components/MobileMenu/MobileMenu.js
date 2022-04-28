/* eslint-disable no-unused-vars */
import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const MIN_DELAY = 500;
const getDelay = (index) => ({
  '--transition-delay': MIN_DELAY + (index + 1) * 100 + 'ms'
});

const NavLinks = [
  { link: '/sale', text: 'Sale' },
  { link: '/new', text: 'New&nbsp;Releases' },
  { link: '/men', text: 'Men' },
  { link: '/women', text: 'Women' },
  { link: '/kids', text: 'New&nbsp;Releases' },
  { link: '/collections', text: 'Collections' }
];

const SubLinks = [
  { link: '/terms', text: 'Terms and Conditions' },
  { link: '/privacy', text: 'Privacy Policys' },
  { link: '/contact', text: 'Contact Us' }
];

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Wrapper isOpen={isOpen} onDismiss={onDismiss}>
      <Backdrop />
      <Content aria-label="Menu">
        <ContentWrapper>
          <CloseButton style={getDelay(-1)} onClick={onDismiss}>
            <Icon id="close" />
            <VisuallyHidden>Dismiss menu</VisuallyHidden>
          </CloseButton>
          <Filler />
          <Nav>
            {NavLinks.map((link, index) => (
              <NavLink
                key={'navlink_' + index}
                href={link.link}
                dangerouslySetInnerHTML={{ __html: link.text }}
                style={getDelay(index)}
              ></NavLink>
            ))}
          </Nav>
          <Footer>
            {SubLinks.map((link, index) => (
              <SubLink
                key={'sublink_' + index}
                href={link.link}
                dangerouslySetInnerHTML={{ __html: link.text }}
                style={getDelay(index + NavLinks.length)}
              ></SubLink>
            ))}
          </Footer>
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
const slideInX = keyframes`
  from {
    transform: translateX(100%)
  }
  to {
    transform: translateX(0)
  }
`;
const slideInY = keyframes`
  from {
    opacity: 0;
    transform: translateY(-200%)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

const slideInYAnimationStyles = css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideInY} 300ms both cubic-bezier(0, 0.6, 0.32, 1.06);
    animation-delay: var(--transition-delay);
  }
`;

const Wrapper = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  animation: ${fadeIn} 500ms;
`;

const Content = styled(DialogContent)`
  --overfill: 16px;

  position: relative;
  background: white;
  width: calc(300px + var(--overfill));
  height: 100%;
  margin-right: calc(-1 * var(--overfill));
  padding: 24px 32px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideInX} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
    animation-delay: 200ms;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 800ms both ${MIN_DELAY + 'ms'};
`;
const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: var(--overfill);
  padding: 16px;
  ${slideInYAnimationStyles}
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;
  ${slideInYAnimationStyles}

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
  ${slideInYAnimationStyles}
`;

export default MobileMenu;
