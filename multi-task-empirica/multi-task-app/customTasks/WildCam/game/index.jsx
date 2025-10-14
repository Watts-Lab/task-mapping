import React, {Component} from 'react';
import {TaskLayout} from '../../../client/common/TaskLayout';
import {Button} from '../../../client/common/components/Button';
import Instructions from '../intro/Instructions';
import ViewInstructions from '../../../client/common/components/ViewInstructions';
import {RadioGroup} from '/client/common/components/Input';
import {logAction} from '../../../client/common/helper/logger';
import WildcamButton from './WildcamButton';
import WildcamImage from './WildcamImage';

export default class WildCam extends React.Component {
  constructor(props) {
    super(props);
    this.topRef = React.createRef();
    const {stage} = this.props;
    const allAnimals = stage.get('constants').animals;
    this.state = {
      showModal: false,
      answer: null,
      allAnimals: stage.get('constants').animals,
      questions: stage.get('constants').questions,
      filterColor: ['None', ...new Set(allAnimals.flatMap(animal => animal.color).sort())],
      filterBody: ['None', ...new Set(allAnimals.flatMap(animal => animal.body).sort())],
      filterHorn: ['None', ...new Set(allAnimals.flatMap(animal => animal.horn).sort())],
    };

    stage.set('imageIndex', 0);
    stage.set('selectedSpecies', null); // Initialize the selectedSpecies in the stage

    const stimulus = stage.get('constants').stimulus;
    const numberOfImages = stimulus.length;
    const numberOfQuestions = Object.keys(stimulus[0].answer).length;

    // Initialize an array with null values
    const createNullAnswerObject = questions =>
      questions.reduce((acc, question) => {
        acc[question.name] = null;
        return acc;
      }, {});

    const answers = Array(numberOfImages)
      .fill()
      .map(_ => createNullAnswerObject(this.state.questions));
    stage.set('answers', answers);
  }

