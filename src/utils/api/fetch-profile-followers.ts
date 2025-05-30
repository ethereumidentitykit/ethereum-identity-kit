import { formatQueryParams } from '../formatters'
import { FollowerResponse, InfiniteProfileQueryProps } from '../../types'
import { EFP_API_URL } from '../../constants'

export const fetchProfileFollowers = async ({
  addressOrName,
  list,
  limit,
  sort,
  tags,
  search,
  pageParam,
  allResults,
}: InfiniteProfileQueryProps) => {
  try {
    const queryParams = formatQueryParams({
      limit,
      offset: pageParam * limit,
      term: search,
      sort: sort
        ? {
            'earliest first': 'earliest',
            'latest first': 'latest',
            'follower count': 'followers',
          }[sort]
        : undefined,
      tags,
    })

    const followersEndpoint = allResults
      ? 'allFollowers'
      : search && search?.length >= 2
        ? 'searchFollowers'
        : 'followers'

    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/${followersEndpoint}?${queryParams}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as { followers: FollowerResponse[] }
    return {
      followers: data.followers ?? [],
      nextPageParam: pageParam + 1,
    }
  } catch (err) {
    console.error(err)

    return {
      followers: [],
      nextPageParam: pageParam + 1,
    }
  }
}
