import { formatQueryParams } from '../formatters'
import type { FollowingResponse, InfiniteProfileQueryProps } from '../../types'
import { EFP_API_URL } from '../../constants'

export const fetchProfileFollowing = async ({
  addressOrName,
  list,
  limit,
  sort,
  tags,
  pageParam,
  search,
  allResults,
  fresh,
}: InfiniteProfileQueryProps) => {
  try {
    const queryParams = formatQueryParams({
      limit,
      offset: pageParam * limit,
      tags,
      term: search,
      sort: sort
        ? {
            'earliest first': 'earliest',
            'latest first': 'latest',
            'follower count': 'followers',
          }[sort]
        : undefined,
      cache: fresh ? 'fresh' : undefined,
    })

    const followingEndpoint = allResults
      ? 'allFollowing'
      : search && search?.length >= 2
        ? 'searchFollowing'
        : 'following'

    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/${followingEndpoint}?${queryParams}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as { following: FollowingResponse[] }
    return {
      following: data.following ?? [],
      nextPageParam: pageParam + 1,
    }
  } catch (err) {
    console.error(err)
    return {
      following: [],
      nextPageParam: pageParam + 1,
    }
  }
}
