import React from 'react';
import './style.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
}

const Button = (props: ButtonProps) => {
  const { icon, label = 'Label', isSelected } = props;
  return (
    <button className={`item__button ${isSelected ? 'item__button--selected' : ''}`} {...props}>
      <span className="item__label">{label}</span>
      {icon && <span className="item__icon flex-center">{icon}</span>}
    </button>
  );
};

export default Button;
