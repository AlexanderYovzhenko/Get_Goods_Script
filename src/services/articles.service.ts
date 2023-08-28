import axios from 'axios';
import dotenv from 'dotenv';
import { getAllProxy } from './proxy.service';
import { Proxy } from '../models';
import { articlesGenerator } from '../utils';

dotenv.config();

const URL_ARTICLES =
  process.env.URL_ARTICLES || 'https://kaspi.kz/yml/offer-view/offers/';
const proxyRequestLimit = 30;
const delayBetweenRequest = 15000;
const retryTimeout = 7000;
const maxRequestRetries = 3;
let errorCount = 0;

const getAllArticles = async () => {
  try {
    const promisesRequest: any = [];
    const promisesFetchDataFunc: any = [];
    let proxyIndex = 0;

    // Получаем массив proxies
    const proxies: Proxy[] = await getAllProxy();

    // Создаем массив с артикулами
    const articles = await articlesGenerator();

    for (
      let indexArticle = 0;
      indexArticle <= articles.length;
      indexArticle++
    ) {
      // Формируем массив промисов, функций fetchDataPromiseAll
      if (
        (indexArticle % proxyRequestLimit === 0 && indexArticle !== 0) ||
        indexArticle === articles.length
      ) {
        const fetchData = fetchDataPromiseAll(promisesRequest);
        promisesFetchDataFunc.push(fetchData);

        proxyIndex++;
        promisesRequest.length = 0;

        // Задержка после каждой группы запросов
        if (proxyIndex >= proxies.length) {
          console.info('Delaying for 15 seconds...');
          await new Promise((resolve) =>
            setTimeout(resolve, delayBetweenRequest),
          );

          proxyIndex = 0;
        }
      }

      // Настройки axios - baseURL, proxy, timeout
      const instanceAxios = axios.create({
        baseURL: URL_ARTICLES,
        proxy: {
          host: proxies[proxyIndex].dataValues.ip,
          port: +proxies[proxyIndex].dataValues.port,
          auth: {
            username: proxies[proxyIndex].dataValues.login,
            password: proxies[proxyIndex].dataValues.password,
          },
        },
        timeout: retryTimeout,
      });

      const requestGetArticle = instanceAxios
        .post(
          `${
            articles[
              indexArticle === articles.length ? indexArticle - 1 : indexArticle
            ]
          }`,
          {},
        )
        .catch((error) => {
          return error;
        });

      promisesRequest.push(requestGetArticle);
    }

    const response = await Promise.allSettled(promisesFetchDataFunc);

    return { response };
  } catch (error) {
    return 'Error fetching data for article';
  }
};

const fetchDataPromiseAll = async (promises: any) => {
  try {
    const response = await Promise.allSettled(promises);
    console.info(`Fetched data for ${proxyRequestLimit} articles`);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data for article: ${error.message}`);
    } else {
      console.error(`Error fetching data for article: Unknown error`);
    }

    errorCount++;

    if (errorCount >= maxRequestRetries) {
      console.info(
        'Articles error count exceeded, moving to the next articles',
      );

      errorCount = 0;
      return null;
    }

    fetchDataPromiseAll(promises);
  }
};

export { getAllArticles };
