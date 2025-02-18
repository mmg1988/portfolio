'use client'

import * as Styles from './styles';
import pokemon from './pokemon.json';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

export default function Page() {
  const [filtered, setFiltered] = useState(pokemon);

  const handleSearchChange = useCallback(debounce((searchTerm: string) => {
    setFiltered(pokemon.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, 400), []);

  return (
    <div className={'flex-column gap-2 align-start'}>
      <Styles.TitleLogo>
        <Image src={'/pokemon-logo.svg'} alt={'pokemon'} height={100} width={200} priority />
      </Styles.TitleLogo>
      <Styles.SearchInput>
        <i className={'material-symbols-outlined'}>search</i>
        <input placeholder='Search pokemon...' onChange={e => handleSearchChange(e.target.value)} />
      </Styles.SearchInput>
      {!filtered.length &&
        <Styles.NoResults>
          <i className={'material-symbols-outlined'}>track_changes</i>
          <p>No pokemon found</p>
        </Styles.NoResults>
      }
      <Styles.CardList>
        {filtered.map(x => (
          <Styles.Card
            key={x.id}
            type={x.typeofpokemon[0].toLowerCase()}
          >
            <Styles.FrontSide>
              <header>
                <Styles.Id>{x.id.substring(1)}</Styles.Id>
                <Image src={x.imageurl} alt={x.name} width={128} height={128}/>
              </header>
              <main>
                <Styles.Title>{x.name}</Styles.Title>
                <Styles.TypeIcon name={x.typeofpokemon[0].toLowerCase()} />
              </main>
            </Styles.FrontSide>
            <Styles.BackSide>
              <header>
                <Styles.Id>{x.id.substring(1)}</Styles.Id>
                <Styles.Title>{x.name}</Styles.Title>
              </header>
              <main>
                <Styles.Space />
                <Styles.Types>
                  {x.typeofpokemon.map(t => (
                    <Styles.TypeIcon key={t} name={t.toLowerCase()} />
                  ))}
                </Styles.Types>
                <Styles.Space />
                <Styles.Stats>
                  <div>
                    <span>HP</span><span>{x.hp}</span>
                  </div>
                  <div>
                    <span>Attack</span><span>{x.attack}</span>
                  </div>
                  <div>
                    <span>Defense</span><span>{x.defense}</span>
                  </div>
                  <div>
                    <span>Sp. Attack</span><span>{x.special_attack}</span>
                  </div>
                  <div>
                    <span>Sp. Defense</span><span>{x.special_defense}</span>
                  </div>
                  <div>
                    <span>Total</span><span>{x.total}</span>
                  </div>
                </Styles.Stats>
              </main>
            </Styles.BackSide>
          </Styles.Card>
        ))}
      </Styles.CardList>
    </div>
  );
}