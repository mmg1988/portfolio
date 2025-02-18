'use client'

import { useState } from 'react';
import * as Styles from './styles';

export default function Page() {
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const sendPrompt = async () => {
    const result = await fetch(`/api/ai-json`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    console.log(result);
  };

  return (
    <div className={'flex-column flex-item justify-center'}>
      {!data.length &&
        <div className={'flex-column gap-2 align-end'}>
          <Styles.PromptInput>
            <textarea
              placeholder={'Write some sentence to generate some desire data, i.e: "students with average per subject"'}
              onChange={e => setMessage(e.target.value)}
            />
            <Styles.IconButton onClick={sendPrompt}>
              <i className={'material-symbols-outlined'}>send</i>
            </Styles.IconButton>
          </Styles.PromptInput>
        </div>
      }
      {!!data.length &&
        <Styles.TableContainer>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {data.map(x => (
                <tr key={x.email}>
                  <td>{x.firstName} {x.lastName}</td>
                  <td>{x.email}</td>
                  <td>{x.phoneNumber}</td>
                  <td>{x.street}, {x.city}, {x.state}, {x.country}, {x.zip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Styles.TableContainer>
      }
    </div>
  );
}