import { useCallback, useEffect, useRef, useState } from 'react';
import { dequeue } from './queues-slice';
import * as Styles from './styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { add } from './commands-slice';
import { IService } from './service';

export const Instance = ({
  id,
  service,
  speed
}: Readonly<{
  id: string,
  service: IService,
  speed: number
}>) => {
  const [status, setStatus] = useState('starting');
  const [message, setMessage] = useState<string | null>();
  const queues = useAppSelector(store => store.queues);
  const dispatch = useAppDispatch();
  const processor = useRef<() => void>(() => {});
  
  const delay = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));
  const process = useCallback(() => new Promise(() => {
    let ms = 50 / speed;
    if (status == 'destroyed') {
      return;
    } else if (status == 'stopped') {
      return delay(ms).then(() => processor.current());
    }
    const message = queues[service.queue]?.messages?.[0];
    let newStatus = 'ready';
    if (message) {
      dispatch(dequeue({ queue: service.queue, message }));
      newStatus = 'processing';
      ms = (1000 + Math.random() * 6000) / speed;
      dispatch(add(`[${id}] CONSUMING ${message}`));
      setMessage(message);
    } else {
      setMessage(null);
    }
    setStatus(newStatus);
    return delay(ms).then(() => processor.current());
  }), [speed, status, queues, service.queue, dispatch, id]);

  useEffect(() => {
    processor.current = process;
    if (status == 'starting') {
      processor.current();
    }
  }, [status, process]);

  const toggle = () => {
    if (status == 'stopped') {
      setStatus('ready');
    } else {
      setStatus('stopped');
      setMessage(null);
    }
    
  };
  
  return (
    <Styles.Instance
      active={status != 'stopped'}
      onClick={() => toggle()}
    >
      <i className={'material-symbols-outlined'} style={{ fontSize: 36 }}>deployed_code</i>
      <div className={'caption'}>{status}</div>
      {message && <Styles.Message>{message}</Styles.Message>}
    </Styles.Instance>
  );
};