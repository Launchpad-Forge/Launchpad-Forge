import type { Contract as EmittedContract } from '../../prisma/schema.d';
// rc.13's emitter omits to-one relation nullability in the TypeScript artifact.
// Recover it from the emitted local foreign-key field metadata without changing hashes.
type NormalizeModel<M> = M extends { fields: infer F; relations: infer R } ? Omit<M, 'relations'> & {
  readonly relations: { readonly [K in keyof R]: R[K] extends { cardinality: 'N:1' | '1:1'; on: { localFields: readonly (infer L)[] } } ? R[K] & { readonly nullable: L extends keyof F ? F[L] extends { nullable: infer N extends boolean } ? N : false : false } : R[K] }
} : M;
type NormalizeNamespace<N> = N extends { models: infer M } ? Omit<N, 'models'> & { readonly models: { readonly [K in keyof M]: NormalizeModel<M[K]> } } : N;
export type RuntimeContract = Omit<EmittedContract, 'domain'> & { readonly domain: Omit<EmittedContract['domain'], 'namespaces'> & { readonly namespaces: { readonly [N in keyof EmittedContract['domain']['namespaces']]: NormalizeNamespace<EmittedContract['domain']['namespaces'][N]> } } };
