import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { restart } from '../actions/restart';
import { getCurrent, getAnswers } from '../selectors';
import ButtonContainer from '../components/ButtonContainer';
import ProgressBar from '../components/ProgressBar';
import Code from '../components/Code';
import Result from '../components/Result';
import Percentage from '../components/Percentage';
import Button from '../components/Button';

const Restart = styled.div`
  margin: 3rem 4rem;
  text-align: center;
`;

const TwitterButton = styled.a`
  background: #1da1f2;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 8px;
  text-decoration: none;
  font-size: 0.9rem;
`;

const GitHubButton = styled.a`
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 8px;
  text-decoration: none;
  font-size: 0.9rem;
`;

const ShareContainer = styled.p`
  text-align: center;
`;

const Game = ({ current, answers, style, onRestart }) => {
  let correct;

  if (!current) {
    correct = answers.filter(item => item.correct).length;
  }

  return (
    <Fragment>
      {current ? (
        <Fragment>
          <ProgressBar />
          <Code style={style} />
          <ButtonContainer />
        </Fragment>
      ) : (
        <Fragment>
          <Result />
          <Percentage />
          <Restart>
            <Button label="Try Again" id="try_again" onClick={onRestart} />
          </Restart>
          <ShareContainer>
            <TwitterButton
              className="twitter-share-button"
              data-dnt="true"
              href={`https://twitter.com/intent/tweet?text=I%20scored%20${correct}%20out%20of%2023%20in%20JavaScript%20Design%20Patterns%20game!%20Try%20it!&url=https://javascript-design-patterns.netlify.com`}
            >
              Tweet Your Score
            </TwitterButton>

            <GitHubButton
              href="https://github.com/zoltantothcom/JavaScript-Design-Patterns"
              aria-label="Star zoltantothcom/JavaScript-Design-Patterns on GitHub"
            >
              Star on GitHub
            </GitHubButton>
          </ShareContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

Game.propTypes = {
  style: PropTypes.object.isRequired,
  onRestart: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  current: PropTypes.object
};

export default connect(
  state => ({
    current: getCurrent(state),
    answers: getAnswers(state)
  }),
  {
    onRestart: () => restart()
  }
)(Game);
