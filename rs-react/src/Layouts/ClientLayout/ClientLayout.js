import React from 'react';
import "./ClientLayaut.css";

export function ClientLayout(props) {
  const {children} =props;
  return (
    <div>
      <p>ClientLayaut</p>

        {children}
      </div>
  );
}


