import React, { CSSProperties, FC, useEffect, useState } from 'react';

import {
  CoolTabsController,
  createCoolTabsController,
  removeCoolTabsController,
} from './entity';
import Container from './container';

export { touchCoolTabsController } from './entity';

interface CoolTabsProps {
  style?: CSSProperties;
}

const CoolTabs: FC<CoolTabsProps> = (props) => {
  const { style } = props;
  const [controller, setController] = useState<CoolTabsController>();

  useEffect(() => {
    const newController = createCoolTabsController();
    setController(newController);

    return () => {
      removeCoolTabsController();
    };
  }, []);

  return (
    <div style={style}>
      {controller && <Container controller={controller} />}
    </div>
  );
};

export default CoolTabs;
