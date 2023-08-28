import { addAll, findAll } from '../repositories';
import { Proxy, ProxyCreationAttr } from '../models';
import { proxyGenerator } from '../utils';

const getAllProxy = async (): Promise<Proxy[]> => {
  const proxies = await findAll();

  return proxies;
};

const addAllProxy = async (): Promise<boolean> => {
  const proxyAll = await findAll();

  if (proxyAll.length === 50) {
    return true;
  }

  const proxies: ProxyCreationAttr[] = await proxyGenerator();
  const result = await addAll(proxies);

  return result;
};

export { getAllProxy, addAllProxy };
