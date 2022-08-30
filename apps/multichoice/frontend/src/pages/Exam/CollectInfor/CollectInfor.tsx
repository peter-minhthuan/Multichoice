import React, { createRef } from 'react';
import imgExam from '../../../assets/images/bg-exam.avif';
import Input from '../../../components/Commons/Input/Input';
import { examStore } from '../../../store/rootReducer';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  examServices,
  IPayloadStartExam,
} from '../../../services/ExamServices';
import { notify } from '../../../helper/notify';
import { iNotification } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';

const schemaInfor = yup
  .object()
  .shape({
    user_name: yup.string().min(2, 'User name must be at least 2 characters'),
  })
  .required();

interface IColectInfor {
  user_name: string;
}

const CollectInfor: React.FC = () => {
  const navigate = useNavigate();
  const { exam } = examStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IColectInfor>({
    resolver: yupResolver(schemaInfor),
  });

  const onSubmit: SubmitHandler<IColectInfor> = async (
    formData: IColectInfor
  ) => {
    try {
      const payload: IPayloadStartExam = {
        topicID: exam.id,
        username: formData.user_name,
      };
      const { data } = await examServices.startExam(payload);
      if (data.success) {
        const urlNavigate = '/exam/' + exam.url + '/do-exam';
        navigate(urlNavigate);
      }
    } catch (error) {
      notify({
        message: 'Something went wrong !',
        type: 'danger',
      } as iNotification);
    }
  };

  return (
    <div className="container h-screen flex items-center">
      <form
        className="form colect-infor h-[750px] w-full flex items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="left h-full w-[500px]">
          <img
            src={imgExam}
            alt="exam multichoice"
            className="block h-full w-full object-cover"
          />
        </div>
        <div className="right flex-1 bg-white h-full relative">
          <div className="top absolute w-full top-1/2 transform -translate-y-1/2">
            <div className="text-center">
              <h4 className="text-slate-800 text-3xl">{exam.title}</h4>
              <p className="mt-2">{exam.description}</p>
            </div>
            <div className="pt-8 px-10">
              <Input
                registerField={register('user_name')}
                placeholder="Họ và tên"
                textLabel="Họ và tên người tham gia"
                isError={Boolean(errors.user_name)}
                errMessage={errors.user_name?.message}
                isRequired={true}
                inputSize="md"
              />
              <button
                type="submit"
                className="mt-10 btn-primary rounded-md flex justify-center items-center w-full h-12 text-sm
              text-white font-bold bg-primary-900 transition-all duration-200 hover:bg-opacity-90"
              >
                Bắt đầu thi
              </button>
            </div>
          </div>

          <div className="bottom text-center w-full px-10 py-4 mt-auto absolute bottom-0">
            <p className="text-sm ">
              &copy; 2022 Estates. All rights reserved | Designed by{' '}
              <span className="font-semibold text-primary-900">
                Multichoice Team
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectInfor;
