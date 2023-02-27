---
title: GraphQL Atom Effects
sidebar_label: GraphQL Atom Effects
---

The underlying GraphQL synchronization support is provided via [atom effects](/docs/guides/atom-effects).  While [GraphQL selectors](/docs/recoil-relay/graphql-queries) are provided as a convenience to make them easier to use, you could also apply these effects directly to atoms.  To use these, you'll need to either reference or [register your Relay environment](/docs/recoil-relay/environment).

There are three atom effects that correspond with the three types of [GraphQL operations](https://graphql.org/learn/queries/#operation-name):
### [**`graphQLQueryEffect()`**](/docs/recoil-relay/api/graphQLQueryEffect)
This effect initializes an atom with the results of a **GraphQL query**. Data may potentially load incrementally with `@defer` or live queries. This effect will also automatically update the atom if you issue a local Relay [`useMutation()`](https://relay.dev/docs/api-reference/use-mutation), [`commitMutation()`](https://relay.dev/docs/api-reference/commit-mutation), or [`commitLocalUpdate()`](https://relay.dev/docs/guided-tour/updating-data/local-data-updates/#commitlocalupdate) call that updates the same part of the graph.  GraphQL [fragments](/docs/recoil-relay/graphql-queries#graphql-fragments) are also supported.

### [**`graphQLSubscriptionEffect()`**](/docs/recoil-relay/api/graphQLSubscriptionEffect)
If you also want to subscribe to mutations initiated remotely from the server, in addition to local changes, then you can implement a **GraphQL subscription** on the server and use this instead of a query.

### [**`graphQLMutationEffect()`**](/docs/recoil-relay/api/graphQLMutationEffect)
This effect causes any local mutations to the atom to be committed as a **GraphQL mutation** operation.
