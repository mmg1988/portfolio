import { useCallback, useEffect, useRef, useState } from 'react';
import * as Styles from './styles';
import { enqueue } from './queues-slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { add } from './commands-slice';
import { delay } from '@/app/_components/tools';

export const Console = ({
  speed
}: Readonly<{
  speed: number
}>) => {
  const commands = useAppSelector(store => store.commands);
  const queues = useAppSelector(store => store.queues);
  const dispatch = useAppDispatch();
  const intervalRef = useRef<() => void>(null);
  const [initialized, setInitialized] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true);

    return () => {
      setRunning(false);
    };
  }, []);

  const sendRandomCommand = useCallback(() => {
    if (!running)
      return;

    const broadcast = Math.random() > 0.75;
    let newCommand = '';
    const entries = Object.entries(queues);
    if (!entries.length)
      return delay(1000 / speed).then(() => intervalRef.current!());

    if (broadcast) {
      newCommand = '[APP] - SEND broadcast';
      entries.forEach(([id, queue]) => dispatch(enqueue({ queue: id, message: `M${queue.counter + 1}` })));
    } else {
      const candidate = 1 + Math.floor(Math.random() * entries.length);
      const queue = queues[`Q${candidate}`]!;
      newCommand = `[APP] - SEND message M${queue.counter + 1} to ${String.fromCharCode(65 + candidate - 1)}`;
      dispatch(enqueue({ queue: queue.id, message: `M${queue.counter + 1}` }));
    }
    dispatch(add(newCommand));
    delay(1000 / speed).then(() => intervalRef.current!());
  }, [dispatch, running, queues, speed]);

  useEffect(() => {
    intervalRef.current = sendRandomCommand;
    if (!initialized && running) {
      setInitialized(true);
      intervalRef.current!();
    }
  }, [initialized, running, sendRandomCommand]);

  return (
    <Styles.Console className={'box'}>
      {commands.slice(-50).map((cmd, i) => (
        <div key={i}>{cmd}</div>
      ))}
    </Styles.Console>
  );

};