import React from 'react';
import styled from 'styled-components';
import { colors, media, fonts } from 'shared/theme';

const StyledTab = styled.li.attrs(({ active }: { active?: boolean }) => {
  const style: any = {};
  if (active) {
    style.backgroundColor = colors.newDark;
  }
  return { style };
})<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  background-color: ${colors.superDarkGrey};
  color: ${colors.superLightGrey};
  padding: 16px;
  margin-right: 4px;
  text-transform: uppercase;
  font-size: 0.8em;
  font-family: ${fonts.Raleway};
  letter-spacing: 2px;

  &:hover {
    background-color: ${colors.newDark};
    cursor: pointer;
  }
  p {
    margin: 10px 0 0 0;
    @media (max-width: ${media.tablets}) {
      display: none;
    }
  }
  i {
    box-sizing: border-box;
    margin-right: 8px;
  }
`;

type Props = {
  label: string;
  icon?: string;
  active?: boolean;
  onClick: () => any;
};

export default function Tab(props: Props): JSX.Element {
  const { label, icon, active, onClick } = props;

  return (
    <StyledTab active={active} onClick={onClick}>
      {icon ? <i className={icon} /> : null}
      {label}
    </StyledTab>
  );
}
