import React from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import {
  AiOutlineQuestionCircle,
  AiOutlineFieldTime,
  AiOutlineCaretDown,
} from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { getDate } from '../../utils/formatDate';
import ToolTip from '../Commons/ToolTip/ToolTip';
import { Link } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';
import Badge from '../Commons/Badge/Badge';
import { TopicCategoryEnum } from '@monorepo/multichoice/constant';
import { copyClipboard } from '../../helper/copyClipboard';
import { notify } from '../../helper/notify';
import { iNotification } from 'react-notifications-component';

export type CategoryType = keyof typeof TopicCategoryEnum;
export interface ITestItem {
  topicUrl: string;
  id: number;
  title: string;
  date: string;
  questionCount: number;
  expirationTime: number;
  typeCategoryName: CategoryType;
}

interface ITestItemProp {
  test: ITestItem;
  handleDeleteTest: (testID: number, testTitle: string) => void;
}

const TestItem: React.FC<ITestItemProp> = ({ test, handleDeleteTest }) => {
  const examUrl = () => {
    // must change to use .env
    const host = 'http://localhost:4200/exam/';
    return host + test.topicUrl;
  };

  const onCopyClipboard = () => {
    copyClipboard(examUrl());
    notify({
      message: 'Liên kết đã được sao chép!',
      type: 'success',
    } as iNotification);
  };

  return (
    <div className="test-item cursor-pointer p-4 rounded-md bg-white mb-3 last:mb-0">
      <div className="test-item__header title">
        <h3 className="font-semibold text-tiny">{test.title}</h3>
      </div>
      <div className="test-item__body mt-2 flex items-center justify-between">
        <ul className="left flex items-center">
          <li className="flex items-center text-sm mr-3">
            <BsCalendarDate className="text-slate-500 mr-2" />
            <span>{getDate(test.date)}</span>
          </li>
          <li className="flex items-center text-sm mr-3">
            <AiOutlineQuestionCircle className="text-slate-800 mr-1" />
            <span>{test.questionCount} câu hỏi</span>
          </li>
          <li className="flex items-center text-sm mr-3">
            <AiOutlineFieldTime className="text-slate-800 mr-1 text-base" />
            <span>{test.expirationTime} phút</span>
          </li>
          <li>
            <Badge title={test.typeCategoryName} type={test.typeCategoryName} />
          </li>
        </ul>
        <div className="right">
          <ul className="ctas flex items-center">
            <li className="relative group mr-4">
              <ToolTip title="Cập nhật đề thi">
                <Link to={'/tests/edit/' + test.id}>
                  <TiPencil className="text-slate-800 text-tiny" />
                </Link>
              </ToolTip>
            </li>
            <li className="relative group mr-4">
              <ToolTip title="Xóa">
                <button onClick={() => handleDeleteTest(test.id, test.title)}>
                  <RiDeleteBin6Line className="text-red-500 text-tiny" />
                </button>
              </ToolTip>
            </li>
            <li>
              <ToolTip title="Actions">
                <button className="text-sm">
                  <AiOutlineCaretDown />
                </button>
              </ToolTip>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="test-footer mt-2 pt-4 flex items-center justify-between
        border-t border-solid border-slate-200"
      >
        <div className="left">
          <span className="text-sm text-slate-900 inline-block">
            {examUrl()}
          </span>
        </div>
        <div className="right">
          <button
            className="text-sm text-primary-900 font-semibold hover:underline"
            onClick={() => onCopyClipboard()}
          >
            Sao chép liên kết
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestItem;
