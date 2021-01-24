import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'shared/theme';
import Tab from './Tab';

export type TabType = {
  label: string;
  icon?: string;
  panel: JSX.Element;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;
const Nav = styled.ul`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: ${colors.newDark};
`;
const Panel = styled.div``;

type Props = {
  tabs: TabType[];
};

export default function Tabs(props: Props): JSX.Element {
  const { tabs } = props;
  const [activeTab, setActiveTab] = useState(0);

  const tabHeaders = tabs.map((tab: TabType, index: number) => (
    <Tabs.Tab
      active={index === activeTab}
      icon={tab.icon}
      label={tab.label}
      onClick={() => setActiveTab(index)}
      key={`tab-${index}-${tab.label.replace(' ', '-')}`}
    />
  ));
  const activePanel = tabs[activeTab]?.panel ?? null;

  return (
    <Wrapper>
      <Tabs.Nav>{tabHeaders}</Tabs.Nav>
      <Tabs.Panel>{activePanel}</Tabs.Panel>
    </Wrapper>
  );
}

Tabs.Nav = Nav; // ul
Tabs.Tab = Tab; // li
Tabs.Panel = Panel; //div
