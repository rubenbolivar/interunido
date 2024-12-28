import type * as Kit from '@sveltejs/kit';

type RouteParams = {  }
type RouteId = '/(protected)/dashboard'

export type LayoutServerLoad = Kit.ServerLoad<RouteId, RouteParams>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0]; 