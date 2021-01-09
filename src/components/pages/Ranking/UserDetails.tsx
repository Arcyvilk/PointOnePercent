import React from 'react';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash';
import { useUserDetails } from 'components/init';
import { Spinner } from 'shared/components';
import { Display, DetailsSummary, RatingScore } from './styles';
import UserGame from './UserGame';

type TUserDetails = {
  id: any;
  show: any;
};

UserDetails.Display = Display;
UserDetails.DetailsSummary = DetailsSummary;
UserDetails.RatingScore = RatingScore;

export default function UserDetails(props: TUserDetails): JSX.Element {
  const { id, show } = props;
  const userLoaded = useUserDetails(id);
  const rating = useSelector((state: any) => state.rating);
  // const badges = useSelector((state: any) => state.badges);
  const games = useSelector((state: any) => state.games.list);
  const user = useSelector((state: any) => {
    const userBasic = state.users.list.find((user: any) => user.id === id);
    const userGames = state.users.details.find((user: any) => user.id === id)
      ?.games;
    const userRanking = state.ranking.find((user: any) => user.id === id);
    return {
      ...userBasic,
      games: userGames,
      ranking: userRanking,
    };
  });

  // const summarizeBadgePoints = (user: any, badges: any) => {
  //   let sum = 0;
  //   user.badges.map((badge: any) => {
  //     const usersBadge = badges.find((b: any) => badge.id === b['_id']); // TODO equality
  //     if (usersBadge) {
  //       if (typeof usersBadge.points !== 'number') {
  //         usersBadge.points = parseInt(usersBadge.points);
  //       }
  //       sum += usersBadge.points;
  //     }
  //   });
  //   return sum;
  // };

  const composeGameList = () => {
    const userGames = orderBy(
      user.games.map((game: any) => ({
        ...game,
        percentage: typeof game.percentage !== 'number' ? 0 : game.percentage,
      })),
      ['percentage', 'lastUnlocked'],
      ['desc', 'desc'],
    );

    console.log(userGames);
    return userGames.map(game => {
      const gameDetails = games.find(
        (g: any) => Number(g.id) === Number(game.id),
      );
      if (!gameDetails) {
        // most likely non-steam game, or deleted one
        return;
      }
      const ratingIcon = rating.find((r: any) => r.id === gameDetails.rating);
      return (
        <UserGame
          key={`game-${game.id}`}
          game={{
            ...game,
            title: gameDetails.title,
            rating: ratingIcon ? ratingIcon.icon : 'fas fa-spinner',
            img: gameDetails.img,
          }}
        />
      );
    });
  };

  return userLoaded ? (
    <UserDetails.Display show={show}>
      {/* <UserDetails.Summary>
        <UserDetails.RatingScore title="Sum of all points">
          {user.points ? user.points : 0}
          <span className="bold"> Σ</span>
        </UserDetails.RatingScore>
        {rating.map((score: any, scoreIndex: number) => {
          return (
            <UserDetails.RatingScore key={`user-rating-score-${scoreIndex}`}>
              {user.ranking[score.id] !== undefined
                ? user.ranking[score.id]
                : 0}
              <i className={score.icon} style={{ paddingRight: '5px' }} />
            </UserDetails.RatingScore>
          );
        })}
        <UserDetails.RatingScore title="Sum of points for badges">
          {summarizeBadgePoints(user, badges)}
          <i className="fas fa-medal" style={{ paddingRight: '5px' }} />
        </UserDetails.RatingScore>
      </UserDetails.Summary> */}
      {composeGameList()}
    </UserDetails.Display>
  ) : (
    <Spinner />
  );
}