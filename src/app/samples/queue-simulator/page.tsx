'use client'

import { useEffect, useState } from 'react';
import { IconButton } from '@/app/_components/icon-button';
import { Console } from './console';
import { IService, Service } from './service';
import { Queue } from './queue';

interface Queue {
  id: string;
  counter: number;
  messages: string[];
}

export default function Page() {
  const [services, setServices] = useState<IService[]>([]);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const initServices = Array.from({ length: 3 }).map((_, i) => ({
      name: String.fromCharCode(65 + i),
      instances: [],
      queue: `Q${i + 1}`
    }));
    setServices(initServices);
  }, []);

  return (
    <div className={'flex-column gap-3 align-center'}>
      <div className={'flex gap-2 align-center'}>
        <IconButton
          size={'xs'}
          onClick={() => setSpeed(speed => Math.max(speed - 0.5, 0.5))}
          disabled={speed == 0.5}
        >
          <i className={'material-symbols-outlined'}>remove</i>
        </IconButton>
        <div className={'body-2'}>Speed: {speed.toFixed(2)}x</div>
        <IconButton
          size={'xs'}
          onClick={() => setSpeed(speed => Math.min(speed + 0.5, 5))}
          disabled={speed == 5}
        >
          <i className={'material-symbols-outlined'}>add</i>
        </IconButton>
      </div>
      <div className={'flex gap-1 flex-wrap justify-center'} style={{ width: '100%' }}>
        <Console speed={speed} />
        <div className={'flex gap-1 flex-wrap justify-center adjust-w'} style={{ flex: '800px', maxWidth: '100%' }}>
          {services.map(service => (
            <div key={service.name} className={'flex-column gap-1 flex-item adjust-w'} style={{ flex: '0 1 max(calc(50% - 0.5em), 400px)', maxWidth: '100%' }}>
              <Service
                service={service}
                speed={speed}
              />
              <Queue id={service.queue} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}