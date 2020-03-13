import './About.scss';

import React from 'react';

import * as config from '../../../../package.json';
import MenuLayout from '../menu-layout/MenuLayout';
import { TAbout } from './About.types';

const About: React.FC<TAbout> = () => {
  return (
    <MenuLayout>
      <div className='about'>
        <p className='about_block'>author: {config.author}</p>
        <p className='about_block'>version: {config.version}</p>
        <p className='about_block'>
          made with:{' '}
          {Object.keys(config.dependencies)
            .concat(Object.keys(config.devDependencies))
            .filter(k => !k.match(/^@/))
            .join(', ')}
        </p>
      </div>
    </MenuLayout>
  );
};

export default About;
