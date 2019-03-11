import React from 'react';

export default function ItemTable(props) {

  return (
    <div className="container box-shadow-triple">
      <table className="banana responsive grape-text">
        <tr>
          <th>Item</th>
          <th>Owner</th>
          <th>Who has it?</th>
          <th>Due back?</th>
        </tr>
        {props.groupItems.map((i) => (
          <tr>
            <td>{i.itemName}</td>
            <td>{i.owner}</td>
            <td>{i.whoHasIt}</td>
            <td>{i.dueBack}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
