import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import AddFormComponent from './addForm.component';
import {ReimbursementForm} from './reimbursementForm';

test('one form is rendered', () => {
    const form = new ReimbursementForm();
    form.appId = 8;
    const wrapper = mount(<BrowserRouter><AddFormComponent></AddFormComponent></BrowserRouter>);
    expect(wrapper.find('p.appId').html()).toBe('<b>Application: 8</b>');
})