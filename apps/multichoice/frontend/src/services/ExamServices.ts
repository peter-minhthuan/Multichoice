import { IAnswers } from '../store/rootReducer';
import { Api } from './Api';

export interface IPayloadStartExam {
  username: string;
  topicID: number;
}

export interface IPayloadEndExam {
  userID: number;
  AnswersUsers: IAnswers[];
}

export interface IPayloadgetListExamByTopicId {
  topicID: number;
}

export interface IPayloadGetUserExamDetail {
  topicId: number;
  userId: number;
}

class ExamServices extends Api {
  getExamInfor(examUrl: string) {
    const data = this.get('/' + examUrl);
    return data;
  }

  startExam(payload: IPayloadStartExam) {
    const data = this.post('/exam/start', payload);
    return data;
  }

  // end Exam
  submitExam(payload: IPayloadEndExam) {
    const data = this.post('/exam/end', payload);
    return data;
  }

  getListExamByTopicId(payload: IPayloadgetListExamByTopicId) {
    const data = this.get('/getListexambytopicid/' + payload.topicID);
    return data;
  }

  getUserExamDetail(payload: IPayloadGetUserExamDetail) {
    const data = this.get(
      `/getuserexamdetail/${payload.topicId}&&${payload.userId}`
    );
    return data;
  }
}

export const examServices = new ExamServices();
