import './Intro.scss';

import React from 'react';

import MenuLayout from '../menu/menu-layout/MenuLayout';
import { TIntro } from './Intro.types';

const Intro: React.FC<TIntro> = ({ setView }) => {
  return (
    <MenuLayout setView={setView}>
      <div className='intro'>
        <p className='intro_block'>
          As your species have reached the apex of the technological
          conundrum...
        </p>
        <p className='intro_block'>
          Once you have discovered the portal to the unknown at the edge of your
          home planetary system...
        </p>
        <p className='intro_block'>
          You don&apos;t know who has built the communication system that bonds
          stars with habitable planets...
        </p>
        <p className='intro_block'>
          And here starts your quest into the unknown. Will you prevail in the
          galaxy? Will you rule or grovel? Will you dominate or go extinct?
        </p>
      </div>
    </MenuLayout>
  );
};

export default Intro;
