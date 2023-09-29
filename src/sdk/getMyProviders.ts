import { Providers, getProviders } from "./getProviders.js";

export const getMyProviders = async (
  href: string,
  myProviders: string[]
): Promise<Providers> => {
  const allProviders = await getProviders(href);

  return {
    ...allProviders,
    providers: allProviders.providers.filter((provider) =>
      myProviders.includes(provider.name ?? "")
    ),
  };
};
