// src/app/breeds/page.tsx
import { catApi } from "../../api/catApi";
import BreedCard from "../../components/BreedCard/BreedCard";
import BreedListContainer from "../../components/BreedList/BreedListContainer";

export default async function BreedsPage() {
  // 在服务端运行这一套重型请求
  // 这对应图中的 Database Query
  const data = await catApi.fetchBreeds(12, 0);

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
    <div>
      <BreedListContainer key="breeds-list" initialPage={0}>
        {/* 🔥 这里的 BreedCard 接收的是已经 enriched（带图）的数据 */}
        {initialBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </BreedListContainer>
    </div>
  );
}