  componentDidMount() {
    const {game} = this.props;
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  approve() {
    const {game, player} = this.props;
    player.set('approved', true);
    if (game.players.length === 1) {
      game.players.forEach(curPlayer => curPlayer.stage.submit());
    }
    if (
      game.players.reduce(
        (prev, curPlayer) =>
          prev && (curPlayer.get('approved') || curPlayer.exitStatus || !curPlayer.online)
      )
    ) {
      game.players.forEach(curPlayer => curPlayer.stage.submit());
    }
  }

  isAnswerFilled() {
    const {stage} = this.props;
    let answers = stage.get('answers');
    let imageIndex = stage.get('imageIndex');
    let clicked = stage.get('clicked');
    let selectedSpecies = stage.get('selectedSpecies');

    const isAnswersFilled =
      Object.values(answers[imageIndex]).every(answer => answer !== null && answer !== '') &&
      selectedSpecies != null;

    if (isAnswersFilled) {
      stage.set('imageIndex', imageIndex + 1);
      const newClicked = clicked.map(instance => instance.map(_ => false));
      stage.set('clicked', newClicked);
      stage.set('selectedSpecies', null);
      stage.set('scroll', true);
      stage.set('colorFilter', 'None');
      stage.set('hornFilter', 'None');
      stage.set('bodyFilter', 'None');
      stage.set('filteredAnimals', stage.get('constants').animals);
    }
  }

  handleClick(answer, questionIndex, selectionIndex) {
    const {stage, player} = this.props;
    const {questions} = this.state;
    let questionName = questions[questionIndex].name;
    let clicked = stage.get('clicked');
    let imageIndex = stage.get('imageIndex');
    let selectedSpecies = stage.get('selectedSpecies');
    let answers = stage.get('answers');

    logAction(player, 'buttonClicked', answer);

    if (questionIndex == 0) {
      selectedSpecies = answer;
      answers[imageIndex][questionName] = answer.name;
      stage.set('answers', answers);
      stage.set('selectedSpecies', selectedSpecies);
    } else {
      answers[imageIndex][questionName] = answer;
      stage.set('answers', answers);

      const newClicked = clicked.map((instance, instanceIndex) =>
        instanceIndex === questionIndex - 1
          ? instance.map((_, j) => j === selectionIndex)
          : instance
      );
      stage.set('clicked', newClicked);
    }
    this.isAnswerFilled();
  }

  render() {
    const {round, stage, player, game} = this.props;
    const {questions, answer, filterColor, filterBody, filterHorn, allAnimals} = this.state;

    const imageIndex = stage.get('imageIndex');

    let clicked = stage.get('clicked');
    let scroll = stage.get('scroll');
    let selectedSpecies = stage.get('selectedSpecies');
    let colorFilter = stage.get('colorFilter');
    let bodyFilter = stage.get('bodyFilter');
    let hornFilter = stage.get('hornFilter');
    let filteredAnimals = stage.get('filteredAnimals');

    if (scroll) {
      this.topRef.current.scrollIntoView({behavior: 'smooth'});
      stage.set('scroll', false);
    }

    const filterAnimals = (colorFilter, bodyFilter, hornFilter) => {
      return allAnimals.filter(animal => {
        const hasColor =
          colorFilter === 'None' ||
          (Array.isArray(animal.color) && animal.color.some(color => colorFilter.includes(color)));
        const hasBody =
          bodyFilter === 'None' ||
          (Array.isArray(animal.body) && animal.body.some(body => bodyFilter.includes(body)));
        const hasHorn =
          hornFilter === 'None' ||
          (Array.isArray(animal.horn) && animal.horn.some(horn => hornFilter.includes(horn)));
        return hasColor && hasBody && hasHorn;
      });
    };

    const updateValues = (filterType, value) => {
      stage.set(filterType, value);
      logAction(player, 'changedFilterSettings', value);
      let color = stage.get('colorFilter');
      let body = stage.get('bodyFilter');
      let horn = stage.get('hornFilter');
      const filteredAnimals = filterAnimals(color, body, horn);
      stage.set('filteredAnimals', filteredAnimals);
    };

    return (
      <TaskLayout
        {...this.props}
        nextForm={() => (
          <div className='flex h-full items-center justify-center space-x-1'>
            <Button
              type='submit'
              onClick={this.approve.bind(this)}
              disabled={player.get('approved')}
              style={{
                backgroundColor: '#007BFF',
                borderColor: '#007BFF',
                color: 'white',
                borderRadius: '4px',
                padding: '10px 24px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Approve Configuration
            </Button>
          </div>
        )}
      >
        <div style={{position: 'absolute', bottom: '5px', right: '330px'}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>

        {imageIndex < stage.get('constants').stimulus.length ? (
          <div ref={this.topRef}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '2rem',
                  color: '#606060',
                  fontWeight: '600',
                }}
              >
                Image: {imageIndex + 1}
                <img
                  src={stage.get('constants').stimulus[imageIndex].image}
                  style={{maxWidth: '100%', maxHeight: '1000%', margin: '0 2rem 2rem 2rem'}}
                ></img>
              </h2>
            </div>
          </div>
        ) : (
          <></>
        )}

        {imageIndex >= stage.get('constants').stimulus.length ? (
          <p
            style={{
              fontSize: '18px',
              marginLeft: '5rem',
              marginTop: '2rem',
              color: '#606060',
              fontWeight: '600',
            }}
          >
            You may click Approve Configuration to advance to the next round!
          </p>
        ) : (
          <>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <p
                  style={{
                    fontSize: '20px',
                    marginLeft: '5rem',
                    marginTop: '2rem',
                    color: '#606060',
                    fontWeight: '600',
                  }}
                >
                  Question {questionIndex + 1}: {question.text}
                </p>
                <div style={{marginLeft: '5rem', marginTop: '2rem', display: 'flex'}}>
                  {questionIndex == 0 && (
                    <>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div
                          style={{
                            marginLeft: '5rem',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <label htmlFor='filterColor' style={{marginRight: '0.5rem'}}>
                            Color:
                          </label>
                          <select
                            id='filterColor'
                            value={stage.get('colorFilter')}
                            onChange={e => {
                              const selectedValue = e.target.value;
                              updateValues('colorFilter', selectedValue);
                            }}
                          >
                            <option value='' disabled>
                              Select color
                            </option>
                            {filterColor.map((answer, index) => (
                              <option key={index} value={answer}>
                                {answer}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          style={{
                            marginLeft: '5rem',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <label htmlFor='filterColor' style={{marginRight: '0.5rem'}}>
                            Body Type:
                          </label>
                          <select
                            id='filterBody'
                            value={stage.get('bodyFilter')}
                            onChange={e => {
                              const selectedValue = e.target.value;
                              updateValues('bodyFilter', selectedValue);
                            }}
                          >
                            <option value='' disabled>
                              Select body
                            </option>
                            {filterBody.map((answer, index) => (
                              <option key={index} value={answer}>
                                {answer}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          style={{
                            marginLeft: '5rem',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <label
                            htmlFor='filterColor'
                            value={stage.get('hornFilter')}
                            style={{marginRight: '0.5rem'}}
                          >
                            Horn:
                          </label>
                          <select
                            id='filterHorn'
                            value={stage.get('hornFilter')}
                            onChange={e => {
                              const selectedValue = e.target.value;
                              updateValues('hornFilter', selectedValue);
                            }}
                          >
                            <option value='' disabled>
                              Select horn type
                            </option>
                            {filterHorn.map((answer, index) => (
                              <option key={index} value={answer}>
                                {answer}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div
                  style={{
                    marginLeft: '5rem',
                    marginTop: '1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {questionIndex !== 0 ? (
                    question.answers.map((answer, selectionIndex) => (
                      <button
                        key={selectionIndex}
                        onClick={() => this.handleClick(answer, questionIndex, selectionIndex)}
                        style={{
                          borderRadius: '8px',
                          padding: '10px 24px',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          backgroundColor: clicked[questionIndex - 1][selectionIndex]
                            ? '#055279'
                            : 'gray',
                          borderColor: clicked[questionIndex - 1][selectionIndex]
                            ? '#055279'
                            : 'gray',
                          color: 'white',
                        }}
                      >
                        {answer}
                      </button>
                    ))
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          marginTop: '1rem',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 150px)',
                          gridTemplateRows: `repeat(${Math.ceil(
                            filteredAnimals.length / 4
                          )}, 50px)`,
                        }}
                      >
                        {filteredAnimals.map((animal, selectionIndex) => (
                          <WildcamButton
                            key={animal.name}
                            display={animal.name}
                            onClick={() => this.handleClick(animal, questionIndex, selectionIndex)}
                            selected={selectedSpecies && animal.name === selectedSpecies.name}
                            style={{width: '100%', height: '100%'}}
                          ></WildcamButton>
                        ))}
                      </div>
                      <WildcamImage speciesToDisplay={selectedSpecies}></WildcamImage>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </TaskLayout>
    );
  }
}
