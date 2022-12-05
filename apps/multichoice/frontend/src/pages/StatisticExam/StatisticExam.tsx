import { IUserDoExam } from '@monorepo/multichoice/dto';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { iNotification } from 'react-notifications-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Commons/Breadcrumb/Breadcrumb';
import ToolTip from '../../components/Commons/ToolTip/ToolTip';
import { notify } from '../../helper/notify';
import { examServices } from '../../services/Exam/ExamServices';
import { getDate, getDistance, getTime } from '../../utils/format_date';
import ConfirmDeleteUserExam from '../../components/Exam/ConfirmDeleteUserExam';
import { getTopicTitle } from '../../helper/getTopicTitle';
import FilterStatisticExam from '../../components/Exam/FilterStatisticExam';
import { withBackTop } from '../../HOCs/withBackTop';
import { deleteResultUserExamSuccess } from '../../constants/msgNotify';
import {
  IPayloadDeleteUserExam,
  IPayloadgetListExamByTopicId,
} from '../../services/Exam/type';

const StatisticExam: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usersDoExam, setUsersDoExam] = useState<IUserDoExam[]>([]);
  const [showModalConfirmDelete, setShowModalConfirmDelete] =
    useState<boolean>(false);
  const [userExamDetail, setUserExamDetail] = useState<IUserDoExam>();

  const getListExamByTopicId = async () => {
    try {
      const payload: IPayloadgetListExamByTopicId = {
        topicID: Number(id),
      };
      const { data, status } = await examServices.getListExamByTopicId(payload);
      if (status === 200) {
        setUsersDoExam(data.reverse());
      }
    } catch {
      navigate('/');
    }
  };

  const handleDeleteUserExam = async () => {
    try {
      const payload: IPayloadDeleteUserExam = {
        userId: Number(userExamDetail?.userID),
      };
      const response = await examServices.deleteUserExam(payload);
      if (response) {
        const { status } = response;
        if (status) {
          setShowModalConfirmDelete(false);
          notify({
            message: deleteResultUserExamSuccess,
          } as iNotification);
          getListExamByTopicId();
        }
      }
    } catch (error) {
      //
    }
  };

  const requestDeleteUserExam = (rowIndex: number) => {
    setShowModalConfirmDelete(true);
    setUserExamDetail(usersDoExam[rowIndex]);
  };

  useEffect(() => {
    getListExamByTopicId();
  }, []);

  return (
    <div>
      <header className="container py-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/tests">Đề thi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div>Thống kê đề {getTopicTitle(Number(id))}</div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <main>
        <ConfirmDeleteUserExam
          userData={userExamDetail || ({} as IUserDoExam)}
          onConfirmDelete={handleDeleteUserExam}
          setOpenModalConfirm={setShowModalConfirmDelete}
          openModalConfirm={showModalConfirmDelete}
        />

        <div className="container">
          <div className="pt-5 pb-10">
            {usersDoExam && usersDoExam.length ? (
              <>
                <div className="flex justify-end items-center">
                  <FilterStatisticExam />
                </div>
                <table className="shadow-xl w-full">
                  <thead className="bg-slate-800 text-white text-tiny">
                    <tr>
                      <th className="py-2 pl-4 text-left capitalize">Stt</th>
                      <th className="py-2 pl-4 text-left capitalize">
                        Tên người thi
                      </th>
                      <th className="py-2 pl-4 text-left capitalize">Điểm</th>
                      <th className="py-2 pl-4 text-left capitalize">Ngày</th>
                      <th className="py-2 pl-4 text-left capitalize">
                        Thời gian bắt đầu
                      </th>
                      <th className="py-2 pl-4 text-left capitalize">
                        Thời gian kết thúc
                      </th>
                      <th className="py-2 pl-4 text-left capitalize">
                        Thời gian làm bài
                      </th>
                      <th className="py-2 pl-4 text-left capitalize">
                        Chi tiết
                      </th>
                      <th className="py-2 pl-4 text-left capitalize">Action</th>
                    </tr>
                  </thead>
                  <tbody className="py-4">
                    {usersDoExam.length &&
                      usersDoExam.map((user: IUserDoExam, index: number) => (
                        <tr
                          key={user.startTime + user.username}
                          className="mb-4 border-b border-slate-200 last:border-none
                      text-slate-800 text-sm cursor-pointer even:bg-slate-100"
                        >
                          <td className="pl-4 py-4">{index + 1}</td>
                          <td className="pl-4 font-semibold">
                            {user.username}
                          </td>
                          <td className="pl-4 font-semibold">{user.point}</td>
                          <td className="pl-4">{getDate(user.startTime)}</td>
                          <td className="pl-4">{getTime(user.startTime)}</td>
                          <td className="pl-4">
                            {user.endTime ? (
                              getTime(user.endTime)
                            ) : (
                              <span className="text-red-500 font-semibold">
                                Chưa nộp bài
                              </span>
                            )}
                          </td>
                          <td className="pl-4">
                            {user.endTime
                              ? getDistance(user.startTime, user.endTime)
                              : null}
                          </td>
                          <td className="pl-4 font-semibold text-primary-800">
                            <Link
                              to={`/tests/${id}/statistic/detail?user_id=${user.userID}`}
                            >
                              Xem chi tiết
                            </Link>
                          </td>
                          <td className="pl-4">
                            <button
                              onClick={() => requestDeleteUserExam(index)}
                            >
                              <ToolTip title="Xóa">
                                <RiDeleteBin6Line className="text-red-500" />
                              </ToolTip>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-center text-slate-800 mt-10">
                Hiện chưa có kết quả thống kê nào cho đề thi này !
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default withBackTop(StatisticExam);
