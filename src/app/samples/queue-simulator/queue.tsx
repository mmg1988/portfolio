import { useAppSelector } from '../hooks';
import * as Styles from './styles';

export const Queue = ({
  id
}: Readonly<{
  id: string
}>) => {
  const queues = useAppSelector(store => store.queues);

  return queues[id] ? (
    <>
      <Styles.Queue className={'box'}>
        <div>&lt;Queue {id}&gt;</div>
        <div className={'flex gap-1'}>
          {queues[id].messages?.map(message => (
            <Styles.Message key={message}>{message}</Styles.Message>
          ))}
        </div>
      </Styles.Queue>
      <div className={'caption text-right'}>length: {queues[id].messages.length}</div>
    </>
  ) : null;
}