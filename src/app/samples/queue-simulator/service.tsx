import { useEffect, useState } from 'react';
import { addQueue } from './queues-slice';
import * as Styles from './styles';
import { useAppDispatch } from '../hooks';
import { Instance } from './instance';

export interface IService {
  name: string;
  instances: string[];
  queue: string;
}

export const Service = ({
  service,
  speed
}: Readonly<{
  service: IService,
  speed: number
}>) => {
  const [instances, setInstances] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addQueue(service.queue));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    const newInstances = Array.from({ length: 2 }).map(() => Math.random().toString(16).substring(2));
    setInstances(newInstances);
  }, []);

  const addInstance = () => {
    setInstances(currentInstances => [...currentInstances, Math.random().toString(16).substring(2)]);
  };
  
  return (
    <Styles.Service className={'box'}>
      <div>&lt;Service {service.name}&gt;</div>
      <div className={'flex flex-wrap gap-2 align-start'}>
        {instances.map(id => (
          <Instance
            key={id}
            id={id}
            service={service}
            speed={speed}
          />
        ))}
        <Styles.AddInstance onClick={() => addInstance()}>
          <i className={'material-symbols-outlined'} style={{ fontSize: 36 }}>add</i>
          <div className={'caption'}>Add</div>
        </Styles.AddInstance>
      </div>
    </Styles.Service>
  );
};