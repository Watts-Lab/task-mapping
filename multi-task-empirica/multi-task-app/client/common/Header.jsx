import ReactModal from 'react-modal';
import {StageTimeWrapper} from 'meteor/empirica:core';
import Tippy from '@tippy.js/react';
import React from 'react';

class timer extends React.Component {
  render() {
    const {remainingSeconds: secs} = this.props;

    return (
      <div
        className={`font-mono ${secs <= 5 ? 'text-red-500' : secs <= 10 ? 'text-orange-500' : ''}`}
      >
        {humanTimer(secs)}
      </div>
    );
  }
}

const Timer = StageTimeWrapper(timer);

function humanTimer(seconds) {
  if (seconds === null) {
    return '-';
  }

  let out = '';
  const s = seconds % 60;
  out += s < 10 ? '0' + s : s;

  const min = (seconds - s) / 60;
  if (min === 0) {
    return `00:${out}`;
  }

  const m = min % 60;
  out = `${m < 10 ? '0' + m : m}:${out}`;

  const h = (min - m) / 60;
  if (h === 0) {
    return out;
  }

  return `${h}:${out}`;
}

class StageSteps extends React.Component {
  render() {
    const {round, stage} = this.props;

    const last = round.stages.length - 1;

    return (
      <div className='flex items-center space-x-1.5'>
        {/* {round.stages.concat(round.stages).map((s, i) => { */}
        {round.stages.map((s, i) => {
          let cls = '';
          if (s.name === stage.name) {
            cls = 'bg-sky-500 text-white';
          }

          // console.log(s)
          return (
            <React.Fragment key={s.name}>
              <div className={`rounded-md px-2.5 py-1 ${cls}`}>{s.data.anonName}</div>
              {last !== i ? (
                <svg
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-gray-400'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z'
                  />
                </svg>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

class RoundSteps extends React.Component {
  render() {
    const {total, current} = this.props;

    return (
      <ol role='list' className='flex items-center space-x-4' aria-label='Progress'>
        {[...Array(total)].map((n, i) => {
          return (
            <li key={i}>
              <div className='relative flex items-center justify-center' aria-current='step'>
                {current === i ? (
                  <span className='absolute flex h-5 w-5 p-px' aria-hidden='true'>
                    <span className='bg-sky-200 h-full w-full rounded-full'></span>
                  </span>
                ) : null}
                <span
                  className={`relative block h-2.5 w-2.5 rounded-full ${
                    i > current ? 'bg-gray-200' : 'bg-sky-600'
                  }`}
                  aria-hidden='true'
                ></span>
                <span className='sr-only'>Step {i}</span>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}

// class Instructions extends React.Component {
//   state = {};

//   render() {
//     const { round } = this.props;

//     const instructions = round.get("quick_instructions");
//     if (!instructions) {
//       return null;
//     }

//     return (
//       <>
//         <Tippy
//           content="Show instructions"
//         >
//           <button onClick={() => this.setState({ instructionsOpen: true })}>
//             <svg
//               viewBox="0 0 16 16"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               className="w-4 h-4 text-gray-300"
//             >
//               <path
//                 d="M8 0.25C3.72009 0.25 0.25 3.72134 0.25 8C0.25 12.2812 3.72009 15.75 8 15.75C12.2799 15.75 15.75 12.2812 15.75 8C15.75 3.72134 12.2799 0.25 8 0.25ZM8 14.25C4.54588 14.25 1.75 11.4553 1.75 8C1.75 4.54703 4.546 1.75 8 1.75C11.4528 1.75 14.25 4.54597 14.25 8C14.25 11.4541 11.4553 14.25 8 14.25ZM11.3514 6.275C11.3514 8.37037 9.08822 8.40263 9.08822 9.17697V9.375C9.08822 9.58209 8.92031 9.75 8.71322 9.75H7.28675C7.07966 9.75 6.91175 9.58209 6.91175 9.375V9.10441C6.91175 7.98738 7.75863 7.54084 8.39859 7.18203C8.94738 6.87437 9.28372 6.66512 9.28372 6.25769C9.28372 5.71875 8.59625 5.36103 8.04047 5.36103C7.31581 5.36103 6.98128 5.70406 6.51103 6.29756C6.38425 6.45756 6.15291 6.48728 5.99022 6.36394L5.12072 5.70463C4.96113 5.58363 4.92537 5.35881 5.03809 5.19328C5.77644 4.10909 6.71688 3.5 8.18106 3.5C9.71453 3.5 11.3514 4.697 11.3514 6.275ZM9.3125 11.5C9.3125 12.2237 8.72372 12.8125 8 12.8125C7.27628 12.8125 6.6875 12.2237 6.6875 11.5C6.6875 10.7763 7.27628 10.1875 8 10.1875C8.72372 10.1875 9.3125 10.7763 9.3125 11.5Z"
//                 fill="#D1D5DB"
//               />
//             </svg>
//           </button>
//         </Tippy>

//         {this.state.instructionsOpen ? (
//           <Dialog
//             isOpen
//             onClose={() => this.setState({ instructionsOpen: false })}
//           >
//             <div className="p-8">{round.get("quick_instructions")}</div>
//           </Dialog>
//         ) : null}
//       </>
//     );
//   }
// }

export default class Header extends React.Component {
  state = {};

  render() {
    const {player, game, round} = this.props;

    return (
      <div className='two-col-layout h-14 border-b border-gray-200 bg-gray-50 text-sm font-medium leading-4 text-gray-500'>
        <div className='grid grid-flow-col items-center pl-6 pr-2'>
          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2'>
              <div>{round.get('anonName')}</div>
            </div>

            {/* <Instructions {...this.props} /> */}

            <Tippy
              content={`${round.get('name')}: Task ${round.get('current_round') + 1} of ${game.get(
                'round_count'
              )}`}
            >
              <RoundSteps total={game.get('round_count')} current={round.get('current_round')} />
            </Tippy>
          </div>
          <div className='flex justify-center px-4'>
            <StageSteps {...this.props} />
          </div>
          <div className='text-sky-600 flex justify-end text-lg'>
            <Timer {...this.props} />
          </div>
        </div>
        <div className='flex items-center justify-end space-x-4 pl-2 pr-6'>
          {game.treatment.quitEarly ? (
            <button
              onClick={() => player.exit('playerQuit')}
              className='flex items-center space-x-0.5 rounded-md bg-green-600 py-1 pl-1.5 pr-2 text-white hover:bg-green-700'
            >
              <svg
                viewBox='0 0 12 16'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 text-white'
              >
                <path
                  d='M9.876 6.037h1.085c.3.048.533.279.576.57a.671.671 0 0 1-.386.704l-.068.012-.136.006h-1.34a.9.9 0 0 1-.622-.32L7.744 5.82l-.991 1.568-.062.233 1.64 3.105.85 3.396a.716.716 0 0 1-.277.803l-.216.067a.73.73 0 0 1-.53-.12.683.683 0 0 1-.288-.445l-.865-3.09L5.56 9.088l-.084.227-.453 1.927a.777.777 0 0 1-.622.632l-3.312.078a.675.675 0 0 1-.704-.235A.62.62 0 0 1 .354 11c.137-.164.321-.286.53-.35l2.645-.048.318-2.777c.002-.283.078-.562.219-.81L5.072 5.01h-1.52L2.64 6.57a.7.7 0 0 1-.865.206.652.652 0 0 1-.343-.794l1.156-2.004a.767.767 0 0 1 .757-.34h4.046a.66.66 0 0 1 .63.322l1.855 2.077h0ZM8.964 2.193C8.964 1.534 8.41 1 7.727 1S6.49 1.534 6.49 2.193c0 .66.554 1.194 1.237 1.194s1.237-.535 1.237-1.194Z'
                  fill='#ECFDF5'
                  stroke='#fff'
                  strokeWidth='.352'
                  strokeMiterlimit='500'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <div>Exit</div>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
