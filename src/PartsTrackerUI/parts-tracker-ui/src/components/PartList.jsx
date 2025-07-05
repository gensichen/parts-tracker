import { useEffect, useState } from 'react';
import { getParts } from '../api/partsapi';

function PartList() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    getParts().then(setParts);
  }, []);

  return (
    <div>
      <h2>Parts Inventory</h2>
      <ul>
        {parts.map(p => (
          <li key={p.partNumber}>
            {p.partNumber} - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartList;
