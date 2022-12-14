import React, { useEffect, useState } from 'react';
import { BsCalendarDate, BsPause, BsPlay } from 'react-icons/bs';
import { AiOutlineQuestionCircle, AiOutlineFieldTime } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { getDate } from '../../utils/format_date';
import ToolTip from '../Commons/ToolTip/ToolTip';
import { Link, useParams } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';
import Badge from '../Commons/Badge/Badge';
import { copyClipboard } from '../../helper/copyClipboard';
import { notify } from '../../helper/notify';
import { iNotification } from 'react-notifications-component';
import { secondsToMinutes } from '../../utils/minutes_to_seconds';
import { ITestRealtimeRecord } from '../../types/Commons';
import {
  canNotCopyLinkExam,
  copyLinkExamSuccess,
} from '../../constants/msgNotify';
import { fireGet, fireUpdate } from '../../utils/firebase_utils';
import PlayTestRealtime from '../PlayTestRealtime/PlayTestRealtime';
import { firebasePath } from '@monorepo/multichoice/constant';
import BadgeColor from '../Commons/Badge/BadgeColor';
import { ITopic } from '../../types/Topic';
import { topicStore } from '../../store/Topic/topicStore';

interface ITestItemProps {
  test: ITopic;
  handleDeleteTest: (testID: number, testTitle: string) => void;
}

