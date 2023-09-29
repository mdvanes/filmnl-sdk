# filmnl-sdk

Unoffical SDK to query [film.nl](https://film.nl) implemented in TypeScript.

Disclaimer: I am not associated with film.nl or any of the providers, cinemas, streaming platforms. I do not own, control or promote any of the data that is returned by this SDK.

# Usage

Install with `npm i @mdworld/filmnl-sdk`

Get all the movies or tv shows that film.nl has with the keyword "blast":

```ts
import {find} from '@mdworld/filmnl-sdk';
await find("blast from the past");
/*
[
  { href: 'film/blast', title: 'Blast', year: 2004 },
  ...
  {
    href: 'film/blast-from-the-past',
    title: 'Blast from the Past',
    year: 1999
  }
]
*/
```

Get all the providers according to film.nl for a movie by the unique href as returned by `find()`:

```ts
import {getProviders} from '@mdworld/filmnl-sdk';
await getProviders("film/blast-from-the-past");
/*
{
  title: 'Blast from the Past',
  trailerHref: 'https://www.youtube.com/watch?v=Xq29uTtKW4M',
  providers: [
    {
      name: 'Google Play',
      href: 'https://play.google.com/store/movies/details?id=5QTPyasW7BY'
    },
    {
      name: 'iTunes',
      href: 'https://tv.apple.com/movie/blast-from-the-past/umc.cmc.3kud86szm0a9ag73suyksorq0?uo=5'
    },
    {
      name: 'Amazon Prime',
      href: 'https://www.primevideo.com/detail/B07VVTHRSC'
    }
  ]
}
*/
```