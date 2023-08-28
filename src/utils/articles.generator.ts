const articlesGenerator = async (): Promise<number[]> => {
  const articles: number[] = [];

  for (let i = 1; i <= 5000; i++) {
    articles.push(i);
  }

  return articles;
};

export { articlesGenerator };
