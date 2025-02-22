'use client'

import { useCallback, useEffect, useState } from 'react';
import * as Styles from './styles';

interface Service {
  name: string;
  instances: Instance[];
  queue: Queue;
}

interface Instance {
  id: string;
  status: 'ready' | 'processing' | 'stopped';
  message: string | null;
  speed: number;
}

interface Queue {
  id: string;
  counter: number;
  messages: string[];
}

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const [queues, setQueues] = useState<Map<string, Queue>>(new Map<string, Queue>());
  const [commands, setCommands] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const initQueues = new Map<string, Queue>(Array.from({ length: 3 }).map((_, i) => [`Q${i + 1}`, { id: `Q${i + 1}`, counter: 0, messages: [] }]));
    const initServices = Array.from({ length: 3 }).map((_, i) => ({
      name: String.fromCharCode(65 + i),
      instances: [],
      queue: initQueues.get(`Q${i + 1}`)!
    }));
    initServices.forEach(service => Array.from({ length: 2 }).forEach(() => createInstance(service)));
    setServices(initServices);
    setQueues(initQueues);
  }, []);

  useEffect(() => {
    services.forEach(service => service.instances.forEach(instance => instance.speed = speed));
  }, [services, speed]);

  const sendRandomCommand = useCallback(() => {
    const broadcast = Math.random() > 0.75;
    let newCommand = '';
    if (broadcast) {
      newCommand = '[APP] - SEND broadcast';
      queues.forEach(queue => queue.messages.push(`M${++queue.counter}`));
    } else {
      const candidate = 1 + Math.floor(Math.random() * queues.size);
      const queue = queues.get(`Q${candidate}`)!;
      queue.messages.push(`M${++queue.counter}`);
      newCommand = `[APP] - SEND message to ${String.fromCharCode(65 + candidate - 1)}`;
    }
    setCommands(commands => [...commands, newCommand]);
    setQueues(new Map<string, Queue>(queues));
  }, [queues]);

  useEffect(() => {
    const interval = setInterval(sendRandomCommand, 1000 / speed);
    return () => {
      clearInterval(interval);
    };
  }, [sendRandomCommand, speed]);

  const createInstance = (service: Service) => {
    const instance: Instance = ({
      id: Math.random().toString(16).substring(2),
      status: 'ready',
      message: null,
      speed: speed
    });
    service.instances.push(instance);
    const delay = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));
    const dequeueProcess = () => new Promise(() => {
      let ms = 50 / instance.speed;
      if (instance.status == 'stopped') {
        return delay(ms).then(() => dequeueProcess());
      }
      const [message] = service.queue.messages.splice(0, 1);
      instance.status = 'ready';
      instance.message = null;
      if (message) {
        instance.status = 'processing';
        instance.message = message;
        ms = (1000 + Math.random() * 6000) / instance.speed;
        setCommands(commands => [...commands, `[${instance.id}] CONSUMING ${message}`]);
      } else {
        setCommands(commands => [...commands]);
      }
      return delay(ms).then(() => dequeueProcess());
    });
    dequeueProcess();
    return instance;
  };

  const toggleInstance = (instance: Instance) => {
    if (instance.status == 'stopped') {
      instance.status = 'ready';
    } else {
      instance.status = 'stopped';
      instance.message = null;
    }
  };

  return (
    <div className={'flex-column gap-3 align-center'}>
      <div className={'flex gap-2 align-center'}>
        <Styles.IconButton
          onClick={() => setSpeed(speed => Math.max(speed - 0.5, 0.5))}
          disabled={speed == 0.5}
        >
          <i className={'material-symbols-outlined'}>remove</i>
        </Styles.IconButton>
        <div className={'body-2'}>Speed: {speed.toFixed(2)}x</div>
        <Styles.IconButton
          onClick={() => setSpeed(speed => Math.min(speed + 0.5, 5))}
          disabled={speed == 5}
        >
          <i className={'material-symbols-outlined'}>add</i>
        </Styles.IconButton>
      </div>
      <div className={'flex gap-1 flex-wrap justify-center'} style={{ width: '100%' }}>
        <Styles.Console className={'box'}>
          {commands.slice(-50).map((cmd, i) => (
            <div key={i}>{cmd}</div>
          ))}
        </Styles.Console>
        <div className={'flex gap-1 flex-wrap justify-center adjust-w'} style={{ flex: '800px', maxWidth: '100%' }}>
          {services.map(service => (
            <div key={service.name} className={'flex-column gap-1 flex-item adjust-w'} style={{ flex: '0 1 max(calc(50% - 0.5em), 400px)', maxWidth: '100%' }}>
              <Styles.Service className={'box'}>
                <div>&lt;Service {service.name}&gt;</div>
                <div className={'flex flex-wrap gap-2 align-start'}>
                  {service.instances.map((instance, j) => (
                    <Styles.Instance
                      key={j}
                      active={instance.status != 'stopped'}
                      onClick={() => toggleInstance(instance)}
                    >
                      <i className={'material-symbols-outlined'} style={{ fontSize: 36 }}>deployed_code</i>
                      <div className={'caption'}>{instance.status}</div>
                      {instance.message && <Styles.Message>{instance.message}</Styles.Message>}
                    </Styles.Instance>
                  ))}
                  <Styles.AddInstance onClick={() => createInstance(service)}>
                    <i className={'material-symbols-outlined'} style={{ fontSize: 36 }}>add</i>
                    <div className={'caption'}>Add</div>
                  </Styles.AddInstance>
                </div>
              </Styles.Service>
              <Styles.Queue className={'box'}>
                <div>&lt;Queue {service.queue.id}&gt;</div>
                <div className={'flex gap-1'}>
                  {service.queue.messages?.map(message => (
                    <Styles.Message key={message}>{message}</Styles.Message>
                  ))}
                </div>
              </Styles.Queue>
              <div className={'caption text-right'}>length: {service.queue.messages.length}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}