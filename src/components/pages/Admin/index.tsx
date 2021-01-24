import React from 'react';
import { Flex, Wrapper, Spinner, Tabs } from 'shared/components';
import { TabType } from 'shared/components/layout/Tabs';
import AddBadge from './AddBadge';
import GiveBadge from './GiveBadge';

const adminTabs: TabType[] = [
  {
    label: 'Add new badge',
    icon: 'fas fa-award',
    panel: <AddBadge />,
  },
  {
    label: 'Give badge to user',
    icon: 'fas fa-medal',
    panel: <GiveBadge />,
  },
];

export default function PageAdmin(): JSX.Element {
  const admin = true;

  return (
    <Flex column>
      <Wrapper type="page">
        {admin ? <Tabs tabs={adminTabs} /> : <Spinner />}
      </Wrapper>
    </Flex>
  );
}
