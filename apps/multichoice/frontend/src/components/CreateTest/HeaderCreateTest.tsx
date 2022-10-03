import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../Commons/Breadcrumb/Breadcrumb';

interface IHeaderCreateTest {
  onSubmitCreateTest: () => void;
}

const HeaderCreateTest: React.FC<IHeaderCreateTest> = ({
  onSubmitCreateTest,
}) => {
  const navigate = useNavigate();

  return (
    <div className="header-create-test">
      <div className="container flex justify-between py-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/tests">Đề thi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div>Tạo mới đề thi</div>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="ctas flex items-center">
          <button
            onClick={() => navigate('/tests')}
            className="cancle-create mr-4 focus:outline-none focus:ring
            focus:ring-slate-200 rounded-md flex justify-center
             items-center w-24 h-10 text-sm text-slate-800 font-bold border border-solid border-slate-800"
          >
            Hủy
          </button>
          <button
            className="create-test btn-primary rounded-md flex justify-center items-center w-32 h-10 text-sm
            text-white font-bold bg-primary-900 transition-all duration-200 hover:bg-opacity-90"
            onClick={() => onSubmitCreateTest()}
          >
            Tạo mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCreateTest;
