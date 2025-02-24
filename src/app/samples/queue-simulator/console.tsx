import { useCallback, useEffect } from 'react';
import * as Styles from './styles';
import { enqueue } from './queues-slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { add } from './commands-slice';

export const Console = ({
  speed
}: Readonly<{
  speed: number
}>) => {
  const commands = useAppSelector(store => store.commands);
  const queues = useAppSelector(store => store.queues);
  const dispatch = useAppDispatch();

  const sendRandomCommand = useCallback(() => {
    const broadcast = Math.random() > 0.75;
    let newCommand = '';
    const entries = Object.entries(queues);
    if (!entries.length)
      return;

    if (broadcast) {
      newCommand = '[APP] - SEND broadcast';
      entries.forEach(([id, queue]) => dispatch(enqueue({ queue: id, message: `M${queue.counter + 1}` })));
    } else {
      const candidate = 1 + Math.floor(Math.random() * entries.length);
      const queue = queues[`Q${candidate}`]!;
      newCommand = `[APP] - SEND message to ${String.fromCharCode(65 + candidate - 1)}`;
      dispatch(enqueue({ queue: queue.id, message: `M${queue.counter + 1}` }));
    }
    dispatch(add(newCommand));
  }, [dispatch, queues]);

  useEffect(() => {
    const interval = setInterval(sendRandomCommand, 1000 / speed);
    return () => {
      clearInterval(interval);
    };
  }, [sendRandomCommand, speed]);

  return (
    <Styles.Console className={'box'}>
      {commands.slice(-50).map((cmd, i) => (
        <div key={i}>{cmd}</div>
      ))}
    </Styles.Console>
  );

};