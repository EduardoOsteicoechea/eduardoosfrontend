import "./Sidebar_002.css"
import React from 'react';

interface Sidebar002Props {
  grid_row?: string;
  grid_row_span?: string;
  grid_column?: string;
  grid_column_span?: string;
}

const Sidebar_002: React.FC<Sidebar002Props> = ({
  grid_row,
  grid_row_span,
  grid_column,
  grid_column_span,
}) => {
  
  
  return (
    <div
      className="Sidebar_002"
      style={{
        gridRow: grid_row,
        gridRowStart: grid_row,
        gridRowEnd: grid_row_span ? `span ${grid_row_span}` : undefined,
        gridColumn: grid_column,
        gridColumnStart: grid_column,
        gridColumnEnd: grid_column_span ? `span ${grid_column_span}` : undefined,
      }}
    >
      
      Sidebar Content
    </div>
  );
};

export default Sidebar_002;