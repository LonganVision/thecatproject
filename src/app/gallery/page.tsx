// src/app/gallery/page.tsx
import { catApi } from "../../api/catApi";
import CatCard from "../../components/CatCard/CatCard";
import CatListContainer from "../../components/CatList/CatListContainer";
import { Container, Title, Text, Stack } from "@mantine/core";

export default async function GalleryPage() {
  // 获取初始数据
  // 建议在 API 层处理缓存，例如 fetch(url, { cache: 'no-store' })
  const initialCats = await catApi.fetchCats(12, 0);

  return (
    <main>
      <Container size="lg" p={0}>
        <Stack gap={0} mb={10} align="center">
          <Text c="dimmed" fw={500}>
            发现世界各地可爱的猫咪瞬间
          </Text>
        </Stack>

        {/* 如果你确实需要组件在路由切换时重置（比如清空之前 Load More 加载的数据），
          使用一个固定的常量 key 比 dynamic key 更安全。
          这样可以避免在页面内部发生微小状态更新时，整个列表被意外销毁。
        */}
        <CatListContainer key="gallery-list-root" initialPage={0}>
          {initialCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </CatListContainer>
      </Container>
    </main>
  );
}