const TestItem: React.FC<ITestItemProps> = ({ test, handleDeleteTest }) => {
  const { url } = useParams();
  const isRealtime = test.timeType.toUpperCase() === 'REALTIME';

  const [visibleModalPlayTest, setVisibleModalPlayTest] =
    useState<boolean>(false);
  const [startedTestRealtime, setStartedTestRealtime] =
    useState<boolean>(false);
  const [isPlaytest, setIsPlaytest] = useState<boolean>(false);
  const { isPublic } = topicStore();

  const examUrl = (): string => {
    const host = window.location.origin + '/e/';
    return host + test.url + (isRealtime ? '/do-exam-realtime' : '/do-exam');
  };

  const onCopyClipboard = () => {
    const canCopy = test.questionsCount !== 0;
    if (canCopy) {
      copyClipboard(examUrl());
      notify({
        message: copyLinkExamSuccess,
        type: 'success',
      } as iNotification);
    } else {
      notify({
        message: canNotCopyLinkExam,
        type: 'danger',
      } as iNotification);
    }
  };

  const RenderExamUrl = (): React.ReactNode => {
    return test.questionsCount === 0 ? (
      <p className="text-sm text-yellow-400">
        Bộ đề chưa có câu hỏi nào. Hãy thêm câu hỏi cho bộ đề
      </p>
    ) : (
      <Link
        to={'/e/' + test.url + (isRealtime ? '/do-exam-realtime' : '/do-exam')}
        className="text-sm text-primary-800"
        target="_blank"
      >
        Làm bài ngay
      </Link>
    );
  };

  useEffect(() => {
    const testPath: string = `${firebasePath}-` + test.url;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fireGet(testPath, (data: any) => {
      const recordValue: ITestRealtimeRecord = data;
      const expriedTest: boolean =
        new Date().getTime() > +recordValue?.startTime + +test?.expirationTime;
      if (expriedTest) {
        fireUpdate(testPath, {
          started: false,
          duration: 0,
          startTime: 0,
        } as ITestRealtimeRecord);
        setStartedTestRealtime(false);
      }
    });
    // const dev = setInterval(() => {
    //   const shouldExpriedTest =
    //     new Date().getTime() > +time + +test?.expirationTime;
    //   if (shouldExpriedTest) {
    //     fireDelete(testPath);
    //     setStartedTestRealtime(false);
    //   }
    // }, 1000);
    // return () => {
    //   clearInterval(dev);
    // };
  }, []);

  useEffect(() => {
    const testPath: string = `${firebasePath}-` + url;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fireGet(testPath, (data: any) => {
      const recordValue: ITestRealtimeRecord = data;
      setStartedTestRealtime(recordValue?.started || false);
      setIsPlaytest(recordValue?.started || false);
    });
  }, [test.url]);

  return (
    <>
      {!isPublic ? (
        <PlayTestRealtime
          visibleModal={visibleModalPlayTest}
          setVisibleModal={setVisibleModalPlayTest}
          topicTitle={test.title}
          topicUrl={test.url}
          isPlaytest={isPlaytest}
        />
      ) : null}

      <div className="test-item cursor-pointer p-4 rounded-md bg-white mb-3 last:mb-0 shadow-sm">
        <div className="test-item__header title flex items-center ">
          {isPublic ? (
            <Link
              className="font-semibold text-lg text-slate-800 mr-2"
              to={'#'}
            >
              {test.title}
            </Link>
          ) : (
            <Link
              className="font-semibold text-lg text-slate-800 mr-2"
              to={'/manage-tests/edit/' + test.id}
            >
              {test.title}
            </Link>
          )}
          {!isPublic ? (
            <BadgeColor
              text={test.isPublic ? 'Public' : 'Private'}
              type={test.isPublic ? 'green' : 'yellow'}
            />
          ) : null}
        </div>
        <div className="test-item__body mt-2 flex items-center justify-between">
          <ul className="left flex items-center">
            <li className="flex items-center text-tiny mr-3">
              <BsCalendarDate className="text-slate-500 mr-2" />
              <span>{getDate(test.createdAt)}</span>
            </li>
            <li className="flex items-center text-tiny mr-3">
              <AiOutlineQuestionCircle className="text-slate-800 mr-1" />
              <span>{test.questionsCount} câu hỏi</span>
            </li>
            <li className="flex items-center text-tiny mr-3">
              <AiOutlineFieldTime className="text-slate-800 mr-1 text-base" />
              <span>
                {secondsToMinutes(test.expirationTime)} phút
                {test.timeType === 'realtime' ? ' (Realtime)' : null}
              </span>
            </li>
            <li>
              <Badge
                title={test.typeCategoryName}
                type={test.typeCategoryName}
              />
            </li>
          </ul>
          {!isPublic ? (
            <div className="right">
              <ul className="ctas flex items-center">
                {test.timeType === 'realtime' ? (
                  <li className="relative group mr-4 mt-1">
                    <ToolTip
                      title={
                        startedTestRealtime
                          ? 'Bài thi đã bắt đầu'
                          : 'Bắt đầu làm bài'
                      }
                    >
                      {startedTestRealtime ? (
                        <button
                        // onClick={() => {
                        //   setIsPlaytest(false);
                        //   setModalHandlePlayTest(true);
                        // }}
                        >
                          <BsPause className="text-slate-800 text-2xl" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsPlaytest(true);
                            setVisibleModalPlayTest(true);
                          }}
                        >
                          <BsPlay className="text-slate-800 text-2xl" />
                        </button>
                      )}
                    </ToolTip>
                  </li>
                ) : null}
                <li className="relative group mr-4 mb-0.5">
                  <ToolTip title="Cập nhật đề thi">
                    <Link to={'/manage-tests/edit/' + test.id}>
                      <TiPencil className="text-slate-800" />
                    </Link>
                  </ToolTip>
                </li>
                <li className="relative group mr-4">
                  <ToolTip title="Xóa">
                    <button
                      onClick={() => handleDeleteTest(test.id, test.title)}
                    >
                      <RiDeleteBin6Line className="text-red-500" />
                    </button>
                  </ToolTip>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <div
          className="test-footer mt-2 pt-4 flex items-center justify-between
          border-t border-solid border-slate-200"
        >
          <div className="left font-semibold">{RenderExamUrl()}</div>
          {!isPublic ? (
            <div className="right">
              <button
                className="text-sm text-slate-800 font-semibold"
                onClick={() => onCopyClipboard()}
              >
                Sao chép liên kết
              </button>
              <Link
                className="ml-5 text-sm text-slate-800 font-semibold"
                to={`/manage-tests/${test.id}/statistic`}
              >
                Thống kê kết quả
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TestItem;
