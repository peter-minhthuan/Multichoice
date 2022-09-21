import React, { useEffect } from 'react';
import { iNotification } from 'react-notifications-component';
import { useParams } from 'react-router-dom';
import HeaderDoExam from '../../../components/DoExam/HeaderDoExam';
import MainDoExam from '../../../components/DoExam/MainDoExam';
import { START_TIME } from '../../../constants/contstants';
import { notify } from '../../../helper/notify';
import {
  examServices,
  IPayloadStartExam,
} from '../../../services/ExamServices';
import { localServices } from '../../../services/LocalServices';
import { examStore, IInforUserDoExam } from '../../../store/rootReducer';

const DoExam: React.FC = () => {
  const { exam_id } = useParams();
  const {
    setExamData,
    exam,
    userDoExam,
    setUserData,
    setIsSubmitExam,
    setIsExpriedExam,
    isSubmitExam,
  } = examStore();

  const getExamInfor = async () => {
    try {
      const { data } = await examServices.getExamInfor(exam_id || '');
      setExamData(data);
    } catch (error) {
      //
    }
  };

  const startExam = async () => {
    if (!isSubmitExam) {
      setIsExpriedExam(false);
      setIsSubmitExam(false);
      try {
        const payload: IPayloadStartExam = {
          topicID: exam.id,
          username: userDoExam.user_name,
        };
        const { data } = await examServices.startExam(payload);

        if (data.success) {
          localServices.setData(START_TIME, Date.now());
          setUserData({
            user_name: userDoExam.user_name,
            user_id: data.data.userid,
          } as IInforUserDoExam);
        }
      } catch (error) {
        notify({
          message: 'Something went wrong !',
          type: 'danger',
        } as iNotification);
      }
    }
  };

  useEffect(() => {
    startExam();
    getExamInfor();
  }, []);

  return (
    <div>
      <HeaderDoExam />
      <MainDoExam />
    </div>
  );
};

export default DoExam;
