import React from 'react';
import { Questiondetail } from '@monorepo/multichoice/dto';
import { classNames } from '../../helper/classNames';
import { IAnswer } from '../../types';
import PolaCode from '../PolaCode/PolaCode';
import { BiCheckDouble } from 'react-icons/bi';
import { QuestionType } from '../../types/ICommons';
import { QuestionTypeEnum } from '@monorepo/multichoice/constant';

interface IQuestionsUserExamProps {
  questions: Questiondetail[];
}

const QuestionsUserExam: React.FC<IQuestionsUserExamProps> = ({
  questions,
}) => {
  const isCorrectMultiAnswer = (
    answers: IAnswer[],
    answersUser: number[] | string,
    questionType: QuestionType
  ): boolean => {
    if (typeof answersUser === 'string') return true; // for question type TEXT

    if (questionType.toUpperCase() === 'SINGLE') return true;

    const correctAnswersObj = answers
      .filter((answer: IAnswer) => answer.isCorrect)
      .reduce((acc: Record<number, number>, answer: IAnswer) => {
        acc[answer.id] = answer.id;
        return acc;
      }, {});

    const answersUserObj = answersUser.reduce(
      (acc: Record<number, number>, answer: number) => {
        acc[answer] = answer;
        return acc;
      },
      {}
    );
    const isCorrect =
      JSON.stringify(correctAnswersObj) === JSON.stringify(answersUserObj);
    return isCorrect;
  };

  return (
    <div>
      {questions &&
        questions.map((question: Questiondetail, indexQuestion: number) => {
          const {
            id,
            type: questionType,
            content: questionContent,
            answerUser,
          } = question;
          return (
            <ul
              className="relative border-b border-slate-200 last:border-none py-5 px-6
              bg-white shadow-sm mb-4 last:mb-0 rounded-sm"
              key={id}
            >
              <div className="header-left flex text-tiny mb-2 text-slate-800">
                <span className="font-semibold mr-2 min-w-max">
                  Câu hỏi {indexQuestion + 1}:
                </span>
                <PolaCode content={questionContent} />
              </div>

              <div>
                {questionType === QuestionTypeEnum.TEXT ? (
                  <p className="text-sm text-violet-800 bg-violet-100 py-2 px-4 font-semibold">
                    {answerUser}
                  </p>
                ) : (
                  question &&
                  question.answers.map(
                    (answer: IAnswer, indexAnswer: number) => {
                      const { isCorrect, id: answerId } = answer;
                      const {
                        answers,
                        answerUser,
                        type: questionType,
                      } = question;

                      const isCorrectMulti = isCorrectMultiAnswer(
                        answers,
                        answerUser,
                        `${questionType}` as QuestionType
                      );
                      return (
                        <li
                          key={answerId}
                          className="flex items-start text-slate-800 text-sm mb-1 last:mb-0"
                        >
                          <BiCheckDouble
                            className={classNames(
                              'absolute left-1 mt-1 min-w-max',
                              {
                                'text-green-500': isCorrect,
                                hidden: !isCorrect,
                              }
                            )}
                          />
                          <span
                            className={classNames(
                              'font-semibold flex items-center min-w-max',
                              {
                                // for correct
                                'text-green-600 underline':
                                  questionType === QuestionTypeEnum.SINGLE &&
                                  typeof answerUser !== 'string'
                                    ? answerUser.includes(answerId) &&
                                      answer.isCorrect
                                    : typeof answerUser !== 'string' &&
                                      answerUser.includes(answerId) &&
                                      isCorrectMulti,
                                // for incorrect
                                'text-red-500 underline':
                                  questionType === QuestionTypeEnum.SINGLE &&
                                  typeof answerUser !== 'string'
                                    ? answerUser.includes(answerId) &&
                                      !isCorrect
                                    : typeof answerUser !== 'string' &&
                                      answerUser.includes(answerId) &&
                                      !isCorrectMulti,
                              }
                            )}
                          >
                            Đáp án {String.fromCharCode(65 + indexAnswer)} :
                          </span>
                          <span className="ml-2">{answer.content}</span>
                        </li>
                      );
                    }
                  )
                )}
              </div>

              <div className="mt-1">
                <p className="text-sm text-primary-800 italic">
                  {questionType === QuestionTypeEnum.MULTIPLE
                    ? '(Có thể có nhiều đáp án đúng)'
                    : null}
                </p>
                <p className="text-sm text-primary-800 italic">
                  {questionType === QuestionTypeEnum.TEXT
                    ? '(Câu hỏi trả lời tự do)'
                    : null}
                </p>
              </div>

              {/* {question.type === QuestionTypeEnum.MULTIPLE ? (
                <div className="mt-1">
                  <p className="text-sm text-primary-800 italic">
                    (Có thể có nhiều đáp án đúng)
                  </p>
                </div>
              ) : null} */}
            </ul>
          );
        })}
    </div>
  );
};

export default QuestionsUserExam;
