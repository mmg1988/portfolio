import { useState } from 'react';
import { Table } from '../table';
import * as Styles from './styles';

export const DataGrid = ({
  columns,
  items
}:Readonly<{
  columns: { field: string, name: string, numeric: boolean }[],
  items: { [key: string]: unknown }[]
}>) => {
    const [sortedItems, setSortedItems] = useState<{ [key: string]: unknown }[]>(items);
    const [sortBy, setSortBy] = useState('');
    const [sortDir, setSortDir] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractValue = (item: any, field: string) => {
    const splits = field.split('.');
    const value = splits.length > 1 ? item[splits[0]][splits[1]] : item[splits[0]];
    return Array.isArray(value) || value instanceof Object ? JSON.stringify(value) : value;
  };

  const handleSortColumn = (field: string) => {
    const newSortDir = sortDir * -1;
    setSortBy(field);
    setSortDir(newSortDir);
    const sorted = items.sort((a, b) => {
      const aVal = extractValue(a, field);
      const bVal = extractValue(b, field);
      let result = 0;
      if (!isNaN(aVal))
        result = aVal - bVal;
      else
        result = aVal > bVal ? 1 : -1;
      return result * sortDir;
    });
    setSortedItems(sorted);
  };

  return (
    <Table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.field} onClick={() => handleSortColumn(col.field)}>
              <div className={`flex align-center ${col.numeric ? 'justify-start flex-reverse' : ''}`}>
                <span>{col.name}</span>
                <Styles.SortIcon
                  active={col.field == sortBy}
                  dir={sortDir == 1 ? 'asc' : 'desc'}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item, i) => (
          <tr key={item['id']?.toString() ?? i}>
            {columns.map(col => (
              <td key={col.field} className={col.numeric ? 'text-right' : 'text-left'}>
                {extractValue(item, col.field)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      
    </Table>
  ); 
};