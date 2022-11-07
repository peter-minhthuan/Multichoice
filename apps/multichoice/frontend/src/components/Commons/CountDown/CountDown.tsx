import React from 'react';
import Countdown from 'react-countdown';
import { BsFillClockFill } from 'react-icons/bs';
import { classNames } from '../../../helper/classNames';
import { examStore } from '../../../store/rootReducer';

interface Renderer {
  (props: any): React.ReactNode;
}

interface ICountDownProps {
  startTime?: number;
  endTime?: number;
  className: string;
  isHidden?: boolean;
  restartKey?: string | number;
}

const CountDown: React.FC<ICountDownProps> = ({
  startTime = 0,
  endTime = 1,
  className = '',
  isHidden = false,
  restartKey = '',
}) => {
  const { setIsExpriedExam } = examStore();
  const formatCountdown = (
    hours: number,
    minutes: number,
    seconds: number
  ): string => {
    const formatHours = hours >= 10 ? hours + '' : '0' + hours;
    const formatMinutes = minutes >= 10 ? minutes + '' : '0' + minutes;
    const formatSeconds = seconds >= 10 ? seconds + '' : '0' + seconds;
    return formatHours + ':' + formatMinutes + ':' + formatSeconds;
  };

  const rendererCountdown: Renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return (
        <p className={classNames(['font-semibold underline text-red-500'])}></p>
      );
    } else {
      return (
        <span
          className={classNames(['font-semibold flex items-center', className])}
        >
          {formatCountdown(hours, minutes, seconds)}
          <BsFillClockFill className="ml-1" />
        </span>
      );
    }
  };

  return isHidden ? null : (
    <Countdown
      date={startTime + endTime}
      renderer={rendererCountdown}
      onStart={() => setIsExpriedExam(false)}
      onComplete={() => setIsExpriedExam(true)}
      key={startTime}
    />
  );
};

export default CountDown;
