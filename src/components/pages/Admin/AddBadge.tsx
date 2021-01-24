import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors, fonts } from 'shared/theme';
import { Flex, Wrapper, CustomButton } from 'shared/components';

// game - from list
// badge name
// image
// points - just numbers
// requirements - screenshot / video / none / achievement
// description

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  p {
    width: 30%;
    box-sizing: border-box;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.9em;
    list-style-type: disc;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: none;
  background-color: ${colors.newDark};
  color: ${colors.superLightGrey};
  font-size: 1.1em;
  font-weight: normal;
  font-family: ${fonts.Dosis};

  &:focus {
    border-radius: 0;
    outline-color: ${colors.lightGrey};
    outline-style: solid;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  padding: 4px 8px;
  border: none;
  background-color: ${colors.newDark};
  color: ${colors.superLightGrey};
  font-size: 1.1em;
  font-weight: normal;
  font-family: ${fonts.Dosis};

  &:focus {
    border-radius: 0;
    outline-color: ${colors.lightGrey};
    outline-style: solid;
  }
`;
const FileInput = styled.input`
  .file-upload-button {
    background-color: black;
  }
`;
const BadgeImage = styled.img`
  width: 256px;
  height: 256px;
`;

export default function AddBadge(): JSX.Element {
  const [gameId, setGameId] = useState(undefined as any);
  const [nonSteam, setNonSteam] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);
  const [img, setImg] = useState(undefined as undefined | string);
  const [requirements, setRequirements] = useState({
    screenshot: false,
    video: false,
    achievement: false,
  });

  const games = useSelector((state: any) => state.games.list);

  const gameOptions = games
    ? games.map((game: any) => {
        return (
          <option
            key={`select-option-game-${game?.id}`}
            value={game?.title ?? 'UNKNOWN'}
            data-value={game?.id ?? 'dupa'}>
            {game?.title ?? 'UNKNOWN'}
          </option>
        );
      })
    : null;

  const onBadgeAdd = () => {
    const mergeRequiremens = 'dupa';
    setImg('http://http.cat/500');
    const newBadge = {
      name,
      img,
      points,
      requirements: mergeRequiremens,
      description,
      gameId: nonSteam ? null : gameId,
      game: nonSteam ? gameId : null,
      enabled: true,
      legacy: false,
      isNonSteamGame: nonSteam,
    };
    console.log(newBadge);
  };

  return (
    <Wrapper type="subpage">
      <Flex
        row
        style={{
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
        }}>
        <Flex
          align
          justify
          style={{
            width: '300px',
            boxSizing: 'border-box',
            marginRight: '16px',
          }}>
          <BadgeImage src="http://http.cat/404" />
        </Flex>
        <Flex column style={{ width: '100%' }}>
          <InputRow>
            <p>game:</p>
            <Flex row style={{ width: '100%' }}>
              <Flex column justify align style={{ marginLeft: '8px' }}>
                <input
                  type="checkbox"
                  onChange={event => setNonSteam(event.target.checked)}
                  checked={nonSteam}
                />
                <span style={{ textAlign: 'center' }}>non-steam</span>
              </Flex>
              <TextInput
                list="gameids"
                placeholder="Select game..."
                onChange={event =>
                  setGameId(event.target.getAttribute('data-value'))
                }
                value={gameId}
                disabled={nonSteam}
              />
              <datalist id="gameids">{gameOptions}</datalist>
            </Flex>
          </InputRow>
          <InputRow>
            <p>Badge name</p>
            <TextInput
              type="text"
              onChange={event => setName(event?.target.value)}
              value={name}
            />
          </InputRow>
          <InputRow>
            <p>Image</p>
            <FileInput
              type="file"
              accept="image/*"
              // onChange={event => setImg(event.target.files)}
            />
          </InputRow>
          <InputRow>
            <p>Points</p>
            <TextInput
              type="number"
              onChange={event => setPoints(Number(event.target.value))}
              value={points}
            />
          </InputRow>
          <InputRow>
            <p>Requirements:</p>
            <Flex
              row
              style={{ width: '100%', justifyContent: 'space-between' }}>
              <Flex align>
                <input
                  type="checkbox"
                  onChange={event =>
                    setRequirements({
                      ...requirements,
                      screenshot: event.target.checked,
                    })
                  }
                  checked={requirements.screenshot}
                />
                screenshot
              </Flex>
              <Flex align>
                <input
                  type="checkbox"
                  onChange={event =>
                    setRequirements({
                      ...requirements,
                      video: event.target.checked,
                    })
                  }
                  checked={requirements.video}
                />
                video
              </Flex>
              <Flex align>
                <input
                  type="checkbox"
                  onChange={event =>
                    setRequirements({
                      ...requirements,
                      achievement: event.target.checked,
                    })
                  }
                  checked={requirements.achievement}
                />
                achievement
              </Flex>
            </Flex>
          </InputRow>
          <InputRow>
            <p>description</p>
            <TextArea
              rows={3}
              onChange={event => setDescription(event?.target.value)}
              value={description}
            />
          </InputRow>
        </Flex>
      </Flex>
      <Flex
        row
        style={{
          justifyContent: 'flex-end',
          marginTop: '16px',
          width: '100%',
        }}>
        <CustomButton onClick={onBadgeAdd}>Add badge</CustomButton>
      </Flex>
    </Wrapper>
  );
}
