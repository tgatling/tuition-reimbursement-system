import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import {ReimbursementForm} from '../reimbursement/reimbursementForm';
import ConfirmGradeComponent from './confirmGrade.component';
import GradeDisplayComponent from './gradeDisplay.component';


test('grade should render', () => {
    const wrapper = mount(<BrowserRouter><ConfirmGradeComponent></ConfirmGradeComponent></BrowserRouter>);
})