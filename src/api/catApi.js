const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4";

/**
 * 封装一个通用的请求函数，减少重复代码
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // 设置默认 Header
  const headers = {
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

  return await response.json();
}

/**
 * 导出具体的业务函数
 */
export const catApi = {
  // 获取猫咪图片列表
  //https://api.thecatapi.com/v1/images/search?limit=12&has_breeds=1
  fetchCats: async (limit = 12) => {
    return await request(`/images/search?limit=${limit}&has_breeds=1`);
  },

  // 获取所有品种列表
  //https://api.thecatapi.com/v1/breeds?limit=12&page=${currentPage}
  fetchBreeds: async (limit = 12, currentPage = 0) => {
    return await request(`/breeds?limit=${limit}&page=${currentPage}`);
  },

  // 获取某个品种的具体信息
  //`https://api.thecatapi.com/v1/breeds/${breed_id}`
  fetchBreedDetail: async (breedId) => {
    return await request(`/breeds/${breedId}`);
  },

  // 搜索特定品种的图片
  //`https://api.thecatapi.com/v1/images/${breedDataJson.reference_image_id}`
  fetchImagesByBreed: async (breedImageId) => {
    return await request(`/images/${breedImageId}`);
  },
};
