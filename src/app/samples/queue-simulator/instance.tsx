import { useCallback, useEffect, useRef, useState } from 'react';
import { dequeue } from './queues-slice';
import * as Styles from './styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { add } from './commands-slice';
import { IService } from './service';

type Status = 'starting' | 'ready' | 'processing' | 'stopped';

export const Instance = ({
  id,
  service,
  speed
}: Readonly<{
  id: string,
  service: IService,
  speed: number
}>) => {
  const [status, setStatus] = useState<Status>('starting');
  const [message, setMessage] = useState<string | null>();
  const queues = useAppSelector(store => store.queues);
  const dispatch = useAppDispatch();
  const processRef = useRef<() => void>(null);

  useEffect(() => {
    if (status == 'ready' && queues[service.queue]?.messages?.length >= 1) {
      processRef.current!();
    }
  }, [status, queues, service.queue]);
  
  const delay = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));
  const process = useCallback(() => new Promise(async () => {
    if (status == 'stopped') {
      return;
    }
    const { payload: { message } } = dispatch(dequeue({ queue: service.queue }));
    if (message) {
      const timeMs = (1000 + Math.random() * 6000) / speed;
      dispatch(add(`[${id}] <${service.name}> CONSUMING ${message}`));
      setStatus('processing')
      setMessage(message);
      return delay(timeMs).then(() => processRef.current!());
    } else {
      setMessage(null);
    }
    setStatus('ready');
  }), [status, dispatch, service.queue, service.name, speed, id]);

  useEffect(() => {
    const start = processRef.current == null;
    processRef.current = process;
    if (start) {
      process();
    }
  }, [process]);

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