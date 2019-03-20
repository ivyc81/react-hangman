import React from 'react';
import ReactDOM from 'react-dom';
import Hangman from './Hangman';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import img0 from './0.jpg';
import img1 from './1.jpg';

//smoke test
it('renders without crashing', () => {
    shallow(<Hangman />);
});

//snapshot test
it('renders correctly', () => {
    let wrapper = shallow(<Hangman />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});


it('changes state and re-renders after correct guess', () => {
    let wrapper = shallow(<Hangman />);

    wrapper.find("button[value='a']").simulate('click', {target: { value: "a"}});

    let image = wrapper.find('img').first();
    expect(image.equals(<img src={ img0 } />)).toEqual(true);

    let hangmanWord = wrapper.find('p[className="Hangman-word"]');
    expect(hangmanWord.equals(<p className="Hangman-word">a____</p>)).toEqual(true);
});

it('changes state and re-renders after wrong guess', () => {
    let wrapper = shallow(<Hangman />);

    wrapper.find("button[value='b']").simulate('click', {target: { value: "b"}});

    let image = wrapper.find('img').first();
    expect(image.equals(<img src={ img1 } />)).toEqual(true);

    let hangmanWord = wrapper.find('p[className="Hangman-word"]');
    expect(hangmanWord.equals(<p className="Hangman-word">_____</p>)).toEqual(true);
});

