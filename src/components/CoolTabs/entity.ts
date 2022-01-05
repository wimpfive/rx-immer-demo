import { ReactNode } from 'react';
import { create } from 'rx-immer';
import { injectHooks } from 'rx-immer-react';

export interface CoolTabConfig {
  key: string;
  closable?: boolean;
  forceRender?: boolean;
  tab?: ReactNode;
  children?: ReactNode;
}

const defaultCoolTabConfig = {
  closable: true,
};

export class CoolTabsController {
  store = injectHooks(
    create<{
      activeKey?: string;
      tabs: CoolTabConfig[];
    }>({ tabs: [] }, { history: false }),
  );

  has(key: string) {
    return this.store.value().tabs.some((t) => t.key === key);
  }

  open(key: string, config: Omit<CoolTabConfig, 'key'>) {
    if (this.has(key)) {
      this.store.commit((state) => {
        const target: any = state.tabs.find((t) => t.key === key);
        Object.entries(config).forEach(([k, v]) => {
          target[k] = v;
        });
        state.activeKey = key;
      });
    } else {
      this.store.commit((state) => {
        state.tabs.push({ key, ...defaultCoolTabConfig, ...config });
        state.activeKey = key;
      });
    }
  }

  set(key: string, config: Omit<CoolTabConfig, 'key'>) {
    if (this.has(key)) {
      this.store.commit((state) => {
        const target: any = state.tabs.find((t) => t.key === key);
        Object.entries(config).forEach(([k, v]) => {
          target[k] = v;
        });
      });
    }
  }

  close(key: string) {
    if (this.has(key)) {
      this.store.commit((state) => {
        const index = state.tabs.findIndex((t) => t.key === key);
        state.tabs.splice(index, 1);
        state.activeKey = state.tabs[state.tabs.length - 1]?.key;
      });
    }
  }

  change(key: string) {
    if (this.has(key)) {
      this.store.commit(() => key, 'activeKey');
    }
  }

  destroy() {
    this.store.destroy();
  }
}

let current: CoolTabsController | undefined;

export function createCoolTabsController() {
  const newController = new CoolTabsController();
  current = newController;
  return newController;
}

export function removeCoolTabsController() {
  current?.destroy();
  current = undefined;
}

export function touchCoolTabsController() {
  return current;
}
