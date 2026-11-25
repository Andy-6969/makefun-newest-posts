# makefun-newest-posts

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/Andy-6969/makefun-newest-posts/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/Andy-6969/makefun-newest-posts/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

@pandya's entry for [make.fun](https://make.fun)'s bounty
["Get the most reposts and likes on make.fun's newest X posts"](https://make.fun/bounty/makefun-x-reposts-02).

Each post in `POSTS.json` quotes or replies to a different one of make.fun's newest posts on
[x.com/makefunai](https://x.com/makefunai), written for that post: a result from our own make.fun entries, a lesson
from the judge's notes, or a joke about the post's subject. Every post carries make.fun or `@makefunai` and a play code.

## Run

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only, no network) checks that `POSTS.json` lists 1 to 15 X post addresses from
one account with no repeats, then copies it to the output directory. The score comes from the posts' reposts, quotes
and likes on X, read by the house.

## License

MIT, see [LICENSE](LICENSE).
