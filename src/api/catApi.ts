const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4";

/**
 * 封装一个通用的请求函数，减少重复代码
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  // 设置默认 Header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  // fetch 的特点：即使是 404 或 500 错误，它也不会抛出异常
  // 所以我们需要手动检查 ok 状态
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as T;
}

export interface Cat {
  breeds: Breed[];
  id: string;
  url: string;
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  adaptability: number; //JS internal all 64 bit float
  reference_image_id: string;
}

export interface BreedWithImage extends Breed {
  image_url?: string;
}

/**
 * 导出具体的业务函数
 */
export const catApi = {
  // 获取猫咪图片列表
  //https://api.thecatapi.com/v1/images/search?limit=12&has_breeds=1
  fetchCats: (limit = 12, currentPage = 0) => {
    return request<Cat[]>(`/images/search?limit=${limit}&has_breeds=1`);
  },

  // 获取所有品种列表
  //https://api.thecatapi.com/v1/breeds?limit=12&page=${currentPage}
  fetchBreeds: (limit = 12, currentPage = 0) => {
    return request<Breed[]>(`/breeds?limit=${limit}&page=${currentPage}`);
  },

  // 获取某个品种的具体信息
  //`https://api.thecatapi.com/v1/breeds/${breed_id}`
  fetchBreedDetail: (breedId: string) => {
    return request<Breed>(`/breeds/${breedId}`);
  },

  // 搜索特定品种的图片
  //`https://api.thecatapi.com/v1/images/${breedDataJson.reference_image_id}`
  fetchImagesByBreed: (breedImageId: string) => {
    return request<Cat>(`/images/${breedImageId}`);
  },
};
