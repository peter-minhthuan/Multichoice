import { TopicTimeTypeEnum } from '@monorepo/multichoice/constant';
import React, { useState } from 'react';
import DoExamSkelenton from '../../pages/Exam/DoExam/DoExamSkelenton';
import { examStore } from '../../store/rootReducer';
import NavQuestion from './NavQuestion';
import ShowQuestion from './ShowQuestion';

const MainDoExam: React.FC = () => {
  const { exam } = examStore();

  const [indexQuestion, setIndexQuestion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return isLoading && exam.timeType === TopicTimeTypeEnum.REALTIME ? (
    <DoExamSkelenton />
  ) : (
    <div
      className="main-doexam"
      style={{
        minHeight: 'calc(100vh - 57px)',
      }}
    >
      <div className="container mx-auto pt-5 lg:px-10 flex gap-x-8">
        <div className="w-full lg:w-2/3 h-full">
          <ShowQuestion
            indexQuestion={indexQuestion}
            setIndexQuestion={setIndexQuestion}
          />
        </div>
        <div className="w-1/3 xs:hidden lg:block h-full">
          <NavQuestion
            indexQuestion={indexQuestion}
            setIndexQuestion={setIndexQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDoExam;
