import React from 'react';
import ReactDOM from 'react-dom';
import Hangman from './Hangman';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';


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
    expect(image.equals(<img src='0.jpg'  />)).toEqual(true);

    let hangmanWord = wrapper.find('p[className="Hangman-word"]');
    expect(hangmanWord.equals(<p className="Hangman-word">a____</p>)).toEqual(true);
});

it('changes state and re-renders after wrong guess', () => {
    let wrapper = shallow(<Hangman />);

    wrapper.find("button[value='b']").simulate('click', {target: { value: "b"}});

    let image = wrapper.find('img').first();
    expect(image.equals(<img src='1.jpg' />)).toEqual(true);

    let hangmanWord = wrapper.find('p[className="Hangman-word"]');
    expect(hangmanWord.equals(<p className="Hangman-word">_____</p>)).toEqual(true);
});

it('shows endgame screen when maxGuesses is reached', () => {
    let wrapper = mount(<Hangman />);

    wrapper.setState({nWrong: wrapper.props().maxWrong});

    let image = wrapper.find('img').first();
    expect(image.equals(<img src='6.jpg' />)).toEqual(true);

    let button = wrapper.find('button').first();
    expect(button.exists()).toBe(false);

    let word = wrapper.find('p[className="Hangman-word"]');
    expect(word.equals(<p className="Hangman-word">{wrapper.state().answer}</p>)).toEqual(true);

    expect(wrapper.html()).toContain("You Lose");

})

