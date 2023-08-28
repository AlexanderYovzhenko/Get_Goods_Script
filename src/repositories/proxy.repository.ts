import { Proxy, ProxyCreationAttr } from '../models';

const findAll = async (): Promise<Proxy[]> => {
  const proxies: Proxy[] = await Proxy.findAll();

  return proxies;
};

const addAll = async (proxies: ProxyCreationAttr[]): Promise<boolean> => {
  for (const proxy of proxies) {
    await Proxy.create(proxy);
  }

  return true;
};

export { findAll, addAll };
