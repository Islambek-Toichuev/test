import React, { Component } from "react";
import styled from "styled-components";
import "./style.css";

const Pop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface Props {
  onClose: any;
  title?: string;
}

export default class PopUp extends Component<Props> {
  render() {
    let { onClose, title } = this.props;
    return (
      <Pop>
        <div className="overlay" />
        <div className="popup-body">
          <div className="title">
            {title}
            <span className="close" onClick={() => onClose()}>
              &times;
            </span>
          </div>
          <div className="popup-content">{this.props.children}</div>
        </div>
      </Pop>
    );
  }
}
