'use client'

import { KeyboardEvent, useState } from 'react';
import * as Styles from './styles';
import { Spinner } from '@/app/_components/spinner';
import { IconButton } from '@/app/_components/icon-button';
import { DataGrid } from '@/app/_components/data-grid';

export default function Page() {
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<{ field: string, name: string, numeric: boolean }[]>([]);
  const [data, setData] = useState([]);

  const sendPrompt = async () => {
    setLoading(true);
    try {
      const result = await fetch(`/api/ai-json`, {
        method: 'POST',
        body: JSON.stringify({ message })
      }).then(response => {
        if (!response.ok) {
          return response.json()
            .catch(() => Promise.reject(response.statusText))
            .then(json => Promise.reject(json.message));
        }

        return response.json();
      });
      generateSchema(result);
      setError('');
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateSchema = (data: any[]) => {
    console.debug(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = Array.isArray(data) ? data : Object.entries(data)[0][1] as any[];
    const columns = [];
    const keys = Object.keys(items[0]);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (items[0][key] instanceof Object && !Array.isArray(items[0][key])) {
        const innerKeys = Object.keys(items[0][key]);
        if (innerKeys.length) {
          innerKeys.forEach(innerKey => {
            const name = innerKey.split('_').join(' ');
            columns.push({ field: `${key}.${innerKey}`, name: name.at(0)!.toUpperCase() + name.substring(1), numeric: !isNaN(items[0][key][innerKey]) });
          });
        }
      } else {
        const name = key.split('_').join(' ');
        columns.push({ field: key, name: name.at(0)!.toUpperCase() + name.substring(1), numeric: !isNaN(items[0][key]) });
      }
    }
    setColumns(columns);
    setData(items as never[]);
  };

  const reset = () => {
    setData([]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <div className={'flex-column gap-4 flex-item justify-center adjust-v'}>
      <div className={'headline-3 text-center'}>AI DataGen</div>
      <div className={'flex-item'}></div>
      {!data.length &&
        <div className={'flex gap-2 justify-center'}>
          {isLoading &&
            <div className={'headline-4 flex-column align-center gap-4'}>
              <Spinner />
              <div>Generating data...</div>
            </div>
          }
          {!isLoading &&
            <form className={'flex-column flex-item gap-2'} onSubmit={sendPrompt}>
              <Styles.PromptInput>
                <textarea
                  placeholder={'Write some sentence to generate some desire data, i.e: "students with average per subject" or "top 50 most valuable companies, including owner and country"'}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Styles.SendButton>
                  <IconButton
                    size={'lg'}
                    type={'submit'}
                    disabled={!message}
                  >
                    <i className={'material-symbols-outlined'}>prompt_suggestion</i>
                  </IconButton>
                </Styles.SendButton>
              </Styles.PromptInput>
              {error && <Styles.Error>{error}</Styles.Error>}
            </form>
          }
        </div>
      }
      {!!data.length &&
        <div className={'flex-column gap-2 adjust-v'}>
          <div className={'flex align-center'}>
            <div className={'flex-item body-2'}>prompt: {message}</div>
            <IconButton onClick={reset}>
              <i className={'material-symbols-outlined'}>edit</i>
            </IconButton>
          </div>
          <DataGrid
            columns={columns}
            items={data}
          />
        </div>
      }
      <div className={'flex-item'}></div>
    </div>
  );
}