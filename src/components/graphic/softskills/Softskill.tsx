import { createElement } from 'react';

import * as softskills from './index';
import { type Softskills } from './type';

interface Props {
  name: Softskills;
}

const Softskill = ({ name }: Props) => {
  return createElement(softskills[name]);
};

export default Softskill;
