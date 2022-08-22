import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "./index.scss";

export default function Button(props) {
  const className = [props.className];

  if (props.isWhite) className.push("btn-white");
  if (props.isGray) className.push("btn-gray");
  if (props.isRed) className.push("btn-red");
  if (props.isSmall) className.push("btn-sm");
  if (props.isBlock) className.push("d-block");
  if (props.isPrimary) className.push("btn-primary");
  if (props.isDisabled) className.push("disabled");

  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  if (props.type === "link") {
    if (props.isExternal) {
      return (
        <a href={props.href} className={className.join(" ")} style={props.style}>
          {props.children}
        </a>
      );
    } else {
      return (
        <Link to={props.href} className={className.join(" ")} style={props.style} onClick={onClick}>
          {props.children}
        </Link>
      );
    }
  }

  return (
    <button className={className.join(" ")} idcus={props.isID} style={props.style} onClick={onClick}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "link", "submit"]),
  onClick: propTypes.func,
  href: propTypes.string,
  target: propTypes.string,
  className: propTypes.string,
  isDisabled: propTypes.bool,
  isSmall: propTypes.bool,
  isBlock: propTypes.bool,
  isExternal: propTypes.bool,
  isWhite: propTypes.bool,
  isPrimary: propTypes.bool,
  isID: propTypes.number,
};
