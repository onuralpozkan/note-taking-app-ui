import React from 'react';
import './style.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
}

const Button = (props: ButtonProps) => {
  const { icon, label = 'Label', selected } = props;
  return (
    <button className={`item__button ${selected ? 'item__button--selected' : ''}`} {...props}>
      <span className="item__label">{label}</span>
      {icon && <span className="item__icon flex-center">{icon}</span>}
    </button>
  );
};

export default Button;
