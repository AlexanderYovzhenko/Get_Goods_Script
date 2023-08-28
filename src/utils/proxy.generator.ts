import { ProxyCreationAttr } from '../models';

const proxyGenerator = async (): Promise<ProxyCreationAttr[]> => {
  const proxies: ProxyCreationAttr[] = [];

  for (let i = 0; i < 50; i++) {
    const proxy = {
      ip: `192.168.1.${Math.floor(Math.random() * 256)}`,
      port: `${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`,
      login: `user_${i}`,
      password: `password_${i}`,
    };

    proxies.push(proxy);
  }

  return proxies;
};

export { proxyGenerator };
