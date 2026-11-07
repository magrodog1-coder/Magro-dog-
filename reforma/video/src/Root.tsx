import React from 'react';
import {Composition} from 'remotion';
import {Reforma, CENA, CENAS} from './Reforma';
export const Root: React.FC = () => (
  <Composition id="Reforma" component={Reforma} durationInFrames={CENA * CENAS.length + 90}
    fps={30} width={1080} height={1350} />
);
