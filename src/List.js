import React from "react";

const List = (props) => {
  return <ul>
    {
      props.items.map(item => <li onClick ={props.handleClick}  key={item}>{item.name}</li>)
    }
      </ul>;
};

export default List;
