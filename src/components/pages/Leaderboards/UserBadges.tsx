import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Flex } from 'shared/components';

const StyledFlex = styled(Flex)`
  & > * {
    margin-right: 4px;
  }
  &:first-child {
    margin-left: 4px;
  }
`;
const Badge = styled.img`
  max-width: 24px;
  max-height: 24px;
  border: 3px solid black;
  border-radius: 3px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default function UserBadges(props: {
  user: any;
  game: any;
}): JSX.Element {
  const { user, game } = props;

  const badges = useSelector((state: any) =>
    state.badges.filter(
      (badge: any) =>
        game?.badges?.includes(badge['_id']) &&
        user?.badges?.includes(badge['_id']),
    ),
  );

  const mappedBadges = badges.map((badge: any) => {
    const title = `${badge.name} (${badge.points} pts)\n"${badge.description}"`;
    return (
      <Badge
        src={badge.img}
        alt={badge._id}
        key={`img-badge-${badge._id}`}
        title={title}
      />
    );
  });

  return <StyledFlex>{mappedBadges}</StyledFlex>;
}
