import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderEditTest from '../../components/EditTest/HeaderEditTest';
import QuestionList from '../../components/QuestionList/QuestionList';
import { withBackTop } from '../../HOCs/withBackTop';
import { topicServices } from '../../services/Title/TopicServices';
import { topicStore } from '../../store/rootReducer';
import { ITopicDetailResponse } from '../../types';

const EditTest: React.FC = () => {
  const query = useParams();
  const navigate = useNavigate();
  const { setTopicDetail } = topicStore();

  const getTopicDetail = async () => {
    const { id } = query;
    try {
      const { data } = await topicServices.getTopicById(Number(id));
      setTopicDetail(data);
    } catch {
      navigate('/');
    }
  };

  useEffect(() => {
    getTopicDetail();
    return () => {
      setTopicDetail({} as ITopicDetailResponse);
    };
  }, []);

  return (
    <div className="edit-test">
      <HeaderEditTest />

      <div className="pt-5 pb-10">
        <QuestionList />
      </div>
    </div>
  );
};

export default withBackTop(EditTest);
