import React from 'react';
import { Button } from './Button';

const buttons = {
  title: 'Example/Button',
  component: Button,
};

export default buttons;

const TemplateStory = (args) => <Button {...args} />;

const ButtonFilled = TemplateStory.bind({});
ButtonFilled.args = {
  variant: 'filled',
  type: 'button',
  label: 'Filled',
};

const ButtonOutlined = TemplateStory.bind({});
ButtonOutlined.args = {
  variant: 'outlined',
  type: 'button',
  label: 'Outlined',
};

export { ButtonFilled, ButtonOutlined };
