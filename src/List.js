import React from "react";

const List = (props) => {
  return <ul>
    {
      props.items.map((item,index) => <li tabIndex={index} onFocus = {()=>props.handleActiveMarker(item.id)} onClick = {()=>props.handleActiveMarker(item.id)}  key={item.id}>{item.name}</li>)
    }
      </ul>;
};

export default List;
  