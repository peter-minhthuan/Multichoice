import React, { useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { topicServices } from '../../services/TopicServices';
import { ITopicResponse } from '../../types';
import Breadcrumb from '../Commons/Breadcrumb/Breadcrumb';
import { FaPencilAlt } from 'react-icons/fa';
import ToolTip from '../Commons/ToolTip/ToolTip';
import { BsCalendarDate } from 'react-icons/bs';
import { getDate } from '../../utils/formatDate';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const HeaderEditTest: React.FC = () => {
  const { id: topicId } = useParams();

  const [topicInfor, setTopicInfor] = useState<ITopicResponse>();

  const getTopicById = async () => {
    try {
      const { data }: { data: ITopicResponse } =
        await topicServices.getTopicById(topicId || '');
      setTopicInfor(data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getTopicById();
  }, [topicId]);

  if (!topicInfor) {
    return null;
  }
  return (
    <div className="header-create-test">
      <div className="container py-4 border-b border-solid border-slate-200">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/tests">Đề thi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div>{topicInfor.title}</div>
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-slate-800 text-xl font-semibold">
            {topicInfor.title}
          </h3>
          <div className="ctas">
            <ToolTip title="Cập nhật đề thi">
              <button>
                <FaPencilAlt className="p-0.5 text-slate-800 text-base" />
              </button>
            </ToolTip>
          </div>
        </div>
      </div>
      <div className="container py-4 flex items-center justify-between">
        <ul className="left flex items-center">
          <li className="flex items-center text-sm mr-3">
            <BsCalendarDate className="text-slate-500 mr-2" />
            <span>{getDate(topicInfor.createdAt)}</span>
          </li>
          <li className="flex items-center text-sm mr-3">
            <AiOutlineQuestionCircle className="text-slate-800 mr-1" />
            <span>{topicInfor.questions.length} câu hỏi</span>
          </li>
        </ul>
        <div className="right">
          <Link
            to={'/questions/create?topic_id=' + topicInfor.id}
            className="create-test btn-primary rounded-md bg-primary-900 text-sm
            text-white font-bold flex justify-center items-center w-32 h-10 transition-all
            duration-200 hover:bg-primary-800
            "
          >
            Thêm câu hỏi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditTest;
