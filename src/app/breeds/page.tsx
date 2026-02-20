// src/app/breeds/page.tsx
import { catApi } from "../../api/catApi";
import BreedCard from "../../components/BreedCard/BreedCard";
import BreedListContainer from "../../components/BreedList/BreedListContainer";
import { Container, Title, Text, Stack } from "@mantine/core";

export default async function BreedsPage() {
  // 在服务端获取初始品种数据
  const data = await catApi.fetchBreeds(12, 0);

  // 并行获取图片，补全数据
  const initialBreeds = await Promise.all(
    data.map(async (breed: any) => {
      if (breed.reference_image_id) {
        try {
          const imgRes = await catApi.fetchImagesByBreed(
            breed.reference_image_id,
          );
          return { ...breed, image_url: imgRes.url };
        } catch (err) {
          return { ...breed, image_url: "" };
        }
      }
      return { ...breed, image_url: "" };
    }),
  );

  return (
    <main>
      {/* 彻底去掉 padding，保持全站宽度对齐 */}
      <Container size="lg" p={0}>
        <Stack gap={0} mb={20} align="center">
          <Text c="dimmed" fw={500}>
            猫猫品种大全
          </Text>
        </Stack>

        {/* 列表容器，key 设为固定值 */}
        <BreedListContainer key="breeds-list-root" initialPage={0}>
          {initialBreeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </BreedListContainer>
      </Container>
    </main>
  );
}
